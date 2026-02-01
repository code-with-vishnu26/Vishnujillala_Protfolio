import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { User, Compass, Users, Heart } from "lucide-react";
import { toast } from "sonner";
import { PinDialog } from "@/components/PinDialog";

const profiles = [
  {
    id: "recruiter",
    name: "Recruiter",
    icon: User,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "adventure",
    name: "Adventure",
    icon: Compass,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "friends",
    name: "Friends",
    icon: Users,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "family",
    name: "Family",
    icon: Heart,
    gradient: "from-red-500 to-orange-500",
  },
];

const Profiles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserEmail(session.user.email || "");
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserEmail(session.user.email || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleProfileClick = (profileId: string) => {
    setSelectedProfile(profileId);
    setShowPinDialog(true);
    setFailedAttempts(0);
  };

  const handleVerifyPin = async (pin: string): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;

      // Verify PIN using database function
      const { data, error } = await supabase.rpc("verify_profile_pin", {
        profile_name_input: selectedProfile,
        pin_input: pin,
      });

      if (error) {
        console.error("Error verifying PIN:", error);
        throw error;
      }

      if (data) {
        // Correct PIN
        setShowPinDialog(false);
        if (selectedProfile === "recruiter") {
          navigate("/portfolio");
        } else {
          toast("Coming soon!", {
            description: `The ${selectedProfile} profile is being prepared for you.`,
          });
        }
        return true;
      } else {
        // Wrong PIN
        const newAttemptCount = failedAttempts + 1;
        setFailedAttempts(newAttemptCount);

        // Send admin alert after 3 failed attempts (which also logs the attempt server-side)
        if (newAttemptCount >= 3) {
          await sendAdminAlert(newAttemptCount, userId);
          toast.error("Too many failed attempts. Admin has been notified.");
        }

        return false;
      }
    } catch (error) {
      console.error("Error in PIN verification:", error);
      toast.error("Failed to verify PIN");
      return false;
    }
  };

  const getUserIp = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "Unknown";
    }
  };

  const sendAdminAlert = async (attemptCount: number, userId: string | undefined) => {
    try {
      const ipAddress = await getUserIp();
      
      // All data logging is now handled server-side for security
      await supabase.functions.invoke("send-admin-alert", {
        body: {
          email: userEmail,
          profileName: selectedProfile,
          attemptCount,
          ipAddress,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userId: userId || null,
        },
      });
    } catch (error) {
      console.error("Error sending admin alert:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
        >
          Who's Watching?
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <motion.button
                key={profile.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProfileClick(profile.id)}
                className="group relative"
              >
                <div
                  className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${profile.gradient} p-1 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/50`}
                >
                  <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-20 h-20 text-white" />
                  </div>
                </div>
                <p className="text-white text-xl font-semibold mt-4 text-center group-hover:text-purple-400 transition-colors">
                  {profile.name}
                </p>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth");
            }}
            className="text-white/60 hover:text-white transition-colors border border-white/20 px-6 py-2 rounded-full hover:border-white/40"
          >
            Sign Out
          </button>
        </motion.div>

        <PinDialog
          open={showPinDialog}
          onOpenChange={setShowPinDialog}
          profileName={selectedProfile}
          onVerify={handleVerifyPin}
        />
      </div>
    </div>
  );
};

export default Profiles;

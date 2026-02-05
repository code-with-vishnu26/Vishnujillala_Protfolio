import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface PinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string;
  onVerify: (pin: string) => Promise<boolean>;
}

export const PinDialog = ({ open, onOpenChange, profileName, onVerify }: PinDialogProps) => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);
    setError("");

    const isValid = await onVerify(pin);
    
    if (isValid) {
      // Close dialog on success
      handleClose();
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPin("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md bg-black/90 border-white/20 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Enter Security PIN
          </DialogTitle>
          <DialogDescription className="text-white/60 text-center text-sm sm:text-base">
            Enter the 4-digit PIN for {profileName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPin(value);
                setError("");
              }}
              className="pl-10 text-center text-xl sm:text-2xl tracking-widest bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400 min-h-[48px]"
              autoFocus
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs sm:text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="flex gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 min-h-[44px] text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || pin.length !== 4}
              className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold min-h-[44px] text-sm sm:text-base"
            >
              {loading ? "Verifying..." : "Unlock"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

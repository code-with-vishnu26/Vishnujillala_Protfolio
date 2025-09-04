import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Vishnu's virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showContactForm, setShowContactForm] = useState(true);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Auto-reply with helpful responses
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('project') || msg.includes('work')) {
      return "I'd love to tell you about Vishnu's projects! You can check out the Projects section or ask me specific questions about his technical skills.";
    } else if (msg.includes('contact') || msg.includes('hire') || msg.includes('job')) {
      return "Great! You can reach Vishnu directly at his email or through the contact form. He's always open to new opportunities and collaborations.";
    } else if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech')) {
      return "Vishnu specializes in web development with expertise in React, JavaScript, TypeScript, and modern frameworks. Check out the Skills section for a complete overview!";
    } else if (msg.includes('resume') || msg.includes('cv')) {
      return "You can download Vishnu's resume from the Resume section on this portfolio. It includes all his experience, education, and certifications.";
    } else {
      return "Thanks for your message! I'll make sure Vishnu gets back to you soon. Feel free to explore his portfolio or ask me about his projects and skills.";
    }
  };

  const handleSubmitContact = () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: "Please fill in your details",
        description: "Name and email are required to start the chat.",
        variant: "destructive",
      });
      return;
    }
    setShowContactForm(false);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Nice to meet you, ${userInfo.name}! What would you like to know about Vishnu's work?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, welcomeMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-primary/5 rounded-t-lg">
              <h3 className="font-semibold text-foreground">Chat with Vishnu</h3>
              <p className="text-sm text-muted-foreground">Ask me anything about his work!</p>
            </div>

            {showContactForm ? (
              /* Contact Form */
              <div className="p-4 flex-1 flex flex-col justify-center space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Your Name</label>
                  <Input
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Your Email</label>
                  <Input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleSubmitContact} className="w-full">
                  Start Chat
                </Button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
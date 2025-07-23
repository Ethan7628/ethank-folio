
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ChatDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([
    { text: "Hello! I'm Ethan's AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const { theme } = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      // Simple AI response simulation
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! This is a demo AI chat. For real inquiries, please use the contact form below.", 
          sender: 'ai' 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getDialogStyle = () => {
    switch (theme) {
      case 'light':
        return 'bg-white text-slate-900 border-slate-200';
      case 'beige':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'dark':
        return 'bg-slate-900 text-slate-100 border-slate-700';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  const getMessageStyle = (sender: 'user' | 'ai') => {
    if (sender === 'user') {
      switch (theme) {
        case 'light':
          return 'bg-slate-100 text-slate-900 ml-auto';
        case 'beige':
          return 'bg-amber-100 text-amber-900 ml-auto';
        case 'dark':
          return 'bg-slate-700 text-slate-100 ml-auto';
        default:
          return 'bg-slate-100 text-slate-900 ml-auto';
      }
    } else {
      switch (theme) {
        case 'light':
          return 'bg-slate-200 text-slate-900';
        case 'beige':
          return 'bg-amber-200 text-amber-900';
        case 'dark':
          return 'bg-slate-800 text-slate-100';
        default:
          return 'bg-slate-200 text-slate-900';
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 transition-all duration-300 hover:bg-primary/10"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${getDialogStyle()}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Chat with AI Assistant
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-background/50 rounded-lg mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${getMessageStyle(msg.sender)}`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

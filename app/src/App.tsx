import { useState, useEffect, useCallback } from 'react';
import { MessageForm } from '@/components/MessageForm';
import { MessageList } from '@/components/MessageList';
import { messageApi, type Message } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { MessageCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './App.css';

const POLLING_INTERVAL = 5000; // 5 seconds

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessageId, setNewMessageId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch messages from API
  const fetchMessages = useCallback(async (showToast = false) => {
    try {
      const data = await messageApi.getMessages();
      setMessages(data);
      setLastUpdated(new Date());
      setIsOnline(true);
      if (showToast) {
        toast.success('Messages refreshed');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setIsOnline(false);
      if (showToast) {
        toast.error('Failed to refresh messages');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Polling for new messages
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online');
      fetchMessages();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You are offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchMessages]);

  // Submit new message
  const handleSubmit = async (text: string) => {
    setIsSubmitting(true);
    try {
      const newMessage = await messageApi.createMessage({ text });
      setMessages((prev) => [newMessage, ...prev.slice(0, 49)]);
      setNewMessageId(newMessage._id);
      toast.success('Message posted successfully!');
      
      // Clear the new message highlight after animation
      setTimeout(() => {
        setNewMessageId(null);
      }, 2000);
    } catch (error) {
      console.error('Error posting message:', error);
      toast.error('Failed to post message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manual refresh
  const handleRefresh = () => {
    setIsLoading(true);
    fetchMessages(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Toaster position="top-center" richColors />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Freedom Wall
                </h1>
                <p className="text-xs text-gray-500">Share your thoughts anonymously</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Online status */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                isOnline 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isOnline ? (
                  <Wifi className="w-3.5 h-3.5" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              
              {/* Refresh button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isLoading}
                className="h-9 w-9"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Message Form Card */}
        <Card className="mb-6 border-0 shadow-xl shadow-blue-500/5 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Post a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MessageForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>

        {/* Messages List Card */}
        <Card className="border-0 shadow-xl shadow-blue-500/5 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Recent Messages
              </CardTitle>
              <span className="text-xs text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
              newMessageId={newMessageId}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Freedom Wall • Anonymous Message Board
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Messages are automatically deleted after reaching 50 posts
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;

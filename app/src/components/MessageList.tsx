import type { Message } from '@/services/api';
import { MessageItem } from './MessageItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, MessageCircle } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  newMessageId: string | null;
}

export function MessageList({ messages, isLoading, newMessageId }: MessageListProps) {
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages yet</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Be the first to share your thoughts on the Freedom Wall!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem
            key={message._id}
            message={message}
            isNew={message._id === newMessageId}
          />
        ))}
      </div>
      
      {/* Message count indicator */}
      <div className="mt-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {messages.length} message{messages.length !== 1 ? 's' : ''}
          {messages.length >= 50 && ' (max reached)'}
        </span>
      </div>
    </ScrollArea>
  );
}

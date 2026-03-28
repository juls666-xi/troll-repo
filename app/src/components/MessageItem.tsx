import type { Message } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';

interface MessageItemProps {
  message: Message;
  isNew?: boolean;
}

export function MessageItem({ message, isNew = false }: MessageItemProps) {
  const formattedTime = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm
        transition-all duration-500 ease-out
        ${isNew ? 'animate-in slide-in-from-bottom-4 fade-in duration-700' : ''}
        hover:shadow-md hover:-translate-y-0.5
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
      
      <div className="relative">
        {/* Message text */}
        <p className="text-gray-800 text-base leading-relaxed mb-3 break-words">
          {message.text}
        </p>
        
        {/* Footer with icon and timestamp */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}

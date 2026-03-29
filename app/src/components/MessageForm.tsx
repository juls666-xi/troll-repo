import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
}

const MAX_LENGTH = 100;

export function MessageForm({ onSubmit, isSubmitting }: MessageFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > MAX_LENGTH || isSubmitting) return;
    
    await onSubmit(text.trim());
    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setText(value);
    }
  };

  const charCount = text.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isEmpty = charCount === 0;
  const isNearLimit = charCount >= 80 && charCount <= MAX_LENGTH;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          value={text}
          onChange={handleChange}
          placeholder="Share your thoughts anonymously..."
          className={`
            min-h-[120px] resize-none text-base
            border-2 transition-all duration-200
            focus:ring-2 focus:ring-blue-500/20
            ${isNearLimit ? 'border-amber-300 focus:border-amber-400' : ''}
            ${isOverLimit ? 'border-red-300 focus:border-red-400' : ''}
          `}
          disabled={isSubmitting}
        />
        
        {/* Character counter */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span
            className={`
              text-xs font-medium transition-colors duration-200
              ${isNearLimit ? 'text-amber-500' : ''}
              ${isOverLimit ? 'text-red-500' : 'text-gray-400'}
            `}
          >
            {charCount}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`
            h-full transition-all duration-300 ease-out
            ${charCount <= 60 ? 'bg-blue-500' : ''}
            ${charCount > 60 && charCount <= 80 ? 'bg-amber-400' : ''}
            ${charCount > 80 ? 'bg-amber-500' : ''}
          `}
          style={{ width: `${Math.min((charCount / MAX_LENGTH) * 100, 100)}%` }}
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isEmpty || isOverLimit || isSubmitting}
        className="w-full h-12 text-base font-medium transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Posting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Post Message
          </>
        )}
      </Button>
    </form>
  );
}

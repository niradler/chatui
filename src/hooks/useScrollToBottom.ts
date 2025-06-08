import { useRef, useEffect, useCallback } from 'react';

export const useScrollToBottom = (dependency: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [dependency, scrollToBottom]);

  return { messagesEndRef, scrollToBottom };
};

import { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { initializeGemini, generateResponse } from '../services/gemini';

export const useChat = (apiKey: string) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    try {
      initializeGemini(apiKey);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to initialize AI. Please check your API key.',
      }));
    }
  }, [apiKey]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await generateResponse(content);
      if (!response) {
        throw new Error('Empty response from API');
      }
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response 
      };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to generate response. Please try again.',
        isLoading: false,
      }));
    }
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  };
};
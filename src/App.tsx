import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import { Brain, MessageSquare } from 'lucide-react';
import { useChat } from './hooks/useChat';

// This would be your actual API key
const GEMINI_API_KEY = 'AIzaSyAGYwC77n6xpFeOy9noOqorUfAtT2FILeU';

export function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, sendMessage } = useChat(GEMINI_API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-2">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              MindowsAI
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{messages.length} messages</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {error && <ErrorMessage message={error} />}

          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to MindowsAI
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Your intelligent companion for coding, learning, and
                problem-solving. How can I assist you today?
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
}

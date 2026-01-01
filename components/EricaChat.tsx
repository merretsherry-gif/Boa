
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getFinancialInsights } from '../services/geminiService';

const EricaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('boa_chat_history');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: "Hello! I'm Erica, your virtual assistant. How can I help you today?", sender: 'erica', timestamp: '9:00 AM' }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('boa_chat_history', JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsgId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMsgId,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate "Delivered"
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'delivered' } : m));
    }, 600);

    // AI Processing
    setTimeout(async () => {
      // Mark as "Read" when Erica starts thinking
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'read' } : m));
      setIsTyping(true);

      const response = await getFinancialInsights([{ description: input }]);
      
      const ericaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'erica',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages(prev => [...prev, ericaMessage]);
    }, 1500);
  };

  const StatusIcon = ({ status }: { status?: string }) => {
    if (status === 'sending') return <i className="fa-regular fa-clock ml-1 text-[8px] opacity-50"></i>;
    if (status === 'delivered') return <i className="fa-solid fa-check ml-1 text-[8px] opacity-50"></i>;
    if (status === 'read') return <i className="fa-solid fa-check-double ml-1 text-[8px] text-blue-400"></i>;
    return null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] animate-fadeIn">
      <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm relative ${
              m.sender === 'user' 
                ? 'bg-boa-blue text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-gray-100 rounded-tl-none'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{m.text}</p>
              <div className={`flex items-center justify-end mt-1 text-[9px] font-bold uppercase tracking-tighter ${
                m.sender === 'user' ? 'text-blue-100/70' : 'text-gray-400'
              }`}>
                {m.timestamp}
                {m.sender === 'user' && <StatusIcon status={m.status} />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="mt-auto bg-white p-3 rounded-2xl border border-gray-100 shadow-lg flex items-center gap-2">
        <input 
          type="text" 
          placeholder="Ask Erica..." 
          className="flex-1 bg-gray-50 p-3 rounded-xl outline-none text-sm font-semibold focus:ring-2 focus:ring-boa-blue/20 transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit"
          className="w-10 h-10 bg-boa-red text-white rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform disabled:opacity-50"
          disabled={!input.trim()}
        >
          <i className="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </form>
    </div>
  );
};

export default EricaChat;

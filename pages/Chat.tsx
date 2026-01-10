import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { chatService } from '../services/chat';

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Can you summarize the engineering budget changes mentioned in the Q3 Financial Report? I need to know the primary growth areas.',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'ai',
    content: 'According to the **Q3 Financial Report**, the engineering department saw a 14% increase in allocation compared to Q2. The primary growth areas are focused on:\n\n* **Cloud Infrastructure:** $1.2M additional funding for AWS scalability.\n* **AI Integration:** $800k earmarked for LLM token costs.\n* **Headcount:** Approval for 12 new senior backend positions.',
    timestamp: new Date(),
    sources: ['Q3_Financial_Summary.pdf', 'Engineering_Strategy_2024.docx']
  }
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
        const response = await chatService.sendMessage(newMessage.content, messages);
        setMessages(prev => [...prev, response]);
    } catch (error) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'ai',
            content: "Sorry, I'm having trouble connecting to the network right now.",
            timestamp: new Date()
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="flex h-full w-full">
        {/* Main Chat Column */}
        <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Chat Header */}
            <div className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-surface/50 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <h2 className="font-bold text-white text-sm truncate">Q3 Financial Analysis</h2>
                    <span className="shrink-0 px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase tracking-wide border border-green-500/20">Live Memory</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-text-secondary">
                    <button className="hover:text-white transition-colors p-1"><span className="material-symbols-outlined text-[20px]">share</span></button>
                    <button className="hover:text-white transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
                </div>
            </div>

            {/* Messages Area - Flex Grow to take available space */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-primary/30 hidden sm:flex">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            </div>
                        )}
                        
                        <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{msg.role === 'user' ? 'You' : 'Memory AI'}</span>
                            <div className={`px-4 py-3 md:px-5 md:py-3 rounded-2xl text-[14px] md:text-[15px] leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-surface border border-border text-gray-100 rounded-tl-none'
                            }`}>
                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                
                                {msg.sources && (
                                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                        {msg.sources.map(source => (
                                            <button key={source} className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-[12px] font-medium text-text-secondary hover:text-white hover:border-primary transition-colors group max-w-full">
                                                <span className="material-symbols-outlined text-[14px] group-hover:text-primary shrink-0">description</span>
                                                <span className="truncate">{source}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center overflow-hidden shrink-0 mt-1 hidden sm:flex">
                                <img src="https://picsum.photos/id/64/200/200" alt="User" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30 hidden sm:flex">
                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        </div>
                        <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Static at bottom of flex column */}
            <div className="bg-background border-t border-border p-4 md:px-8 md:py-6 shrink-0 z-20">
                <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
                    {/* Suggestions */}
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mask-fade-right">
                        {['Compare to Q1 budget', 'Who approved changes?', 'Summarize risks'].map(suggestion => (
                            <button key={suggestion} onClick={() => setInput(suggestion)} className="whitespace-nowrap px-3 py-1.5 md:px-4 md:py-1.5 bg-surface hover:bg-primary/10 hover:text-primary border border-border hover:border-primary rounded-full text-[12px] md:text-[13px] font-medium text-text-secondary transition-all shrink-0">
                                "{suggestion}"
                            </button>
                        ))}
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                        <div className="relative flex items-center bg-surface border border-border rounded-xl p-2 shadow-xl focus-within:border-primary transition-colors">
                            <button className="p-2 text-text-secondary hover:text-white transition-colors shrink-0">
                                <span className="material-symbols-outlined text-[20px]">attach_file</span>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] text-white placeholder-text-secondary px-3 py-2 md:py-3 min-w-0"
                                placeholder="Ask about your data..."
                            />
                            <button 
                                onClick={handleSend}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 ${input.trim() ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-light text-text-secondary cursor-not-allowed'}`}
                                disabled={!input.trim()}
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[10px] md:text-[11px] text-text-secondary font-medium hidden sm:block">AI responses are generated based on uploaded documents. Always verify critical data.</p>
                </div>
            </div>
        </div>

        {/* Right Context Sidebar (Desktop Only) */}
        <div className="w-16 border-l border-border bg-surface flex flex-col items-center py-6 gap-6 hidden xl:flex shrink-0">
            <div className="p-2 text-primary bg-primary/10 rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-colors" title="Chat">
                <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
            <div className="p-2 text-text-secondary hover:text-white transition-colors cursor-pointer" title="Analytics">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div className="p-2 text-text-secondary hover:text-white transition-colors cursor-pointer" title="History">
                <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
        </div>
    </div>
  );
};

export default Chat;
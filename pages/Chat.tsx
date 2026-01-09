import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

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

  const handleSend = () => {
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm analyzing your request against the knowledge base. Here is a simulated response based on the available documents regarding that topic.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-full relative">
        <div className="flex-1 flex flex-col h-full relative">
            {/* Chat Header */}
            <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-surface/50 backdrop-blur-sm z-10 absolute top-0 left-0 right-0">
                <div className="flex items-center gap-3">
                    <h2 className="font-bold text-white text-sm">Q3 Financial Analysis</h2>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase tracking-wide border border-green-500/20">Live Memory</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary">
                    <button className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">share</span></button>
                    <button className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 pt-20 pb-32 space-y-8 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            </div>
                        )}
                        
                        <div className={`flex flex-col gap-2 max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{msg.role === 'user' ? 'You' : 'Memory AI'}</span>
                            <div className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-surface border border-border text-gray-100 rounded-tl-none'
                            }`}>
                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                
                                {msg.sources && (
                                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                        {msg.sources.map(source => (
                                            <button key={source} className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-[12px] font-medium text-text-secondary hover:text-white hover:border-primary transition-colors group">
                                                <span className="material-symbols-outlined text-[14px] group-hover:text-primary">description</span>
                                                {source}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center overflow-hidden shrink-0 mt-1">
                                <img src="https://picsum.photos/id/64/200/200" alt="User" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
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

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-12 pb-6 px-8">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Suggestions */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {['Compare to Q1 budget', 'Who approved changes?', 'Summarize risks'].map(suggestion => (
                            <button key={suggestion} onClick={() => setInput(suggestion)} className="whitespace-nowrap px-4 py-1.5 bg-surface hover:bg-primary/10 hover:text-primary border border-border hover:border-primary rounded-full text-[13px] font-medium text-text-secondary transition-all">
                                "{suggestion}"
                            </button>
                        ))}
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                        <div className="relative flex items-center bg-surface border border-border rounded-xl p-2 shadow-xl focus-within:border-primary transition-colors">
                            <button className="p-2 text-text-secondary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[20px]">attach_file</span>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] text-white placeholder-text-secondary px-3 py-3"
                                placeholder="Ask a question about your institutional memory..."
                            />
                            <button 
                                onClick={handleSend}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${input.trim() ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-light text-text-secondary cursor-not-allowed'}`}
                                disabled={!input.trim()}
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[11px] text-text-secondary font-medium">AI responses are generated based on uploaded documents. Always verify critical data.</p>
                </div>
            </div>
        </div>

        {/* Right Context Sidebar (Optional) */}
        <div className="w-12 border-l border-border bg-surface flex flex-col items-center py-6 gap-6 hidden md:flex">
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
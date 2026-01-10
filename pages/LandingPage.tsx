import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-[#0F1123] text-white selection:bg-primary selection:text-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0F1123]/80 backdrop-blur-md px-6 md:px-20 lg:px-40 py-4">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="text-primary">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                        <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-display">Institutional Memory</span>
            </div>
            
            <nav className="hidden flex-1 justify-center gap-10 md:flex">
                <a className="text-sm font-semibold text-white hover:text-primary transition-colors" href="#">Product</a>
                <a className="text-sm font-semibold text-white hover:text-primary transition-colors" href="#">Solutions</a>
                <a className="text-sm font-semibold text-white hover:text-primary transition-colors" href="#">Pricing</a>
            </nav>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <Link to="/dashboard" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:brightness-110 transition-all">
                        Dashboard
                    </Link>
                ) : (
                    <>
                         <Link to="/login" className="hidden md:flex text-sm font-bold text-white px-4 py-2 hover:opacity-70 transition-opacity">Login</Link>
                         <Link to="/signup" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:brightness-110 transition-all">
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center pt-32 pb-20">
        <div className="px-6 md:px-20 lg:px-40 max-w-[1280px] w-full">
            <div className="flex flex-col items-center text-center gap-8 mb-16">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    NEW: Enterprise AI Workspace v2.0
                </div>
                <h1 className="max-w-4xl text-5xl md:text-7xl font-display font-black leading-[1.1] tracking-tight text-white">
                    Capture the Collective <span className="text-primary">Intelligence</span> of Your Institution
                </h1>
                <p className="max-w-2xl text-lg md:text-xl font-normal leading-relaxed text-slate-400">
                    Transform fragmented data into a unified, AI-powered knowledge base. Secure, scalable, and built for complex organizations to preserve wisdom forever.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/signup" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
                        Get Started
                    </Link>
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white/5 border border-white/10 text-white text-base font-bold hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined mr-2">play_circle</span> Watch Demo
                    </button>
                </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mx-auto max-w-[1000px] group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-xl opacity-20 blur-2xl transition duration-1000 group-hover:opacity-30"></div>
                <div className="relative overflow-hidden rounded-xl border border-white/20 bg-[#0F1123] shadow-2xl">
                    {/* Mockup Top Bar */}
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 bg-white/5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                        </div>
                        <div className="mx-auto flex h-6 w-1/3 items-center justify-center rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
                            platform.inst-memory.ai
                        </div>
                    </div>
                    {/* Mockup Content */}
                    <div className="grid grid-cols-[200px_1fr] h-[500px]">
                        <div className="border-r border-white/10 p-4 flex flex-col gap-4 bg-white/5">
                            <div className="h-4 w-2/3 bg-slate-700 rounded"></div>
                            <div className="space-y-2 pt-4">
                                <div className="h-3 w-full bg-primary/20 rounded"></div>
                                <div className="h-3 w-4/5 bg-slate-700 rounded"></div>
                                <div className="h-3 w-full bg-slate-700 rounded"></div>
                                <div className="h-3 w-3/4 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                        <div className="p-8 flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <div className="h-8 w-48 bg-slate-800 rounded-lg"></div>
                                <div className="h-8 w-8 bg-primary rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-slate-800 rounded-lg p-4 flex flex-col justify-between">
                                    <div className="h-3 w-1/2 bg-slate-600 rounded"></div>
                                    <div className="h-6 w-3/4 bg-primary/40 rounded"></div>
                                </div>
                                <div className="h-24 bg-slate-800 rounded-lg p-4 flex flex-col justify-between">
                                    <div className="h-3 w-1/2 bg-slate-600 rounded"></div>
                                    <div className="h-6 w-3/4 bg-slate-400 rounded"></div>
                                </div>
                                <div className="h-24 bg-slate-800 rounded-lg p-4 flex flex-col justify-between">
                                    <div className="h-3 w-1/2 bg-slate-600 rounded"></div>
                                    <div className="h-6 w-3/4 bg-slate-400 rounded"></div>
                                </div>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center gap-3">
                                <span className="material-symbols-outlined text-4xl text-slate-300">hub</span>
                                <div className="text-sm font-medium text-slate-400">Institutional Knowledge Graph</div>
                                <div className="w-40 h-40 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="bg-background-dark/50 py-24">
        <div className="px-6 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
                        The Brain of Your Organization
                    </h2>
                    <p className="text-lg font-normal text-slate-400 max-w-2xl">
                        Empower your teams with instant access to institutional wisdom, powered by next-gen RAG architecture.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-transparent hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">dataset</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white">Unified Knowledge</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Connect all your data sources—Slack, Drive, Notion, and PDFs—into one searchable brain.
                            </p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-transparent hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white">Secure Infrastructure</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Enterprise-grade security with SOC2 compliance and end-to-end encryption for sensitive data.
                            </p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-transparent hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">insights</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white">AI Insights</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Automated summaries, trend detection, and gap analysis from complex institutional archives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="px-6 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
            <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-center text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl"></div>
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl leading-tight">
                        Ready to preserve your institutional memory?
                    </h2>
                    <p className="text-lg opacity-90 max-w-xl font-medium">
                        Join over 500+ leading organizations already using our platform to build a future-proof knowledge base.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/signup" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white text-primary text-base font-bold shadow-xl hover:bg-slate-50 transition-all">
                            Get Started Now
                        </Link>
                        <button className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 border border-white/30 text-white text-base font-bold hover:bg-white/10 transition-all">
                            Schedule a Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#0F1123]">
        <div className="px-6 md:px-20 lg:px-40 max-w-[1200px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                    <div className="text-primary w-6 h-6">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                        </svg>
                    </div>
                    <span className="text-base font-bold text-white">Institutional Memory</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Documentation</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Contact Us</a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
                <p className="text-sm text-slate-500">© 2024 Institutional Memory AI. Built for the future of work.</p>
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary/10 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-sm">public</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary/10 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-sm">mail</span>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-surface relative overflow-hidden items-center justify-center border-r border-border">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent opacity-80 z-0"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[90px]"></div>

        <div className="relative z-10 max-w-lg px-10">
            <h1 className="text-4xl font-display font-bold text-white mb-6">Join the Future of<br/><span className="text-primary">Corporate Intelligence</span></h1>
            
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">folder_managed</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Centralize Documents</h3>
                        <p className="text-sm text-text-secondary mt-1">Connect Drive, SharePoint, and Slack in one unified vector database.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <span className="material-symbols-outlined">chat_spark</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Ask Anything</h3>
                        <p className="text-sm text-text-secondary mt-1">Chat with your company data as if it were a colleague.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                        <span className="material-symbols-outlined">lock</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Enterprise Grade</h3>
                        <p className="text-sm text-text-secondary mt-1">Role-based access control and encrypted storage by default.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-background relative overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-left mb-8">
            <Link to="/login" className="text-text-secondary flex items-center gap-1 text-sm hover:text-white mb-6 transition-colors">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to login
            </Link>
            <h2 className="text-3xl font-display font-bold text-white">Create Admin Account</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Set up your workspace and invite your team.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm bg-surface text-white"
                    placeholder="Alex Rivera"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm bg-surface text-white"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Work Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm bg-surface text-white"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm bg-surface text-white"
                    placeholder="Create a strong password"
                  />
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                    Must be at least 8 characters.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_14px_0_rgba(66,85,255,0.39)]"
                >
                  {isLoading ? (
                      <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Creating Workspace...
                      </span>
                  ) : 'Create Account'}
                </button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-xs text-text-secondary leading-5">
                By clicking "Create Account", you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
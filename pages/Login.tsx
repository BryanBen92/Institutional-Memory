import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-surface relative overflow-hidden items-center justify-center border-r border-border">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 max-w-lg px-10 text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 mx-auto mb-8">
                <span className="material-symbols-outlined text-[32px]">database</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">Institutional Memory</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
                Capture, organize, and retrieve your enterprise wisdom with AI-powered semantic search and document reasoning.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary mb-2">security</span>
                    <h3 className="font-bold text-white text-sm">Enterprise Secure</h3>
                    <p className="text-xs text-text-secondary mt-1">SOC2 Compliant VPC</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                     <span className="material-symbols-outlined text-purple-400 mb-2">psychology</span>
                    <h3 className="font-bold text-white text-sm">Neural Search</h3>
                    <p className="text-xs text-text-secondary mt-1">Context-aware recall</p>
                </div>
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-background relative">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden mb-8">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[20px]">database</span>
                </div>
                <h1 className="font-display font-bold text-xl text-white">InstiMem</h1>
             </div>
          </div>

          <div className="text-left mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm bg-surface text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded bg-surface"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                    Remember for 30 days
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-hover">
                    Forgot password?
                  </a>
                </div>
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
                          Signing in...
                      </span>
                  ) : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-text-secondary">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-border rounded-lg shadow-sm bg-surface text-sm font-medium text-gray-300 hover:bg-surface-light hover:text-white transition-colors">
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                </button>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-border rounded-lg shadow-sm bg-surface text-sm font-medium text-gray-300 hover:bg-surface-light hover:text-white transition-colors">
                   <span className="sr-only">Sign in with Microsoft</span>
                   <svg className="w-5 h-5" viewBox="0 0 23 23">
                       <path fill="#f3f3f3" d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
                   </svg>
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-text-secondary">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-primary hover:text-primary-hover transition-colors">
                    Sign up
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
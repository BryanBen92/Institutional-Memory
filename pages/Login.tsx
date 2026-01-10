import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return null; // Or a simple spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-display">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-[440px] bg-surface/50 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Logo Section */}
        <div className="pt-10 pb-6 flex flex-col items-center border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 text-primary mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10">
                    <span className="material-symbols-outlined text-[28px]">database</span>
                </div>
                <span className="text-white text-xl font-bold tracking-tight">Institutional Memory</span>
            </Link>
            <p className="text-text-secondary text-sm">Empowering organizational knowledge</p>
        </div>

        <div className="px-8 pt-8 pb-10">
            <h2 className="text-white text-2xl font-bold leading-tight text-center mb-2">Welcome Back</h2>
            <p className="text-text-secondary text-sm font-normal text-center mb-8">Please enter your credentials to access your workspace.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Email Address</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xl">alternate_email</span>
                        <input 
                            className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-background/50 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-600" 
                            placeholder="name@company.com" 
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-300 text-sm font-medium">Password</label>
                        <a className="text-primary text-xs font-semibold hover:underline cursor-pointer">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xl">lock</span>
                        <input 
                            className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-lg bg-background/50 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-600" 
                            placeholder="••••••••" 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/25 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            <span>Signing In...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </>
                    )}
                </button>
            </form>

            {/* SSO Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-3 text-text-secondary font-medium tracking-wider rounded">Or continue with</span>
                </div>
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-3 gap-3">
                <button type="button" className="flex items-center justify-center p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors bg-surface">
                     {/* Google Icon SVG Mock */}
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                     </svg>
                </button>
                <button type="button" className="flex items-center justify-center p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors bg-surface">
                    {/* Microsoft Icon SVG Mock */}
                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                        <path fill="#f3f3f3" d="M0 0h11v11H0z"></path>
                        <path fill="#f3f3f3" d="M12 0h11v11H12z"></path>
                        <path fill="#f3f3f3" d="M0 12h11v11H0z"></path>
                        <path fill="#f3f3f3" d="M12 12h11v11H12z"></path>
                    </svg>
                </button>
                <button type="button" className="flex items-center justify-center p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors bg-surface font-bold text-white tracking-widest text-xs">
                    OKTA
                </button>
            </div>
        </div>

        {/* Footer Link */}
        <div className="bg-surface/80 py-4 px-8 border-t border-white/10 flex justify-center">
            <p className="text-text-secondary text-xs">
                Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
            </p>
        </div>
      </div>

       {/* System Message */}
       <div className="absolute bottom-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface/40 border border-white/10 rounded-full text-[10px] text-gray-400 font-medium uppercase tracking-widest backdrop-blur-md mb-4">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All systems operational
            </div>
            <div className="flex gap-6 justify-center">
                <a className="text-text-secondary hover:text-white text-xs transition-colors" href="#">Privacy Policy</a>
                <a className="text-text-secondary hover:text-white text-xs transition-colors" href="#">Terms of Service</a>
                <a className="text-text-secondary hover:text-white text-xs transition-colors" href="#">Help Center</a>
            </div>
        </div>
    </div>
  );
};

export default Login;
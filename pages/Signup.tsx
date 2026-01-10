import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Step = 1 | 2 | 3;
type Role = 'admin' | 'employee';

const Signup: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [companyDetails, setCompanyDetails] = useState({ name: '', industry: '', teamSize: '', isRep: false });
  const [joinCode, setJoinCode] = useState('');
  const [profile, setProfile] = useState({ fullName: '', jobTitle: '', email: 'demo@example.com', password: 'password' });

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3) as Step);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call and login
    setTimeout(async () => {
        try {
            await login(profile.email || "demo@example.com", "password");
            navigate('/dashboard');
        } catch (e) {
            console.error(e);
            navigate('/dashboard'); // Fallback for demo
        }
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
       {/* Top Navigation */}
       <header className="flex items-center justify-between border-b border-white/10 bg-background/80 backdrop-blur-md px-4 md:px-10 py-3 sticky top-0 z-50">
           <Link to="/" className="flex items-center gap-3 text-primary">
               <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                   <span className="material-symbols-outlined text-[24px]">database</span>
               </div>
               <h2 className="text-white text-lg font-bold tracking-tight">Institutional Memory</h2>
           </Link>
           <div className="flex gap-4 items-center">
               <span className="hidden md:inline-block text-sm text-text-secondary font-medium">Already have an account?</span>
               <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold tracking-wide hover:bg-primary/20 transition-colors">
                   Log in
               </Link>
           </div>
       </header>

       <main className="flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full">
           {/* Sidebar Navigation */}
           <aside className="hidden lg:flex w-80 border-r border-white/10 bg-[#16182D]/50 p-8 flex-col justify-between h-[calc(100vh-64px)] sticky top-16">
               <div className="flex flex-col gap-8">
                   <div>
                       <h1 className="text-white text-lg font-bold">Signup Progress</h1>
                       <p className="text-text-secondary text-sm">Step {step} of 3</p>
                   </div>
                   <nav className="flex flex-col gap-2">
                       <div className={`flex items-center gap-3 px-3 py-3 rounded-lg ${step > 1 ? 'text-green-400' : 'bg-primary/20 border-l-4 border-primary text-white'}`}>
                           <span className={`material-symbols-outlined ${step > 1 ? 'text-green-400' : 'text-primary'}`}>{step > 1 ? 'check_circle' : 'account_circle'}</span>
                           <p className="text-sm font-medium">Account & Role</p>
                       </div>
                       <div className={`flex items-center gap-3 px-3 py-3 rounded-lg ${step === 2 ? 'bg-primary/20 border-l-4 border-primary text-white' : step > 2 ? 'text-green-400' : 'text-text-secondary'}`}>
                           <span className={`material-symbols-outlined ${step > 2 ? 'text-green-400' : step === 2 ? 'text-primary' : ''}`}>{step > 2 ? 'check_circle' : 'corporate_fare'}</span>
                           <p className="text-sm font-medium">Organization Setup</p>
                       </div>
                       <div className={`flex items-center gap-3 px-3 py-3 rounded-lg ${step === 3 ? 'bg-primary/20 border-l-4 border-primary text-white' : 'text-text-secondary'}`}>
                           <span className={`material-symbols-outlined ${step === 3 ? 'text-primary' : ''}`}>verified</span>
                           <p className="text-sm font-medium">Finish Profile</p>
                       </div>
                   </nav>
               </div>
               <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                   <p className="text-xs text-text-secondary leading-relaxed">
                       Need help setting up your organization?<br/>
                       <a href="#" className="text-primary font-bold hover:underline">Visit our documentation</a>
                   </p>
               </div>
           </aside>

           {/* Main Content Area */}
           <section className="flex-1 p-6 md:p-12 overflow-y-auto">
               <div className="max-w-[720px] mx-auto">
                   
                   {/* STEP 1: ROLE SELECTION */}
                   {step === 1 && (
                       <div className="animate-fade-in">
                           <div className="flex flex-col gap-3 mb-8">
                                <div className="flex gap-6 justify-between items-center mb-2">
                                    <p className="text-primary text-sm font-bold uppercase tracking-widest">Step 1 of 3</p>
                                    <p className="text-white text-sm font-medium">33% Complete</p>
                                </div>
                                <div className="rounded-full bg-white/10 h-2.5 overflow-hidden">
                                    <div className="h-full rounded-full bg-primary transition-all duration-500 w-1/3"></div>
                                </div>
                               <h1 className="text-white text-3xl md:text-4xl font-black leading-tight mt-4 text-center">
                                   How will you use <span className="text-primary">Institutional Memory</span>?
                               </h1>
                               <p className="text-text-secondary text-lg text-center max-w-[600px] mx-auto">
                                   Select the path that best matches your objective. This helps us tailor your workspace automatically.
                               </p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                               {/* Admin Card */}
                               <div 
                                    onClick={() => handleRoleSelect('admin')}
                                    className={`group relative flex flex-col gap-4 p-6 rounded-xl border-2 bg-[#16182D] cursor-pointer transition-all duration-300 ${role === 'admin' ? 'border-primary shadow-[0_0_30px_rgba(66,85,255,0.2)]' : 'border-white/10 hover:border-primary/50'}`}
                                >
                                   <div className="w-full bg-primary/10 aspect-video md:aspect-square flex items-center justify-center rounded-lg overflow-hidden relative">
                                        {/* Abstract placeholder image */}
                                       <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
                                       <div className="relative z-10 bg-background p-4 rounded-full shadow-xl text-primary border border-white/10">
                                           <span className="material-symbols-outlined text-4xl">corporate_fare</span>
                                       </div>
                                   </div>
                                   <div className="flex flex-col gap-1">
                                       <div className="flex justify-between items-center">
                                           <h3 className="text-white text-xl font-bold">I'm an Admin</h3>
                                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === 'admin' ? 'border-primary' : 'border-white/30'}`}>
                                               {role === 'admin' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                           </div>
                                       </div>
                                       <p className="text-text-secondary text-sm leading-relaxed">Create a new organization from scratch and invite your core team members.</p>
                                   </div>
                               </div>

                               {/* Employee Card */}
                               <div 
                                    onClick={() => handleRoleSelect('employee')}
                                    className={`group relative flex flex-col gap-4 p-6 rounded-xl border-2 bg-[#16182D] cursor-pointer transition-all duration-300 ${role === 'employee' ? 'border-primary shadow-[0_0_30px_rgba(66,85,255,0.2)]' : 'border-white/10 hover:border-primary/50'}`}
                                >
                                   <div className="w-full bg-primary/10 aspect-video md:aspect-square flex items-center justify-center rounded-lg overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-green-400/20 opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
                                       <div className="relative z-10 bg-background p-4 rounded-full shadow-xl text-primary border border-white/10">
                                           <span className="material-symbols-outlined text-4xl">group</span>
                                       </div>
                                   </div>
                                   <div className="flex flex-col gap-1">
                                       <div className="flex justify-between items-center">
                                           <h3 className="text-white text-xl font-bold">I'm an Employee</h3>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === 'employee' ? 'border-primary' : 'border-white/30'}`}>
                                               {role === 'employee' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                           </div>
                                       </div>
                                       <p className="text-text-secondary text-sm leading-relaxed">Join an existing organization that already has an account set up.</p>
                                   </div>
                               </div>
                           </div>

                           <div className="flex justify-end pt-4 border-t border-white/10">
                               <button type="button" onClick={nextStep} className="flex items-center gap-2 px-10 py-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all">
                                   Next Step <span className="material-symbols-outlined">arrow_forward</span>
                               </button>
                           </div>
                       </div>
                   )}

                   {/* STEP 2: ORG SETUP */}
                   {step === 2 && (
                       <div className="animate-fade-in">
                           <div className="flex flex-col gap-3 mb-8">
                               <h2 className="text-white text-4xl font-black leading-tight">Organization Setup</h2>
                               <p className="text-text-secondary text-base">Tell us a bit more about your team or enter a join code.</p>
                           </div>

                           {/* Switcher */}
                           <div className="flex p-1.5 mb-8 bg-[#16182D] rounded-xl border border-white/10 w-full md:w-fit">
                               <button 
                                   onClick={() => setRole('admin')}
                                   className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-white text-background shadow' : 'text-text-secondary hover:text-white'}`}
                                >
                                   Admin (New Team)
                               </button>
                               <button 
                                   onClick={() => setRole('employee')}
                                   className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'employee' ? 'bg-white text-background shadow' : 'text-text-secondary hover:text-white'}`}
                                >
                                   Employee (Join Code)
                               </button>
                           </div>

                           {role === 'admin' ? (
                               <div className="space-y-6">
                                   <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Company Details</h3>
                                   <div className="flex flex-col gap-2">
                                       <label className="text-sm font-semibold text-white">Company Name</label>
                                       <input 
                                           value={companyDetails.name}
                                           onChange={e => setCompanyDetails({...companyDetails, name: e.target.value})}
                                           className="px-4 py-3 rounded-lg border border-white/10 bg-[#16182D] text-white focus:ring-2 focus:ring-primary outline-none" 
                                           placeholder="e.g. Acme Industries" 
                                       />
                                   </div>
                                   <div className="grid grid-cols-2 gap-6">
                                       <div className="flex flex-col gap-2">
                                           <label className="text-sm font-semibold text-white">Industry</label>
                                            <select 
                                                value={companyDetails.industry}
                                                onChange={e => setCompanyDetails({...companyDetails, industry: e.target.value})}
                                                className="px-4 py-3 rounded-lg border border-white/10 bg-[#16182D] text-white focus:ring-2 focus:ring-primary outline-none"
                                            >
                                               <option value="">Select Industry</option>
                                               <option value="tech">Technology</option>
                                               <option value="health">Healthcare</option>
                                               <option value="finance">Finance</option>
                                           </select>
                                       </div>
                                       <div className="flex flex-col gap-2">
                                           <label className="text-sm font-semibold text-white">Team Size</label>
                                            <select 
                                                value={companyDetails.teamSize}
                                                onChange={e => setCompanyDetails({...companyDetails, teamSize: e.target.value})}
                                                className="px-4 py-3 rounded-lg border border-white/10 bg-[#16182D] text-white focus:ring-2 focus:ring-primary outline-none"
                                            >
                                               <option value="">Select Size</option>
                                               <option value="1-10">1-10</option>
                                               <option value="11-50">11-50</option>
                                               <option value="50+">50+</option>
                                           </select>
                                       </div>
                                   </div>
                                    <label className="flex items-center gap-3 cursor-pointer group pt-2">
                                        <input 
                                            type="checkbox" 
                                            checked={companyDetails.isRep}
                                            onChange={e => setCompanyDetails({...companyDetails, isRep: e.target.checked})}
                                            className="w-5 h-5 rounded border-white/20 bg-[#16182D] text-primary focus:ring-primary" 
                                        />
                                        <span className="text-sm text-text-secondary group-hover:text-white transition-colors">I am the authorized representative for this organization.</span>
                                    </label>
                               </div>
                           ) : (
                               <div className="space-y-6">
                                   <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Join Your Team</h3>
                                   <div className="bg-[#16182D] p-10 rounded-2xl border border-white/10 flex flex-col items-center text-center gap-6">
                                       <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                           <span className="material-symbols-outlined text-4xl">vpn_key</span>
                                       </div>
                                       <div>
                                           <label className="text-lg font-bold text-white block">Enter Join Code</label>
                                           <p className="text-sm text-text-secondary">Your team administrator should have provided you with a 6-digit code.</p>
                                       </div>
                                       <input 
                                           value={joinCode}
                                           onChange={e => setJoinCode(e.target.value)}
                                           className="w-full max-w-xs text-center text-3xl font-mono tracking-[0.5em] uppercase px-4 py-5 rounded-xl border-2 border-white/10 bg-background focus:border-primary outline-none transition-all placeholder:text-white/10" 
                                           maxLength={6} 
                                           placeholder="ABC-123" 
                                       />
                                   </div>
                               </div>
                           )}

                           <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                               <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-text-secondary hover:bg-white/5 hover:text-white transition-all">
                                   <span className="material-symbols-outlined">arrow_back</span> Back
                               </button>
                               <button type="button" onClick={nextStep} className="flex items-center gap-2 px-10 py-3 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all">
                                   Next Step <span className="material-symbols-outlined">arrow_forward</span>
                               </button>
                           </div>
                       </div>
                   )}

                   {/* STEP 3: PROFILE */}
                   {step === 3 && (
                       <div className="animate-fade-in">
                           <div className="bg-[#16182D] rounded-xl border border-white/10 overflow-hidden">
                               <div className="p-8 border-b border-white/10">
                                   <div className="flex gap-6 justify-between items-center mb-4">
                                       <p className="text-white text-sm font-semibold uppercase tracking-wider">Step 3 of 3: Profile Completion</p>
                                       <p className="text-primary text-sm font-bold">100%</p>
                                   </div>
                                   <div className="rounded-full bg-white/10 h-2 overflow-hidden">
                                       <div className="h-full bg-primary w-full"></div>
                                   </div>
                                   <p className="text-text-secondary text-sm italic mt-3">Final details to get you started!</p>
                               </div>
                               
                               <div className="p-8">
                                   <h1 className="text-3xl font-black text-white mb-2">Final Step: Complete Your Profile</h1>
                                   <p className="text-text-secondary mb-8">Tell us a bit more about yourself to personalize your experience.</p>

                                   <div className="flex flex-col items-center mb-8 p-6 bg-background/50 rounded-xl border border-dashed border-white/10">
                                       <div className="w-24 h-24 rounded-full bg-surface border-4 border-[#16182D] shadow-lg mb-4 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                            {/* Avatar Placeholder */}
                                            <span className="material-symbols-outlined text-4xl text-text-secondary">person</span>
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-white">edit</span>
                                            </div>
                                       </div>
                                       <p className="text-white font-bold mb-1">Upload Profile Picture</p>
                                       <p className="text-xs text-text-secondary mb-4">Recommended size 400x400px</p>
                                       <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors flex items-center gap-2">
                                           <span className="material-symbols-outlined text-base">cloud_upload</span> Select Photo
                                       </button>
                                   </div>

                                   <form onSubmit={handleFinish} className="space-y-6">
                                       <div className="space-y-2">
                                           <label className="text-white font-semibold">Full Name</label>
                                           <div className="relative">
                                               <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">person</span>
                                               <input 
                                                   value={profile.fullName}
                                                   onChange={e => setProfile({...profile, fullName: e.target.value})}
                                                   className="w-full pl-12 pr-4 py-3.5 bg-background border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" 
                                                   placeholder="e.g., Jane Doe" 
                                                   required
                                               />
                                           </div>
                                       </div>
                                       <div className="space-y-2">
                                           <label className="text-white font-semibold">Job Title</label>
                                           <div className="relative">
                                               <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">work</span>
                                               <input 
                                                   value={profile.jobTitle}
                                                   onChange={e => setProfile({...profile, jobTitle: e.target.value})}
                                                   className="w-full pl-12 pr-4 py-3.5 bg-background border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" 
                                                   placeholder="e.g., Knowledge Manager" 
                                                   required
                                               />
                                           </div>
                                       </div>
                                       
                                       <label className="flex items-start gap-3 py-2 cursor-pointer">
                                           <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/20 bg-background text-primary focus:ring-primary" required />
                                           <span className="text-sm text-text-secondary">
                                               I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
                                           </span>
                                       </label>

                                       <div className="flex gap-4 pt-4 border-t border-white/10">
                                           <button type="button" onClick={prevStep} className="w-1/3 py-3.5 rounded-lg font-bold text-white hover:bg-white/5 transition-colors">
                                               Back
                                           </button>
                                           <button type="submit" disabled={isLoading} className="w-2/3 py-3.5 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/25 hover:brightness-110 transition-all flex items-center justify-center gap-2">
                                               {isLoading ? (
                                                   <>
                                                       <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                       Finishing...
                                                   </>
                                               ) : 'Finish Setup'}
                                           </button>
                                       </div>
                                   </form>
                               </div>
                           </div>
                       </div>
                   )}
               </div>
           </section>
       </main>
    </div>
  );
};

export default Signup;
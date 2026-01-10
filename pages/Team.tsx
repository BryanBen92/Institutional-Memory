import React, { useState } from 'react';
import { TeamMember, UserRole } from '../types';

const mockTeam: TeamMember[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@instimem.ai', role: UserRole.ADMIN, avatar: 'https://picsum.photos/id/64/200/200', status: 'Active', lastActive: 'Now' },
  { id: '2', name: 'Sarah Jenkins', email: 'sarah.j@instimem.ai', role: UserRole.MEMBER, avatar: 'https://picsum.photos/id/65/200/200', status: 'Active', lastActive: '5m ago' },
  { id: '3', name: 'Michael Chen', email: 'm.chen@instimem.ai', role: UserRole.VIEWER, avatar: 'https://picsum.photos/id/66/200/200', status: 'Offline', lastActive: '2d ago' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@instimem.ai', role: UserRole.MEMBER, avatar: 'https://picsum.photos/id/67/200/200', status: 'Pending', lastActive: '-' },
];

const Team: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(mockTeam);
  const [filter, setFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Pending': return 'bg-orange-500';
      case 'Offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Team Management</h1>
          <p className="text-text-secondary mt-1">Manage access roles and workspace collaborators.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">person_add</span>
          Invite Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-surface border border-border p-5 rounded-xl">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Total Seats</p>
                     <h3 className="text-2xl font-bold text-white mt-1">12 / 20</h3>
                 </div>
                 <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                     <span className="material-symbols-outlined">group</span>
                 </div>
             </div>
             <div className="w-full bg-surface-light h-1.5 rounded-full mt-4 overflow-hidden">
                 <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
             </div>
         </div>
         <div className="bg-surface border border-border p-5 rounded-xl">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Pending Invites</p>
                     <h3 className="text-2xl font-bold text-white mt-1">1</h3>
                 </div>
                 <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
                     <span className="material-symbols-outlined">mail</span>
                 </div>
             </div>
         </div>
         <div className="bg-surface border border-border p-5 rounded-xl">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Online Now</p>
                     <h3 className="text-2xl font-bold text-white mt-1">2</h3>
                 </div>
                 <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                     <span className="material-symbols-outlined">wifi</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
        {['All', 'Active', 'Pending', 'Admins'].map((f) => (
            <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-white text-background' : 'bg-surface border border-border text-text-secondary hover:text-white'}`}
            >
                {f}
            </button>
        ))}
        <div className="flex-1"></div>
        <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-secondary text-[20px]">search</span>
            <input 
                type="text" 
                placeholder="Search team..." 
                className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary text-sm w-64"
            />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-light text-xs font-bold text-text-secondary uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white text-sm">{member.name}</p>
                      <p className="text-xs text-text-secondary">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      member.role === UserRole.ADMIN 
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                    <span className="text-sm text-gray-300">{member.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {member.lastActive}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-secondary hover:text-white p-2 hover:bg-surface-light rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
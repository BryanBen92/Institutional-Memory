import React, { useEffect, useState } from 'react';
import { Document } from '../types';
import { documentService } from '../services/documents';

const StatCard: React.FC<{ label: string; value: string; trend?: string; trendUp?: boolean; icon: string; color: string }> = ({ label, value, trend, trendUp, icon, color }) => (
  <div className="bg-surface border border-border rounded-xl p-5 md:p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{label}</span>
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl md:text-3xl font-display font-bold text-white">{value}</span>
      {trend && (
        <span className={`text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? '+' : ''}{trend}
        </span>
      )}
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1 bg-surface-light">
      <div className="h-full bg-primary/50" style={{ width: '70%' }}></div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [stats, setStats] = useState<any>({
    totalDocs: "...",
    questionsAnswered: "...",
    aiAccuracy: "...",
    activeUsers: "..."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [docsData, statsData] = await Promise.all([
          documentService.getRecent(),
          documentService.getStats()
        ]);
        setRecentDocs(docsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
      return (
          <div className="flex items-center justify-center h-full text-primary">
              <span className="material-symbols-outlined animate-spin text-4xl">autorenew</span>
          </div>
      );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Total Docs" value={stats.totalDocs} trend="12% this month" trendUp={true} icon="description" color="bg-primary" />
        <StatCard label="Questions Answered" value={stats.questionsAnswered} trend="5.2%" trendUp={true} icon="chat_bubble" color="bg-purple-600" />
        <StatCard label="AI Accuracy" value={stats.aiAccuracy} trend="Optimized" trendUp={true} icon="auto_awesome" color="bg-emerald-600" />
        <StatCard label="Active Users" value={stats.activeUsers} trend="3 online now" trendUp={true} icon="group" color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Feed / Recent Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg md:text-xl font-bold text-white">Recent Documents</h3>
            <button className="text-sm font-medium text-primary hover:text-white transition-colors">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="group flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:border-primary transition-all cursor-pointer">
                <div className="relative aspect-video overflow-hidden bg-surface-light">
                  <img src={doc.thumbnail} alt={doc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-background/90 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                    {doc.type}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h4 className="font-bold text-sm text-white truncate group-hover:text-primary transition-colors">{doc.title}</h4>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{doc.date}</span>
                    <span className={`px-2 py-0.5 rounded-full bg-${doc.tagColor}-500/10 text-${doc.tagColor}-400 border border-${doc.tagColor}-500/20`}>{doc.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Chart Placeholder */}
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">Active Users Trend</h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span><span className="text-xs text-text-secondary">Eng</span></div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span className="text-xs text-text-secondary">Mkt</span></div>
                </div>
            </div>
            {/* Visual simulation of a bar chart */}
            <div className="h-40 flex items-end gap-2 px-2">
                {[40, 60, 35, 70, 55, 80, 45, 90, 65, 75, 50, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-surface-light rounded-t-sm relative group">
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-sm group-hover:bg-primary transition-colors" style={{ height: `${h}%` }}></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                <span>Oct 01</span>
                <span>Oct 15</span>
                <span>Today</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Insights */}
        <div className="space-y-6">
            <div className="bg-surface border border-border rounded-xl p-4 md:p-6">
                <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
                    Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['#Q4Projections', '#SecurityAudit', '#Onboarding', '#API_Docs', '#Roadmap2024'].map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 cursor-pointer transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-surface to-primary/10 border border-primary/20 rounded-xl p-4 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl -mr-10 -mt-10"></div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    AI Suggested Reads
                </h3>
                <div className="space-y-3">
                    {[
                        { title: 'Historical Compliance Gaps', reason: 'Based on recent searches' },
                        { title: 'DB Migration Lessons', reason: 'Trending in Engineering' },
                        { title: 'Brand Identity v2', reason: 'Frequently Cited' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-surface/50 border border-white/5 rounded-lg hover:bg-surface-light transition-colors cursor-pointer">
                            <p className="text-[10px] text-primary font-semibold mb-1">{item.reason}</p>
                            <p className="text-sm font-medium text-white leading-tight">{item.title}</p>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                    Get More Insights
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
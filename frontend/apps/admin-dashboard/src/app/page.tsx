'use client';

import { useQuery } from '@tanstack/react-query';
import { 
  Code2, 
  FolderGit2, 
  BookOpen, 
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import { analyticsApi } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: number; 
  icon: React.ElementType; 
  trend?: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: overview } = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsApi.getOverview,
  });

  const { data: activity } = useQuery({
    queryKey: ['analytics', 'activity'],
    queryFn: () => analyticsApi.getActivity(5),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your portfolio CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Skills" 
          value={overview?.totalSkills || 0} 
          icon={Code2}
          trend="+2 this month"
        />
        <StatCard 
          title="Projects" 
          value={overview?.totalProjects || 0} 
          icon={FolderGit2}
          trend="+1 this week"
        />
        <StatCard 
          title="Books Read" 
          value={overview?.totalBooks || 0} 
          icon={BookOpen}
        />
        <StatCard 
          title="Experience" 
          value={overview?.totalExperience || 0} 
          icon={Briefcase}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Quests</p>
              <p className="text-xl font-bold">{overview?.activeQuests || 0}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Quests</p>
              <p className="text-xl font-bold">{overview?.completedQuests || 0}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Featured Projects</p>
              <p className="text-xl font-bold">{overview?.featuredProjects || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {activity?.map((log) => (
            <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{log.action}</span>
                  {' '}on{' '}
                  <span className="text-muted-foreground">{log.entityType}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {(!activity || activity.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

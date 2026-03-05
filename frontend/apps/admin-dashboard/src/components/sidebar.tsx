'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  BookOpen, 
  Quote, 
  Target, 
  Clock, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/skills', label: 'Skills', icon: Code2 },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/books', label: 'Books', icon: BookOpen },
  { href: '/quotes', label: 'Quotes', icon: Quote },
  { href: '/quests', label: 'Quests', icon: Target },
  { href: '/timeline', label: 'Timeline', icon: Clock },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">Admin</h1>
              <p className="text-xs text-muted-foreground">Portfolio CMS</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button className="sidebar-link w-full text-red-500 hover:text-red-400 hover:bg-red-500/10">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

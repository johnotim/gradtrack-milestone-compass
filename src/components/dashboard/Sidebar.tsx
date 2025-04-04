import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  ClipboardList, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { title: 'Students', icon: GraduationCap, href: '/students' },
    { title: 'Milestones', icon: ClipboardList, href: '/milestones' },
    { title: 'Calendar', icon: Calendar, href: '/calendar' },
    { title: 'Documents', icon: FileText, href: '/documents' },
    { title: 'Users', icon: Users, href: '/users' },
  ];

  return (
    <div className={cn(
      "flex flex-col bg-primary-navy text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center">
            <GraduationCap size={24} className="mr-2 text-primary-gold" />
            <span className="font-bold text-lg">GradTrack</span>
          </div>
        )}
        {collapsed && <GraduationCap size={24} className="mx-auto text-primary-gold" />}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role Selector */}
      <div className="p-3">
        {!collapsed ? (
          <RoleSelector />
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary-teal flex items-center justify-center">
              <span className="text-xs font-medium">SA</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 pt-2">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-x-3 px-3 py-2.5 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary-teal text-white" 
                    : "hover:bg-white/10"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-x-3 px-3 py-2 rounded-md transition-colors",
            isActive 
              ? "bg-primary-teal text-white" 
              : "hover:bg-white/10"
          )}
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

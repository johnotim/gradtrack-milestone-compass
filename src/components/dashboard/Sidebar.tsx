
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  ClipboardList, 
  Calendar, 
  FileText, 
  Users, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserCheck,
  MessageSquare,
  Award,
  ChevronDown,
  Folder,
  Settings,
  CalendarCheck,
  CalendarClock
} from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubMenu = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { title: 'Students', icon: GraduationCap, href: '/students' },
    { title: 'Programs', icon: BookOpen, href: '/programs' },
    { title: 'Milestones', icon: ClipboardList, href: '/milestones' },
    { 
      title: 'Supervisors', 
      icon: UserCheck, 
      href: '/supervisors',
      subMenu: [
        { title: 'Allocate to Students', href: '/supervisors/allocate' },
        { title: 'Track Performance', href: '/supervisors/performance' },
        { title: 'Availability Schedule', href: '/supervisors/schedule' }
      ]
    },
    { 
      title: 'Complaints', 
      icon: MessageSquare, 
      href: '/complaints',
      subMenu: [
        { title: 'New Complaints', href: '/complaints/new' },
        { title: 'Under Review', href: '/complaints/review' },
        { title: 'Resolved Issues', href: '/complaints/resolved' }
      ]
    },
    { 
      title: 'Sponsorships', 
      icon: Award, 
      href: '/sponsorships',
      subMenu: [
        { title: 'Available Grants', href: '/sponsorships/grants' },
        { title: 'Corporate Partners', href: '/sponsorships/partners' },
        { title: 'Student Applications', href: '/sponsorships/applications' }
      ]
    },
    { 
      title: 'Academic Calendar', 
      icon: CalendarCheck, 
      href: '/calendar'
    },
    { title: 'Resources', icon: Folder, href: '/resources' },
  ];

  return (
    <div className={cn(
      "flex flex-col bg-primary-navy text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
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

      <nav className="flex-1 pt-2 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.title} className="flex flex-col">
              <div className="flex items-center">
                <NavLink
                  to={item.href}
                  onClick={() => {
                    // If the item has a submenu, toggle its visibility
                    // If no submenu, navigate to the link as normal
                    if (item.subMenu) {
                      toggleSubMenu(item.title);
                    }
                  }}
                  className={({ isActive }) => cn(
                    "flex flex-1 items-center gap-x-3 px-3 py-2.5 rounded-md transition-colors",
                    isActive && !item.subMenu 
                      ? "bg-primary-teal text-white" 
                      : "hover:bg-white/10"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="flex-1">{item.title}</span>}
                </NavLink>
                
                {!collapsed && item.subMenu && (
                  <button 
                    onClick={() => toggleSubMenu(item.title)}
                    className="pr-2 py-2.5 hover:text-primary-gold"
                  >
                    <ChevronDown 
                      size={16} 
                      className={cn(
                        "transition-transform duration-200",
                        expandedItems.includes(item.title) && "transform rotate-180"
                      )} 
                    />
                  </button>
                )}
              </div>
              
              {!collapsed && item.subMenu && expandedItems.includes(item.title) && (
                <ul className="ml-8 mt-1 space-y-1 border-l-2 border-white/10 pl-2">
                  {item.subMenu.map(subItem => (
                    <li key={subItem.title}>
                      <NavLink
                        to={subItem.href}
                        className={({ isActive }) => cn(
                          "flex items-center py-1.5 px-2 text-sm rounded-md transition-colors",
                          isActive 
                            ? "bg-primary-teal/50 text-white" 
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span>{subItem.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

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

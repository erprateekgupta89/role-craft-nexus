
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  CheckCircle,
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
  Book,
  UserCircle,
  Shield,
  Layers,
  FolderKanban
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types/auth';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: Role[];
};

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'Projects',
      href: '/projects',
      icon: <FileText className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP'],
    },
    {
      title: 'Submit PAC',
      href: '/pac/new',
      icon: <Shield className="h-5 w-5" />,
      roles: ['PM'],
    },
    {
      title: 'PAC Review',
      href: '/pac/list',
      icon: <Layers className="h-5 w-5" />,
      roles: ['PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'PAC History',
      href: '/pac/history',
      icon: <FolderKanban className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'Tasks',
      href: '/tasks',
      icon: <CheckCircle className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'MR'],
    },
    {
      title: 'Team',
      href: '/team',
      icon: <Users className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP'],
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: <Calendar className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP'],
    },
    {
      title: 'Documentation',
      href: '/docs',
      icon: <Book className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <UserCircle className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP', 'MR'],
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['PM', 'PoM', 'AVP', 'VP'],
    },
  ];
  
  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  if (!user) return null;

  return (
    <>
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile and desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-white px-4 py-4 transition duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            {/* Logo for mobile sidebar */}
            <div className="lg:hidden px-2 py-4 flex items-center">
              <div className="h-8 w-8 bg-azure-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">RC</span>
              </div>
              <span className="ml-2 text-lg font-semibold">RoleCraft Nexus</span>
            </div>

            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-azure-50 text-azure-600"
                      : "text-gray-700 hover:bg-azure-50 hover:text-azure-600"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-4">
            <div className="rounded-md bg-gray-50 p-3">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-700">
                    Logged in as:
                  </p>
                  <p className="text-sm font-semibold text-azure-600">
                    {user.name} ({user.role})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

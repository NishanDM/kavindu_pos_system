import { useState, useRef, useEffect } from 'react';
import { Bell, HelpCircle, User, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    email: string;
    userType: string;
  };
  onLogout: () => void;
  notifications: number;
  onNotificationClick: () => void;
}

export function Header({ user, onLogout, notifications, onNotificationClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-30 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-base font-semibold text-gray-900">Bike Spare Parts POS</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Help Icon */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Help"
        >
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notification Bell */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          onClick={onNotificationClick}
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notifications > 9 ? '9+' : notifications}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {user.userType}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

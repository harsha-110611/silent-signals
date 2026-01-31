import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../Appicon';


const Header = ({ userRole = 'student', userName = 'User' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigationItems = {
    student: [
      { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
      { label: 'Data Input', path: '/student-data-input', icon: 'FileInput' },
      { label: 'Resources', path: '/learning-resources', icon: 'BookOpen' },
    ],
    parent: [
      { label: 'Dashboard', path: '/parent-dashboard', icon: 'LayoutDashboard' },
      { label: 'Resources', path: '/learning-resources', icon: 'BookOpen' },
    ],
    mentor: [
      { label: 'Dashboard', path: '/mentor-dashboard', icon: 'LayoutDashboard' },
      { label: 'Resources', path: '/learning-resources', icon: 'BookOpen' },
    ],
  };

  const currentNavItems = navigationItems?.[userRole] || navigationItems?.student;

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/authentication-login');
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event?.target?.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card shadow-md z-100">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/student-dashboard')}
              className="flex items-center gap-3 focus-ring rounded-md transition-smooth hover:opacity-80"
              aria-label="Silent Signals Home"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Radio" size={24} color="var(--color-primary)" />
              </div>
              <span className="hidden sm:block text-xl font-heading font-semibold text-foreground">
                Silent Signals
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md transition-smooth
                    focus-ring caption font-medium
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  aria-current={isActivePath(item?.path) ? 'page' : undefined}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative profile-menu-container">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-smooth focus-ring"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} color="var(--color-primary)" />
                </div>
                <span className="hidden md:block caption font-medium text-foreground">
                  {userName}
                </span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-smooth ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-lg shadow-lg border border-border overflow-hidden z-150">
                  <div className="p-3 border-b border-border">
                    <p className="caption font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-smooth text-left caption"
                    >
                      <Icon name="Settings" size={18} />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-smooth text-left caption"
                    >
                      <Icon name="HelpCircle" size={18} />
                      <span>Help</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive transition-smooth text-left caption"
                    >
                      <Icon name="LogOut" size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth focus-ring"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 lg:hidden">
          <div 
            className="absolute inset-0 bg-background"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav 
            className="absolute top-16 left-0 right-0 bottom-0 bg-card overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="p-4 space-y-2">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth
                    focus-ring font-medium
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                  aria-current={isActivePath(item?.path) ? 'page' : undefined}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-smooth text-left"
                >
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-smooth text-left"
                >
                  <Icon name="HelpCircle" size={20} />
                  <span>Help</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-smooth text-left"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
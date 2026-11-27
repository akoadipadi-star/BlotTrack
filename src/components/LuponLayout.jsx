import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  Calendar,
  Users,
  Settings,
  LogOut,
  Eye,
  MessageSquareWarning,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import './LuponLayout.css';

function LuponLayout({
  children,
  language = 'bikol',
  onLanguageChange,
  barangay = 'Abella',
  reportButtonLabel,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isSettingsRoute = location.pathname.startsWith('/lupon-settings');
  const [settingsExpanded, setSettingsExpanded] = useState(isSettingsRoute);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    setSettingsExpanded(isSettingsRoute);
  }, [isSettingsRoute]);

  const navItems = [
    {
      path: '/lupon-dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      path: '/lupon-cases',
      label: 'All Cases',
      icon: FileText,
      badge: 12,
    },
    {
      path: '/lupon-hearings',
      label: 'Hearings',
      icon: Calendar,
      badge: 8,
    },
    {
      path: '/lupon-members',
      label: 'Lupon Members',
      icon: Users,
      badge: 2,
    },
  ];

  const settingsSubItems = [
    {
      path: '/lupon-settings/profile',
      label: 'Profile',
      icon: Users,
    },
    {
      path: '/lupon-settings/archive',
      label: 'Archive',
      icon: FileText,
    },
    {
      path: '/lupon-settings/about',
      label: 'About',
      icon: ShieldCheck,
    },
  ];

  const handleSignOut = () => {
    navigate('/lupon-login');
  };

  const handleSettingsClick = () => {
    if (!isSettingsRoute && !settingsExpanded) {
      setSettingsExpanded(true);
      navigate('/lupon-settings/profile');
    } else {
      setSettingsExpanded((prev) => !prev);
    }
  };

  const floatingLabel =
    reportButtonLabel ||
    (language === 'bikol'
      ? 'Mag-report nin Problema sa System'
      : 'Report a System Problem');

  return (
    <div
      className={`lupon-workspace ${largeText ? 'is-large-text' : ''} ${
        highContrast ? 'is-high-contrast' : ''
      }`}
    >
      {/* Top Workspace Header */}
      <header className="lupon-topbar">
        <div className="lupon-topbar-left">
          <Link to="/lupon-dashboard" className="lupon-brand">
            <img
              src="/blottrack-logo.png"
              alt="BlotTrack Seal"
              className="lupon-brand-seal"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <span
              className="lupon-brand-seal-fallback"
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              BT
            </span>
            <div className="lupon-brand-text">
              <span className="lupon-brand-name">BlotTrack</span>
              <span className="lupon-brand-sub">
                BRGY. {barangay.toUpperCase()}, NAGA CITY
              </span>
            </div>
          </Link>
        </div>

        <div className="lupon-topbar-right">
          {/* English / Tagalog-Bikol Segmented Toggle */}
          <div
            className="lupon-lang-toggle"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              className={`lupon-lang-btn ${
                language === 'en' ? 'is-active' : ''
              }`}
              onClick={() => onLanguageChange && onLanguageChange('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`lupon-lang-btn ${
                language === 'bikol' ? 'is-active' : ''
              }`}
              onClick={() => onLanguageChange && onLanguageChange('bikol')}
            >
              Tagalog-Bikol
            </button>
          </div>

          {/* Aa Malaking Letra */}
          <button
            type="button"
            className={`lupon-a11y-btn ${largeText ? 'is-active' : ''}`}
            onClick={() => setLargeText((prev) => !prev)}
            aria-pressed={largeText}
          >
            <span className="lupon-a11y-aa">Aa</span>
            <span>Malaking Letra</span>
          </button>

          {/* High Contrast */}
          <button
            type="button"
            className={`lupon-a11y-btn ${highContrast ? 'is-active' : ''}`}
            onClick={() => setHighContrast((prev) => !prev)}
            aria-pressed={highContrast}
          >
            <Eye size={14} strokeWidth={2} />
            <span>High Contrast</span>
          </button>

          <div className="lupon-topbar-divider" aria-hidden="true" />

          {/* User Profile Pill */}
          <div className="lupon-user-chip">
            {!isSettingsRoute && (
              <div className="lupon-user-avatar" aria-hidden="true">
                MR
              </div>
            )}
            <div className="lupon-user-meta">
              <span className="lupon-user-name">Maria Reyes</span>
              <span className="lupon-user-role">Barangay Secretary</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body Wrapper: Left Navy Sidebar + Main Canvas */}
      <div className="lupon-body">
        <aside className="lupon-sidebar" aria-label="Workspace navigation">
          <nav className="lupon-sidebar-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === '/lupon-cases' &&
                  location.pathname.startsWith('/lupon-cases'));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`lupon-nav-item ${isActive ? 'is-active' : ''}`}
                >
                  <span className="lupon-nav-item-left">
                    <IconComponent size={17} strokeWidth={1.9} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span className="lupon-nav-badge">{item.badge}</span>
                  )}
                </Link>
              );
            })}

            {/* Expandable Settings Item + Sub-navigation */}
            <div className="lupon-nav-group">
              <button
                type="button"
                className={`lupon-nav-item lupon-nav-item--parent ${
                  isSettingsRoute ? 'is-active' : ''
                }`}
                onClick={handleSettingsClick}
                aria-expanded={settingsExpanded}
              >
                <span className="lupon-nav-item-left">
                  <Settings size={17} strokeWidth={1.9} />
                  <span>Settings</span>
                </span>
                {settingsExpanded ? (
                  <ChevronUp size={15} strokeWidth={2} />
                ) : (
                  <ChevronDown size={15} strokeWidth={2} />
                )}
              </button>

              {settingsExpanded && (
                <div className="lupon-subnav">
                  {settingsSubItems.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive =
                      location.pathname === sub.path ||
                      (sub.path === '/lupon-settings/profile' &&
                        location.pathname === '/lupon-settings');

                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`lupon-subnav-item ${
                          isSubActive ? 'is-active' : ''
                        }`}
                      >
                        <SubIcon size={15} strokeWidth={1.9} />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="lupon-sidebar-footer">
            <button
              type="button"
              className="lupon-signout-btn"
              onClick={handleSignOut}
            >
              <LogOut size={17} strokeWidth={1.9} />
              <span>Sign out</span>
            </button>
          </div>
        </aside>

        <main className="lupon-workspace-main">{children}</main>
      </div>

      {/* Floating Bottom-Right Help Pill */}
      <button
        type="button"
        className="lupon-floating-report-btn"
        onClick={() => console.log('Report system problem clicked')}
      >
        <MessageSquareWarning size={16} strokeWidth={2} />
        <span>{floatingLabel}</span>
      </button>
    </div>
  );
}

export default LuponLayout;
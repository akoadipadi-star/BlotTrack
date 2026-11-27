import { Link, useLocation } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import './Navbar.css';

function Navbar({ language, onLanguageChange }) {
  const location = useLocation();
  const isLuponAuth =
    location.pathname.startsWith('/lupon-login') ||
    location.pathname.startsWith('/lupon-register') ||
    location.pathname.startsWith('/lupon-forgot-password');

  const isResidentSection =
    location.pathname === '/' ||
    location.pathname.startsWith('/file-complaint') ||
    location.pathname.startsWith('/track-case');

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-seal" aria-hidden="true">
            <Shield size={20} strokeWidth={2.2} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-title">BlotTrack</span>
            <span className="navbar-subtitle">
              KATARUNGANG PAMBARANGAY SA CIUDAD NIN NAGA
            </span>
          </div>
        </Link>

        {/* Right Controls */}
        <div className="navbar-actions">
          <Link
            to="/"
            className={`navbar-link ${isResidentSection ? 'active' : ''}`}
          >
            Home
          </Link>

          {/* Language Switcher Pill */}
          <div className="lang-toggle" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'bikol' ? 'active' : ''}`}
              onClick={() => onLanguageChange('bikol')}
            >
              Tagalog-Bikol
            </button>
          </div>

          {isLuponAuth ? (
            <Link to="/" className="resident-portal-link">
              <ArrowLeft size={14} strokeWidth={2.2} />
              <span>Resident Portal</span>
            </Link>
          ) : (
            <Link to="/lupon-login" className="portal-btn">
              Lupon Portal
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
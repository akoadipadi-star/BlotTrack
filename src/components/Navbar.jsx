import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BlotTrackLogo from './BlotTrackLogo';
import './Navbar.css';

function Navbar({ language = 'bikol', onLanguageChange }) {
  const location = useLocation();
  const isLuponAuth =
    location.pathname.startsWith('/lupon-login') ||
    location.pathname.startsWith('/lupon-register') ||
    location.pathname.startsWith('/lupon-forgot-password');

  const isResidentSection =
    location.pathname === '/' ||
    location.pathname.startsWith('/file-complaint') ||
    location.pathname.startsWith('/track-case');

  const content = {
    bikol: {
      subtitle: 'KATARUNGANG PAMBARANGAY SA CIUDAD NIN NAGA',
      home: 'Home',
      residentPortal: 'Resident Portal',
      luponPortal: 'Lupon Portal',
    },
    en: {
      subtitle: 'KATARUNGANG PAMBARANGAY OF NAGA CITY',
      home: 'Home',
      residentPortal: 'Resident Portal',
      luponPortal: 'Lupon Portal',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-seal" aria-hidden="true">
            <BlotTrackLogo size={26} useImage={true} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-title">BlotTrack</span>
            <span className="navbar-subtitle">{t.subtitle}</span>
          </div>
        </Link>

        {/* Right Controls */}
        <div className="navbar-actions">
          <Link
            to="/"
            className={`navbar-link ${isResidentSection ? 'active' : ''}`}
          >
            {t.home}
          </Link>

          {/* Language Switcher Pill */}
          <div
            className="lang-toggle"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              aria-pressed={language === 'en'}
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange?.('en')}
            >
              English
            </button>
            <button
              type="button"
              aria-pressed={language === 'bikol'}
              className={`lang-btn ${language === 'bikol' ? 'active' : ''}`}
              onClick={() => onLanguageChange?.('bikol')}
            >
              Tagalog-Bikol
            </button>
          </div>

          {isLuponAuth ? (
            <Link to="/" className="resident-portal-link">
              <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
              <span>{t.residentPortal}</span>
            </Link>
          ) : (
            <Link to="/lupon-login" className="portal-btn">
              {t.luponPortal}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
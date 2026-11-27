import LuponLayout from '../components/LuponLayout';
import './LuponAbout.css';

function LuponAbout({ language = 'bikol', onLanguageChange }) {
  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={
        language === 'bikol'
          ? 'Mag-report nin Problema sa System'
          : 'Report a System Problem'
      }
    >
      <div className="about-page-container">
        <header className="about-page-header">
          <p className="about-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
          <h1 className="about-title">About</h1>
          <p className="about-subtitle">Impormasyon tungkol sa system.</p>
        </header>
      </div>
    </LuponLayout>
  );
}

export default LuponAbout;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import './TrackCase.css';

const NAGA_BARANGAYS = [
  'Abella',
  'Bagumbayan Norte',
  'Bagumbayan Sur',
  'Balatas',
  'Calauag',
  'Cararayan',
  'Carolina',
  'Concepcion Grande',
  'Concepcion Pequeña',
  'Dayangdang',
  'Del Rosario',
  'Dinaga',
  'Igualdad Interior',
  'Lerma',
  'Liboton',
  'Mabolo',
  'Pacol',
  'Panicuason',
  'Peñafrancia',
  'Sabang',
  'San Felipe',
  'San Francisco',
  'San Isidro',
  'Santa Cruz',
  'Tabuco',
  'Tinago',
  'Triangulo',
];

function TrackCase({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [barangay, setBarangay] = useState('Abella');
  const [caseNumber, setCaseNumber] = useState(
    location.state?.caseNumber || ''
  );

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-track nin Report o Kaso',
      pageSubtitle: 'Siguraduhon na an saimong kaso sana an i-track.',
      cardTitle: 'Hanapon an saimong report',
      cardSubtitle: 'Ilaag an case number kan saimong kaso.',
      barangayLabel: 'Barangay',
      caseNumberLabel: 'Case number',
      submitBtn: 'Isumite',
    },
    en: {
      back: 'Back',
      pageTitle: 'Track a Report or Case',
      pageSubtitle: 'Make sure you only track your own case.',
      cardTitle: 'Find your report',
      cardSubtitle: 'Enter the case number of your case.',
      barangayLabel: 'Barangay',
      caseNumberLabel: 'Case number',
      submitBtn: 'Submit',
    },
  };

  const t = content[language] || content.bikol;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/track-case/status', {
      state: {
        barangay,
        caseNumber: caseNumber.trim() || '2026-011-001',
      },
    });
  };

  return (
    <main className="track-page">
      <div className="track-outer-container">
        {/* Top Back Link */}
        <div className="track-back-row">
          <Link to="/" className="track-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Centered Page Header */}
        <header className="track-header">
          <h1 className="track-page-title">{t.pageTitle}</h1>
          <p className="track-page-subtitle">{t.pageSubtitle}</p>
        </header>

        {/* Centered Lookup Card */}
        <form className="track-card" onSubmit={handleSubmit}>
          <div className="track-icon-circle" aria-hidden="true">
            <Search size={22} strokeWidth={2.1} />
          </div>

          <h2 className="track-card-title">{t.cardTitle}</h2>
          <p className="track-card-subtitle">{t.cardSubtitle}</p>

          <div className="track-fields">
            {/* Barangay Dropdown */}
            <div className="track-field">
              <label htmlFor="trackBarangay" className="track-label">
                {t.barangayLabel} <span className="track-required">*</span>
              </label>
              <div className="track-select-wrapper">
                <select
                  id="trackBarangay"
                  className="track-select"
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                >
                  {NAGA_BARANGAYS.map((brgy) => (
                    <option key={brgy} value={brgy}>
                      {brgy}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="track-select-chevron"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Case Number Input */}
            <div className="track-field">
              <label htmlFor="trackCaseNumber" className="track-label">
                {t.caseNumberLabel} <span className="track-required">*</span>
              </label>
              <input
                id="trackCaseNumber"
                type="text"
                className="track-input"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="track-submit-btn">
            {t.submitBtn}
          </button>
        </form>
      </div>
    </main>
  );
}

export default TrackCase;
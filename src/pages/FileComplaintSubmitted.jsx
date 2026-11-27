import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import './FileComplaintSubmitted.css';

function maskMobileNumber(rawNumber) {
  if (!rawNumber) return '09•• ••• 7821';
  const digits = rawNumber.replace(/\D/g, '');
  if (digits.length >= 4) {
    const lastFour = digits.slice(-4);
    return `09•• ••• ${lastFour}`;
  }
  return '09•• ••• 7821';
}

function FileComplaintSubmitted({ language = 'bikol' }) {
  const location = useLocation();
  const state = location.state || {};
  const maskedPhone = maskMobileNumber(state.complainantInfo?.mobileNumber);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Naipasa na an report',
      caseLabel: 'SAIMONG CASE NUMBER',
      caseNumber: '2026-011-001',
      savedNotePrefix: 'Itagama an numerong ini. Ipinadara man sa ',
      nextTitle: 'Ano an masunod?',
      nextDesc:
        'Ive-verify kan Secretary an blotter asin ihahanda an certification. Makakaresibi kamo nin SMS update.',
      homeBtn: 'Magbalik sa home',
      trackBtn: 'I-track an report',
    },
    en: {
      back: 'Back',
      pageTitle: 'Report submitted',
      caseLabel: 'YOUR CASE NUMBER',
      caseNumber: '2026-011-001',
      savedNotePrefix: 'Save this number. Also sent to ',
      nextTitle: 'What happens next?',
      nextDesc:
        'The Secretary will verify the blotter and prepare the certification. You will receive an SMS update.',
      homeBtn: 'Back to home',
      trackBtn: 'Track report',
    },
  };

  const t = content[language] || content.bikol;

  return (
    <main className="submitted-page">
      <div className="submitted-outer-container">
        {/* Top Back Link */}
        <div className="submitted-back-row">
          <Link to="/" className="submitted-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Centered Page Heading */}
        <h1 className="submitted-page-title">{t.pageTitle}</h1>

        {/* Centered Confirmation Card */}
        <section className="submitted-card" aria-label={t.pageTitle}>
          {/* Green Success Circle */}
          <div className="submitted-check-circle" aria-hidden="true">
            <Check size={28} strokeWidth={2.8} />
          </div>

          <p className="submitted-case-label">{t.caseLabel}</p>
          <p className="submitted-case-number">{t.caseNumber}</p>

          <p className="submitted-sms-note">
            {t.savedNotePrefix}
            <strong>{maskedPhone}</strong>.
          </p>

          {/* Next Steps Info Box */}
          <div className="submitted-next-box">
            <Clock
              size={16}
              strokeWidth={2}
              className="submitted-next-icon"
              aria-hidden="true"
            />
            <div className="submitted-next-content">
              <p className="submitted-next-title">{t.nextTitle}</p>
              <p className="submitted-next-desc">{t.nextDesc}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="submitted-actions">
            <Link to="/" className="submitted-btn-secondary">
              {t.homeBtn}
            </Link>
            <Link
              to="/track-case"
              state={{ caseNumber: t.caseNumber }}
              className="submitted-btn-primary"
            >
              {t.trackBtn}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FileComplaintSubmitted;
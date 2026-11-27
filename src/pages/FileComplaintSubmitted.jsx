import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Clock,
  Copy,
  AlertCircle,
} from 'lucide-react';
import './FileComplaintSubmitted.css';

const CASE_NUMBER_PATTERN = /^\d{4}-\d{3}-\d{3}$/;

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
  const [copied, setCopied] = useState(false);

  const hasValidSubmission =
    Boolean(state.complainantInfo?.fullName?.trim()) &&
    Boolean(state.complainantInfo?.mobileNumber?.trim()) &&
    Boolean(state.incidentData?.narrative?.trim());

  const generatedCaseNumber =
    typeof state.caseNumber === 'string' &&
    CASE_NUMBER_PATTERN.test(state.caseNumber.trim())
      ? state.caseNumber.trim()
      : '2026-011-001';

  const barangay = state.complainantInfo?.barangay || 'Abella';
  const isKpCase = state.reportType === 'kp';
  const maskedPhone = maskMobileNumber(state.complainantInfo?.mobileNumber);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Naipasa na an report',
      directAccessWarning:
        'Mayo nin nahanap na aktibong isinumiter na reklamo. Nagpapahiling nin sample confirmation — mag-file nin bagong reklamo tanganing makakua nin opisyal na Case Number.',
      fileNewLink: 'Mag-file nin reklamo',
      caseLabel: 'SAIMONG CASE NUMBER',
      caseNumber: generatedCaseNumber,
      copyLabel: copied ? 'Nakopya na!' : 'Kopyahon',
      savedNotePrefix: 'Itagama an numerong ini. Ipinadara man sa ',
      nextTitle: 'Ano an masunod?',
      nextDesc: isKpCase
        ? 'Ive-verify kan Secretary an KP complaint asin magpapadara nin summon para sa enot na mediation. Makakaresibi kamo nin SMS update.'
        : 'Ive-verify kan Secretary an blotter asin ihahanda an certification. Makakaresibi kamo nin SMS update.',
      homeBtn: 'Magbalik sa home',
      trackBtn: 'I-track an report',
    },
    en: {
      back: 'Back',
      pageTitle: 'Report submitted',
      directAccessWarning:
        'No active complaint submission was found. Showing a sample confirmation — file a new complaint to receive an official Case Number.',
      fileNewLink: 'File a complaint',
      caseLabel: 'YOUR CASE NUMBER',
      caseNumber: generatedCaseNumber,
      copyLabel: copied ? 'Copied!' : 'Copy',
      savedNotePrefix: 'Save this number. Also sent to ',
      nextTitle: 'What happens next?',
      nextDesc: isKpCase
        ? 'The Secretary will verify the KP complaint and issue a summons for the initial mediation. You will receive an SMS update.'
        : 'The Secretary will verify the blotter and prepare the certification. You will receive an SMS update.',
      homeBtn: 'Back to home',
      trackBtn: 'Track report',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleCopyCaseNumber = async () => {
    try {
      await navigator.clipboard.writeText(t.caseNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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

        {/* Direct-Navigation Fallback Notice */}
        {!hasValidSubmission && (
          <div className="submitted-warning-banner" role="status">
            <div className="submitted-warning-left">
              <AlertCircle size={16} strokeWidth={2.1} aria-hidden="true" />
              <span>{t.directAccessWarning}</span>
            </div>
            <Link to="/file-complaint" className="submitted-warning-link">
              {t.fileNewLink}
            </Link>
          </div>
        )}

        {/* Centered Confirmation Card */}
        <section className="submitted-card" aria-label={t.pageTitle}>
          {/* Green Success Circle */}
          <div className="submitted-check-circle" aria-hidden="true">
            <Check size={28} strokeWidth={2.8} />
          </div>

          <p className="submitted-case-label">{t.caseLabel}</p>
          <div className="submitted-case-number-row">
            <p className="submitted-case-number">{t.caseNumber}</p>
            <button
              type="button"
              className="submitted-copy-btn"
              onClick={handleCopyCaseNumber}
              aria-label={`${t.copyLabel} ${t.caseNumber}`}
            >
              <Copy size={13} strokeWidth={2.1} />
              <span>{t.copyLabel}</span>
            </button>
          </div>

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
              state={{ caseNumber: t.caseNumber, barangay }}
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
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import ComplaintStepper from '../components/ComplaintStepper';
import './FileComplaintStep6.css';

function FileComplaintStep6({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [isConfirmed, setIsConfirmed] = useState(true);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Suri-on asin ipasa',
      stepSubheading: 'Siguraduhon na tama an gabos na impormasyon.',
      row1Title: 'Klase nin report',
      row2Title: 'Your details',
      row3Title: 'Report',
      row4Title: 'Other party',
      row5Title: 'Evidence',
      editBtn: 'Edit',
      confirmLabel: 'Kinukumpirmar ko na tama an impormasyong itinao ko.',
      submitBtn: 'Ligtas na ipasa',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'Review and submit',
      stepSubheading: 'Make sure all information is accurate.',
      row1Title: 'Type of report',
      row2Title: 'Your details',
      row3Title: 'Report',
      row4Title: 'Other party',
      row5Title: 'Evidence',
      editBtn: 'Edit',
      confirmLabel: 'I confirm that the information I provided is accurate.',
      submitBtn: 'Submit securely',
    },
  };

  const t = content[language] || content.bikol;

  // Build summary strings from wizard state, falling back to the exact Figma preview values
  const reportTypeSummary =
    state.reportType === 'kp'
      ? 'Katarungang Pambarangay • Reklamo para sa Pag-aayos'
      : 'Barangay Blotter • Incident Log';

  const complainantSummary = (() => {
    const info = state.complainantInfo;
    if (info && (info.fullName || info.mobileNumber)) {
      return [
        info.fullName || 'Juan Dela Cruz',
        info.mobileNumber || '0912 345 7821',
        info.purokZone || 'Purok 4',
      ].join(' • ');
    }
    return 'Juan Dela Cruz • 0912 345 7821 • Purok 4';
  })();

  const incidentSummary = (() => {
    const inc = state.incidentData;
    if (inc && (inc.caseType || inc.incidentDate)) {
      return [
        inc.caseType || 'Missing item',
        inc.incidentDate || 'May 23, 2025',
      ].join(' • ');
    }
    return 'Missing item • May 23, 2025';
  })();

  const respondentSummary = (() => {
    const resp = state.respondentData;
    if (resp && resp.name) {
      return [resp.name, resp.purokZone || 'Purok 4'].join(' • ');
    }
    return 'Pedro Santos • Purok 4';
  })();

  const evidenceSummary = (() => {
    const files = state.evidenceFiles;
    if (Array.isArray(files) && files.length > 0) {
      return `${files.length} ${files.length === 1 ? 'file' : 'files'} securely attached`;
    }
    return '2 files securely attached';
  })();

  const summaryRows = [
    {
      title: t.row1Title,
      detail: reportTypeSummary,
      editPath: '/file-complaint',
    },
    {
      title: t.row2Title,
      detail: complainantSummary,
      editPath: '/file-complaint/step-2',
    },
    {
      title: t.row3Title,
      detail: incidentSummary,
      editPath: '/file-complaint/step-3',
    },
    {
      title: t.row4Title,
      detail: respondentSummary,
      editPath: '/file-complaint/step-4',
    },
    {
      title: t.row5Title,
      detail: evidenceSummary,
      editPath: '/file-complaint/step-5',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirmed) return;
    navigate('/file-complaint/submitted', { state });
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link
            to="/file-complaint/step-5"
            state={state}
            className="complaint-back-link"
          >
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Title & Privacy Assurance */}
        <header className="complaint-header">
          <h1 className="complaint-title">{t.pageTitle}</h1>
          <div className="complaint-privacy">
            <ShieldCheck size={15} strokeWidth={2} />
            <span>{t.privacyText}</span>
          </div>
        </header>

        {/* 6-Step Progress Bar */}
        <ComplaintStepper currentStep={6} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit}>
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">6</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* Grouped Summary List */}
          <div className="review-summary-box">
            {summaryRows.map((row) => (
              <div key={row.title} className="review-summary-row">
                <div className="review-summary-content">
                  <h3 className="review-summary-title">{row.title}</h3>
                  <p className="review-summary-detail">{row.detail}</p>
                </div>
                <Link
                  to={row.editPath}
                  state={state}
                  className="review-edit-link"
                >
                  {t.editBtn}
                </Link>
              </div>
            ))}
          </div>

          {/* Confirmation Checkbox */}
          <label className="step6-confirm-row" htmlFor="confirmAccuracy">
            <input
              id="confirmAccuracy"
              type="checkbox"
              className="step6-confirm-checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <span className="step6-confirm-label">{t.confirmLabel}</span>
          </label>

          <hr className="complaint-divider step6-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link
              to="/file-complaint/step-5"
              state={state}
              className="btn-cancel"
            >
              {t.back}
            </Link>

            <button
              type="submit"
              className="btn-continue"
              disabled={!isConfirmed}
            >
              <span>{t.submitBtn}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FileComplaintStep6;
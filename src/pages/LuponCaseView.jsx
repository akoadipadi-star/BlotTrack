import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquareText,
  Calendar,
  FileText,
  Check,
  X,
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import './LuponCaseView.css';

function parseParties(partiesString) {
  if (!partiesString || typeof partiesString !== 'string') {
    return ['Juan Dela Cruz', 'Pedro Santos'];
  }
  const parts = partiesString.split(/\s+vs\.?\s+/i);
  if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
    return [parts[0].trim(), parts[1].trim()];
  }
  return [partiesString.trim(), 'Pedro Santos'];
}

function LuponCaseView({ language = 'bikol', onLanguageChange }) {
  const { caseId } = useParams();
  const location = useLocation();
  const passedCase = location.state?.caseItem;

  const [smsSent, setSmsSent] = useState(false);
  const [previewFileName, setPreviewFileName] = useState('');

  const [complainantName, respondentName] = parseParties(passedCase?.parties);

  const sanitizedCaseId =
    typeof caseId === 'string' && /^[a-zA-Z0-9-]+$/.test(caseId.trim())
      ? caseId.trim()
      : 'KP-2025-00842';

  const content = {
    bikol: {
      reportBtn: 'Mag-report nin Problema sa System',
      back: 'Magbalik',
      statusBadge: 'IN MEDIATION',
      smsSentLabel: 'Naipadara na an SMS',
      sendSmsLabel: 'Magpadara nin SMS Reminder',
      hearingsLabel: 'Hearings',
      narrativeHeading: 'Naratibo',
      complainantBadge: 'COMPLAINANT',
      respondentBadge: 'RESPONDENT',
      addressLabel: 'Address',
      mobileLabel: 'Mobile',
      reliefHeading: 'Requested Relief / Hinihinging Ayos',
      incidentInfoHeading: 'Impormasyon kan Insidente',
      titleField: 'Complaint title',
      natureField: 'Nature',
      dateFiledField: 'Date filed',
      locationField: 'Location',
      filedThroughField: 'Filed through',
      evidenceHeading: 'Evidence Attached',
      filesBadge: (count) => `${count} ${count === 1 ? 'FILE' : 'FILES'}`,
      previewNotice: (file) => `Binubuksan an preview kan dokumento: ${file}`,
      closePreviewLabel: 'Isara an preview',
    },
    en: {
      reportBtn: 'Report a System Problem',
      back: 'Back',
      statusBadge: 'IN MEDIATION',
      smsSentLabel: 'SMS Reminder Sent',
      sendSmsLabel: 'Send SMS Reminder',
      hearingsLabel: 'Hearings',
      narrativeHeading: 'Narrative',
      complainantBadge: 'COMPLAINANT',
      respondentBadge: 'RESPONDENT',
      addressLabel: 'Address',
      mobileLabel: 'Mobile',
      reliefHeading: 'Requested Relief',
      incidentInfoHeading: 'Incident Information',
      titleField: 'Complaint title',
      natureField: 'Nature',
      dateFiledField: 'Date filed',
      locationField: 'Location',
      filedThroughField: 'Filed through',
      evidenceHeading: 'Evidence Attached',
      filesBadge: (count) => `${count} ${count === 1 ? 'FILE' : 'FILES'}`,
      previewNotice: (file) => `Opening document preview: ${file}`,
      closePreviewLabel: 'Close preview',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const displayCaseCode = `Case ${sanitizedCaseId} • ${
    passedCase?.nature || 'Property Boundary Dispute'
  } • Purok 4`;

  const incidentDetails = [
    {
      label: t.titleField,
      value: passedCase?.nature || 'Property Boundary Dispute',
    },
    { label: t.natureField, value: 'Civil' },
    { label: t.dateFiledField, value: 'November 1, 2025' },
    { label: t.locationField, value: 'Mabini St., Purok 4' },
    { label: t.filedThroughField, value: 'Online Portal' },
  ];

  const evidenceFiles = [
    'Subdivision_Plan_2014.pdf',
    'Boundary_Marker_Photo_1.jpg',
    'Boundary_Marker_Photo_2.jpg',
  ];

  const handleSendSms = () => {
    if (smsSent) return;
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={t.reportBtn}
    >
      <div className="case-view-container">
        {/* Top Back Link */}
        <div className="case-view-back-row">
          <Link to="/lupon-cases" className="case-view-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Case Header & Action Buttons */}
        <div className="case-view-header-row">
          <div className="case-view-title-block">
            <span className="case-view-status-pill">{t.statusBadge}</span>
            <h1 className="case-view-parties-title">
              <span>{complainantName}</span>{' '}
              <span className="case-view-vs">vs.</span>{' '}
              <span>{respondentName}</span>
            </h1>
            <p className="case-view-meta-line">{displayCaseCode}</p>
          </div>

          <div className="case-view-actions">
            <button
              type="button"
              className="case-view-sms-btn"
              disabled={smsSent}
              aria-live="polite"
              onClick={handleSendSms}
            >
              {smsSent ? (
                <>
                  <Check size={15} strokeWidth={2.2} />
                  <span>{t.smsSentLabel}</span>
                </>
              ) : (
                <>
                  <MessageSquareText size={15} strokeWidth={2} />
                  <span>{t.sendSmsLabel}</span>
                </>
              )}
            </button>

            <Link to="/lupon-hearings" className="case-view-hearings-btn">
              <Calendar size={15} strokeWidth={2} />
              <span>{t.hearingsLabel}</span>
            </Link>
          </div>
        </div>

        {/* Main Two-Column Body */}
        <div className="case-view-grid">
          {/* Left Column */}
          <div className="case-view-left">
            {/* Naratibo */}
            <section
              className="case-view-section"
              aria-labelledby="naratiboHeading"
            >
              <h2 id="naratiboHeading" className="case-view-section-label">
                {t.narrativeHeading}
              </h2>
              <div className="case-view-text-box">
                <p>
                  Nagtutubod si Mang Pedro na saiya pa an dulong na parte kan daga
                  sa may suba, mantang iginigiit na igwa na siyang titulo na
                  nakapangaran sa saiya poon pa kan dekada nubenta. Halos aroaldaw
                  sindang nagkakaigwa nin mainit na diskusyon sa pagitan kan kudal
                  na kawayan, lalo na kun tinatanuman ni Mang Berto nin kamote an
                  lugar na pig-aangkon kan kataid
                </p>
              </div>
            </section>

            {/* Complainant & Respondent Cards */}
            <div className="case-view-parties-grid">
              {/* Complainant */}
              <section
                className="party-detail-card"
                aria-label={t.complainantBadge}
              >
                <span className="party-role-pill is-complainant">
                  {t.complainantBadge}
                </span>
                <h3 className="party-full-name">{complainantName}</h3>

                <div className="party-info-rows">
                  <div className="party-info-row">
                    <span className="party-info-label">{t.addressLabel}</span>
                    <span className="party-info-value">
                      42 Mabini St., Purok 4
                    </span>
                  </div>
                  <div className="party-info-row">
                    <span className="party-info-label">{t.mobileLabel}</span>
                    <span className="party-info-value">0912 ••• 7821</span>
                  </div>
                </div>
              </section>

              {/* Respondent */}
              <section
                className="party-detail-card"
                aria-label={t.respondentBadge}
              >
                <span className="party-role-pill is-respondent">
                  {t.respondentBadge}
                </span>
                <h3 className="party-full-name">{respondentName}</h3>

                <div className="party-info-rows">
                  <div className="party-info-row">
                    <span className="party-info-label">{t.addressLabel}</span>
                    <span className="party-info-value">
                      44 Mabini St., Purok 4
                    </span>
                  </div>
                  <div className="party-info-row">
                    <span className="party-info-label">{t.mobileLabel}</span>
                    <span className="party-info-value">0918 ••• 2934</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Requested Relief / Hinihinging Ayos */}
            <section
              className="case-view-section"
              aria-labelledby="reliefHeading"
            >
              <h2 id="reliefHeading" className="case-view-section-label">
                {t.reliefHeading}
              </h2>
              <div className="case-view-text-box">
                <p>
                  Magdulot sa barangay hall tanganing pag-ulayan an isyu sa
                  atubangan kan kapitan asin makahanap nin matoninong na
                  kasunduan na daing nakukulgan.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="case-view-right">
            {/* Impormasyon ng Insidente */}
            <section
              className="case-side-card"
              aria-labelledby="incidentInfoHeading"
            >
              <h2 id="incidentInfoHeading" className="case-side-card-title">
                {t.incidentInfoHeading}
              </h2>

              <dl className="incident-dl">
                {incidentDetails.map((row) => (
                  <div key={row.label} className="incident-dl-row">
                    <dt className="incident-dt">{row.label}</dt>
                    <dd className="incident-dd">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Evidence Attached */}
            <section
              className="case-side-card"
              aria-labelledby="evidenceAttachedHeading"
            >
              <div className="evidence-card-header">
                <h2
                  id="evidenceAttachedHeading"
                  className="case-side-card-title"
                >
                  {t.evidenceHeading}
                </h2>
                <span className="evidence-count-pill">
                  {t.filesBadge(evidenceFiles.length)}
                </span>
              </div>

              <ul className="attached-files-list">
                {evidenceFiles.map((fileName) => (
                  <li key={fileName}>
                    <button
                      type="button"
                      className={`attached-file-link ${
                        previewFileName === fileName ? 'is-selected' : ''
                      }`}
                      onClick={() => setPreviewFileName(fileName)}
                    >
                      <FileText size={14} strokeWidth={2} />
                      <span>{fileName}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {previewFileName && (
                <div
                  className="evidence-preview-notice"
                  role="status"
                  aria-live="polite"
                >
                  <span>{t.previewNotice(previewFileName)}</span>
                  <button
                    type="button"
                    className="evidence-preview-close"
                    aria-label={t.closePreviewLabel}
                    onClick={() => setPreviewFileName('')}
                  >
                    <X size={13} strokeWidth={2.2} />
                  </button>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </LuponLayout>
  );
}

export default LuponCaseView;
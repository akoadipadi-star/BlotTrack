import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquareText,
  Calendar,
  FileText,
  Check,
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import './LuponCaseView.css';

function LuponCaseView({ language = 'bikol', onLanguageChange }) {
  const { caseId } = useParams();
  const location = useLocation();
  const passedCase = location.state?.caseItem;

  const [smsSent, setSmsSent] = useState(false);

  // Parse parties if passed from All Cases row, defaulting to exact Figma Case View data
  const [complainantName, respondentName] = useMemoParties(passedCase?.parties);

  const displayCaseCode = caseId
    ? `Case ${caseId} • ${passedCase?.nature || 'Property Boundary Dispute'} • Purok 4`
    : 'Case KP-2025-00842 • Property Boundary Dispute • Purok 4';

  const incidentDetails = [
    {
      label: 'Complaint title',
      value: passedCase?.nature || 'Property Boundary Dispute',
    },
    { label: 'Nature', value: 'Civil' },
    { label: 'Date filed', value: 'November 1, 2025' },
    { label: 'Location', value: 'Mabini St., Purok 4' },
    { label: 'Filed through', value: 'Online Portal' },
  ];

  const evidenceFiles = [
    'Subdivision_Plan_2014.pdf',
    'Boundary_Marker_Photo_1.jpg',
    'Boundary_Marker_Photo_2.jpg',
  ];

  const handleSendSms = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

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
      <div className="case-view-container">
        {/* Top Back Link */}
        <div className="case-view-back-row">
          <Link to="/lupon-cases" className="case-view-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>Magbalik</span>
          </Link>
        </div>

        {/* Case Header & Action Buttons */}
        <div className="case-view-header-row">
          <div className="case-view-title-block">
            <span className="case-view-status-pill">IN MEDIATION</span>
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
              onClick={handleSendSms}
            >
              {smsSent ? (
                <>
                  <Check size={15} strokeWidth={2.2} />
                  <span>SMS Reminder Sent</span>
                </>
              ) : (
                <>
                  <MessageSquareText size={15} strokeWidth={2} />
                  <span>Send SMS Reminder</span>
                </>
              )}
            </button>

            <Link to="/lupon-hearings" className="case-view-hearings-btn">
              <Calendar size={15} strokeWidth={2} />
              <span>Hearings</span>
            </Link>
          </div>
        </div>

        {/* Main Two-Column Body */}
        <div className="case-view-grid">
          {/* Left Column */}
          <div className="case-view-left">
            {/* Naratibo */}
            <section className="case-view-section" aria-labelledby="naratiboHeading">
              <h2 id="naratiboHeading" className="case-view-section-label">
                Naratibo
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
              <section className="party-detail-card" aria-label="Complainant">
                <span className="party-role-pill is-complainant">
                  COMPLAINANT
                </span>
                <h3 className="party-full-name">{complainantName}</h3>

                <div className="party-info-rows">
                  <div className="party-info-row">
                    <span className="party-info-label">Address</span>
                    <span className="party-info-value">
                      42 Mabini St., Purok 4
                    </span>
                  </div>
                  <div className="party-info-row">
                    <span className="party-info-label">Mobile</span>
                    <span className="party-info-value">0912 ••• 7821</span>
                  </div>
                </div>
              </section>

              {/* Respondent */}
              <section className="party-detail-card" aria-label="Respondent">
                <span className="party-role-pill is-respondent">
                  RESPONDENT
                </span>
                <h3 className="party-full-name">{respondentName}</h3>

                <div className="party-info-rows">
                  <div className="party-info-row">
                    <span className="party-info-label">Address</span>
                    <span className="party-info-value">
                      44 Mabini St., Purok 4
                    </span>
                  </div>
                  <div className="party-info-row">
                    <span className="party-info-label">Mobile</span>
                    <span className="party-info-value">0918 ••• 2934</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Requested Relief / Hinihinging Ayos */}
            <section className="case-view-section" aria-labelledby="reliefHeading">
              <h2 id="reliefHeading" className="case-view-section-label">
                Requested Relief / Hinihinging Ayos
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
                Impormasyon ng Insidente
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
                  Evidence Attached
                </h2>
                <span className="evidence-count-pill">3 FILES</span>
              </div>

              <ul className="attached-files-list">
                {evidenceFiles.map((fileName) => (
                  <li key={fileName}>
                    <button
                      type="button"
                      className="attached-file-link"
                      onClick={() => console.log('Preview file:', fileName)}
                    >
                      <FileText size={14} strokeWidth={2} />
                      <span>{fileName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </LuponLayout>
  );
}

function useMemoParties(partiesString) {
  if (!partiesString) return ['Juan Dela Cruz', 'Pedro Santos'];
  const parts = partiesString.split(/\s+vs\.?\s+/i);
  if (parts.length === 2) return [parts[0].trim(), parts[1].trim()];
  return [partiesString.trim(), 'Pedro Santos'];
}

export default LuponCaseView;
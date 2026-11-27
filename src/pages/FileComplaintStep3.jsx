import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import ComplaintStepper from '../components/ComplaintStepper';
import './FileComplaintStep3.css';

const CASE_TYPES = [
  'Utang',
  'Away-kapitbahay',
  'Hangganan nin daga',
  'Paninirang-puri',
  'Nawawarang gamit',
  'Shoplifting',
  'Aksidente o pagkaraot nin property',
  'Iba pa',
];

function FileComplaintStep3({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { reportType = 'kp', complainantInfo = {} } = location.state || {};

  const [incidentData, setIncidentData] = useState({
    caseType: 'Utang',
    incidentDate: '',
    location: '',
    narrative: '',
    desiredResolution: '',
  });

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Ano an nangyari?',
      stepSubheading: 'Istorya an insidente kan irereklamo',
      caseTypeLabel: 'Klase nin kaso',
      incidentDateLabel: 'Petsa kan insidente',
      incidentDatePlaceholder: 'MM / DD / YYYY',
      locationLabel: 'Sain nangyari?',
      locationPlaceholder: 'Street, landmark, o lugar',
      narrativeLabel: 'Istorya an nangyari',
      narrativePlaceholder: 'Istorya an importanteng detalye.',
      narrativeHelper: 'Dae magbutang nin password o financial information.',
      resolutionLabel: 'Ano an gustong mangyari / solusyon na gigibuhon?',
      resolutionPlaceholder: 'Ikaag an detalye.',
      continueBtn: 'I-save asin magpadagos',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'What happened?',
      stepSubheading: 'Describe the incident being reported',
      caseTypeLabel: 'Type of case',
      incidentDateLabel: 'Date of incident',
      incidentDatePlaceholder: 'MM / DD / YYYY',
      locationLabel: 'Where did it happen?',
      locationPlaceholder: 'Street, landmark, or place',
      narrativeLabel: 'Story of what happened',
      narrativePlaceholder: 'Describe the important details.',
      narrativeHelper: 'Do not include passwords or financial information.',
      resolutionLabel: 'What outcome / solution do you want?',
      resolutionPlaceholder: 'Enter the details.',
      continueBtn: 'Save and continue',
    },
  };

  const t = content[language] || content.bikol;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/file-complaint/step-4', {
      state: { reportType, complainantInfo, incidentData },
    });
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link to="/file-complaint/step-2" className="complaint-back-link">
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
        <ComplaintStepper currentStep={3} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit}>
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">3</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* Form Fields */}
          <div className="step3-fields">
            {/* Row 1: Klase nin kaso + Petsa kan insidente */}
            <div className="step3-top-grid">
              <div className="form-field">
                <label htmlFor="caseType" className="form-label">
                  {t.caseTypeLabel} <span className="required-star">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="caseType"
                    name="caseType"
                    className="form-select"
                    value={incidentData.caseType}
                    onChange={handleChange}
                  >
                    {CASE_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="select-chevron"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="incidentDate" className="form-label">
                  {t.incidentDateLabel} <span className="required-star">*</span>
                </label>
                <input
                  id="incidentDate"
                  name="incidentDate"
                  type="text"
                  className="form-input"
                  placeholder={t.incidentDatePlaceholder}
                  value={incidentData.incidentDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 2: Sain nangyari? */}
            <div className="form-field">
              <label htmlFor="location" className="form-label">
                {t.locationLabel} <span className="required-star">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-input"
                placeholder={t.locationPlaceholder}
                value={incidentData.location}
                onChange={handleChange}
              />
            </div>

            {/* Row 3: Istorya an nangyari */}
            <div className="form-field">
              <label htmlFor="narrative" className="form-label form-label--with-icon">
                <span>
                  {t.narrativeLabel} <span className="required-star">*</span>
                </span>
                <HelpCircle
                  size={14}
                  strokeWidth={2}
                  className="label-help-icon"
                  aria-hidden="true"
                />
              </label>
              <textarea
                id="narrative"
                name="narrative"
                className="form-textarea"
                placeholder={t.narrativePlaceholder}
                value={incidentData.narrative}
                onChange={handleChange}
              />
              <span className="form-helper">{t.narrativeHelper}</span>
            </div>

            {/* Row 4: Ano an gustong mangyari / solusyon na gigibuhon? */}
            <div className="form-field">
              <label
                htmlFor="desiredResolution"
                className="form-label form-label--with-icon"
              >
                <span>
                  {t.resolutionLabel} <span className="required-star">*</span>
                </span>
                <HelpCircle
                  size={14}
                  strokeWidth={2}
                  className="label-help-icon"
                  aria-hidden="true"
                />
              </label>
              <textarea
                id="desiredResolution"
                name="desiredResolution"
                className="form-textarea"
                placeholder={t.resolutionPlaceholder}
                value={incidentData.desiredResolution}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="complaint-divider step3-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link to="/file-complaint/step-2" className="btn-cancel">
              {t.back}
            </Link>

            <button type="submit" className="btn-continue">
              <span>{t.continueBtn}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FileComplaintStep3;
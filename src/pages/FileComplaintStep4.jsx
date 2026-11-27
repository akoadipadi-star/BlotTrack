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
import './FileComplaintStep4.css';

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

const PUROK_ZONES = [
  'Zone 1',
  'Zone 2',
  'Zone 3',
  'Zone 4',
  'Zone 5',
  'Zone 6',
  'Zone 7',
];

function FileComplaintStep4({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    reportType = 'kp',
    complainantInfo = {},
    incidentData = {},
  } = location.state || {};

  const [respondentData, setRespondentData] = useState({
    name: '',
    mobileNumber: '',
    barangay: 'Abella',
    purokZone: 'Zone 1',
    addAnotherPerson: false,
  });

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Sisay an involved sa insidente?',
      stepSubheading: 'Istorya an aram mo. Pwedeng i-blanko kun dae aram.',
      nameLabel: 'Pangaran',
      namePlaceholder: 'Pwedeng detalye kun dae bisto',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: 'Kun aram',
      barangayLabel: 'Barangay',
      purokLabel: 'Purok / Zone',
      addAnotherLabel: 'Magdagdag nin ibang tao',
      continueBtn: 'I-save asin magpadagos',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'Who is involved in the incident?',
      stepSubheading: 'Share what you know. You may leave fields blank if unknown.',
      nameLabel: 'Name',
      namePlaceholder: 'Description if unknown',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: 'If known',
      barangayLabel: 'Barangay',
      purokLabel: 'Purok / Zone',
      addAnotherLabel: 'Add another person',
      continueBtn: 'Save and continue',
    },
  };

  const t = content[language] || content.bikol;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRespondentData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/file-complaint/step-5', {
      state: { reportType, complainantInfo, incidentData, respondentData },
    });
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link to="/file-complaint/step-3" className="complaint-back-link">
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
        <ComplaintStepper currentStep={4} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit}>
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">4</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* 2x2 Form Inputs */}
          <div className="step2-form-grid">
            {/* Pangaran */}
            <div className="form-field">
              <label htmlFor="respondentName" className="form-label">
                {t.nameLabel}
              </label>
              <input
                id="respondentName"
                name="name"
                type="text"
                className="form-input"
                placeholder={t.namePlaceholder}
                value={respondentData.name}
                onChange={handleChange}
              />
            </div>

            {/* Mobile number */}
            <div className="form-field">
              <label htmlFor="respondentMobile" className="form-label">
                {t.mobileLabel}
              </label>
              <input
                id="respondentMobile"
                name="mobileNumber"
                type="tel"
                className="form-input"
                placeholder={t.mobilePlaceholder}
                value={respondentData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            {/* Barangay */}
            <div className="form-field">
              <label
                htmlFor="respondentBarangay"
                className="form-label form-label--with-icon"
              >
                <span>{t.barangayLabel}</span>
                <HelpCircle
                  size={14}
                  strokeWidth={2}
                  className="label-help-icon"
                  aria-hidden="true"
                />
              </label>
              <div className="select-wrapper">
                <select
                  id="respondentBarangay"
                  name="barangay"
                  className="form-select"
                  value={respondentData.barangay}
                  onChange={handleChange}
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
                  className="select-chevron"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Purok / Zone */}
            <div className="form-field">
              <label
                htmlFor="respondentPurok"
                className="form-label form-label--with-icon"
              >
                <span>{t.purokLabel}</span>
                <HelpCircle
                  size={14}
                  strokeWidth={2}
                  className="label-help-icon"
                  aria-hidden="true"
                />
              </label>
              <div className="select-wrapper">
                <select
                  id="respondentPurok"
                  name="purokZone"
                  className="form-select"
                  value={respondentData.purokZone}
                  onChange={handleChange}
                >
                  {PUROK_ZONES.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
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
          </div>

          {/* Add Another Person Checkbox */}
          <label className="step4-checkbox-row" htmlFor="addAnotherPerson">
            <input
              id="addAnotherPerson"
              name="addAnotherPerson"
              type="checkbox"
              className="step4-checkbox"
              checked={respondentData.addAnotherPerson}
              onChange={handleChange}
            />
            <span className="step4-checkbox-label">{t.addAnotherLabel}</span>
          </label>

          <hr className="complaint-divider step4-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link to="/file-complaint/step-3" className="btn-cancel">
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

export default FileComplaintStep4;
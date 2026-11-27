import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import ComplaintStepper from '../components/ComplaintStepper';
import './FileComplaintStep2.css';

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

function FileComplaintStep2({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reportType = location.state?.reportType || 'blotter';

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    barangay: 'Abella',
    purokZone: 'Zone 1',
  });

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Saimong Impormasyon',
      stepSubheading: 'Ikaag an kompletong detalye kan saimong impormasyon',
      fullNameLabel: 'Kompletong pangaran',
      fullNamePlaceholder: 'e.g. Juan Dela Cruz',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: '09XX XXX XXXX',
      mobileHelper: 'Para sana sa updates kan report.',
      barangayLabel: 'Barangay',
      purokLabel: 'Purok / Zone',
      continueBtn: 'I-save asin magpadagos',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'Your Information',
      stepSubheading: 'Enter the complete details of your information',
      fullNameLabel: 'Full name',
      fullNamePlaceholder: 'e.g. Juan Dela Cruz',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: '09XX XXX XXXX',
      mobileHelper: 'For report updates only.',
      barangayLabel: 'Barangay',
      purokLabel: 'Purok / Zone',
      continueBtn: 'Save and continue',
    },
  };

  const t = content[language] || content.bikol;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/file-complaint/step-3', {
      state: { reportType, complainantInfo: formData },
    });
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link to="/file-complaint" className="complaint-back-link">
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
        <ComplaintStepper currentStep={2} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit}>
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">2</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* 2x2 Form Inputs */}
          <div className="step2-form-grid">
            {/* Kompletong pangaran */}
            <div className="form-field">
              <label htmlFor="fullName" className="form-label">
                {t.fullNameLabel} <span className="required-star">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input"
                placeholder={t.fullNamePlaceholder}
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Mobile number */}
            <div className="form-field">
              <label htmlFor="mobileNumber" className="form-label">
                {t.mobileLabel} <span className="required-star">*</span>
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                className="form-input"
                placeholder={t.mobilePlaceholder}
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <span className="form-helper">{t.mobileHelper}</span>
            </div>

            {/* Barangay */}
            <div className="form-field">
              <label htmlFor="barangay" className="form-label">
                {t.barangayLabel} <span className="required-star">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="barangay"
                  name="barangay"
                  className="form-select"
                  value={formData.barangay}
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
              <label htmlFor="purokZone" className="form-label">
                {t.purokLabel} <span className="required-star">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="purokZone"
                  name="purokZone"
                  className="form-select"
                  value={formData.purokZone}
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

          <hr className="complaint-divider step2-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link to="/file-complaint" className="btn-cancel">
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

export default FileComplaintStep2;
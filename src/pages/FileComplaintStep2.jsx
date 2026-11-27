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

function isValidPhMobile(rawValue) {
  const compact = rawValue.replace(/[\s\-()]/g, '');
  return /^(09\d{9}|\+639\d{9})$/.test(compact);
}

function FileComplaintStep2({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reportType = location.state?.reportType || 'blotter';
  const savedComplainant = location.state?.complainantInfo;

  const [formData, setFormData] = useState({
    fullName: savedComplainant?.fullName || '',
    mobileNumber: savedComplainant?.mobileNumber || '',
    barangay: NAGA_BARANGAYS.includes(savedComplainant?.barangay)
      ? savedComplainant.barangay
      : 'Abella',
    purokZone: PUROK_ZONES.includes(savedComplainant?.purokZone)
      ? savedComplainant.purokZone
      : 'Zone 1',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      fullNameRequired: 'Kinakaipuhan an kompletong pangaran.',
      fullNameMin: 'Dai mababa sa 2 karakter an pangaran.',
      fullNameMax: 'Dai malampas sa 100 karakter an pangaran.',
      fullNameInvalid:
        'Mga letra, espasyo, tuldok (.), gitling (-), asin kudlit (\') sana an pwede.',
      mobileRequired: 'Kinakaipuhan an mobile number.',
      mobileInvalid:
        'Maglagay nin tamang PH mobile number (e.g. 0917 123 4567 o +639171234567).',
      barangayInvalid: 'Pumili nin tamang Barangay sa lista.',
      purokInvalid: 'Pumili nin tamang Purok / Zone sa lista.',
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
      fullNameRequired: 'Full name is required.',
      fullNameMin: 'Full name must be at least 2 characters.',
      fullNameMax: 'Full name must not exceed 100 characters.',
      fullNameInvalid:
        'Only letters, spaces, periods (.), hyphens (-), and apostrophes (\') are allowed.',
      mobileRequired: 'Mobile number is required.',
      mobileInvalid:
        'Enter a valid Philippine mobile number (e.g. 0917 123 4567 or +639171234567).',
      barangayInvalid: 'Please select a valid Barangay from the list.',
      purokInvalid: 'Please select a valid Purok / Zone from the list.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = formData.fullName.trim();

    if (!trimmedName) {
      nextErrors.fullName = t.fullNameRequired;
    } else if (trimmedName.length < 2) {
      nextErrors.fullName = t.fullNameMin;
    } else if (trimmedName.length > 100) {
      nextErrors.fullName = t.fullNameMax;
    } else if (!/^[a-zA-ZÀ-ÿñÑ\s.'-]+$/.test(trimmedName)) {
      nextErrors.fullName = t.fullNameInvalid;
    }

    const trimmedMobile = formData.mobileNumber.trim();
    if (!trimmedMobile) {
      nextErrors.mobileNumber = t.mobileRequired;
    } else if (!isValidPhMobile(trimmedMobile)) {
      nextErrors.mobileNumber = t.mobileInvalid;
    }

    if (!NAGA_BARANGAYS.includes(formData.barangay)) {
      nextErrors.barangay = t.barangayInvalid;
    }

    if (!PUROK_ZONES.includes(formData.purokZone)) {
      nextErrors.purokZone = t.purokInvalid;
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const sanitizedComplainant = {
      ...formData,
      fullName: formData.fullName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
    };

    navigate('/file-complaint/step-3', {
      state: {
        ...(location.state || {}),
        reportType,
        complainantInfo: sanitizedComplainant,
      },
    });
  };

  const backState = {
    ...(location.state || {}),
    reportType,
    complainantInfo: formData,
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link
            to="/file-complaint"
            state={backState}
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
        <ComplaintStepper currentStep={2} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit} noValidate>
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
                maxLength={100}
                className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder={t.fullNamePlaceholder}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? 'step2FullNameError' : undefined
                }
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p
                  id="step2FullNameError"
                  className="step2-error-text"
                  role="alert"
                >
                  {errors.fullName}
                </p>
              )}
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
                maxLength={20}
                className={`form-input ${
                  errors.mobileNumber ? 'is-invalid' : ''
                }`}
                placeholder={t.mobilePlaceholder}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={
                  errors.mobileNumber
                    ? 'step2MobileError'
                    : 'step2MobileHelper'
                }
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber ? (
                <p
                  id="step2MobileError"
                  className="step2-error-text"
                  role="alert"
                >
                  {errors.mobileNumber}
                </p>
              ) : (
                <span id="step2MobileHelper" className="form-helper">
                  {t.mobileHelper}
                </span>
              )}
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
                  className={`form-select ${
                    errors.barangay ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.barangay)}
                  aria-describedby={
                    errors.barangay ? 'step2BarangayError' : undefined
                  }
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
              {errors.barangay && (
                <p
                  id="step2BarangayError"
                  className="step2-error-text"
                  role="alert"
                >
                  {errors.barangay}
                </p>
              )}
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
                  className={`form-select ${
                    errors.purokZone ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.purokZone)}
                  aria-describedby={
                    errors.purokZone ? 'step2PurokError' : undefined
                  }
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
              {errors.purokZone && (
                <p
                  id="step2PurokError"
                  className="step2-error-text"
                  role="alert"
                >
                  {errors.purokZone}
                </p>
              )}
            </div>
          </div>

          <hr className="complaint-divider step2-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link
              to="/file-complaint"
              state={backState}
              className="btn-cancel"
            >
              {t.back}
            </Link>

            <button
              type="submit"
              className="btn-continue"
              disabled={isSubmitting}
            >
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
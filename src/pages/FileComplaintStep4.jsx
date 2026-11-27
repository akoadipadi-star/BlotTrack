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

function isValidPhMobile(rawValue) {
  const compact = rawValue.replace(/[\s\-()]/g, '');
  return /^(09\d{9}|\+639\d{9})$/.test(compact);
}

function FileComplaintStep4({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    reportType = 'kp',
    complainantInfo = {},
    incidentData = {},
    respondentData: savedRespondent,
  } = location.state || {};

  const [respondentData, setRespondentData] = useState({
    name: savedRespondent?.name || '',
    mobileNumber: savedRespondent?.mobileNumber || '',
    barangay: NAGA_BARANGAYS.includes(savedRespondent?.barangay)
      ? savedRespondent.barangay
      : 'Abella',
    purokZone: PUROK_ZONES.includes(savedRespondent?.purokZone)
      ? savedRespondent.purokZone
      : 'Zone 1',
    addAnotherPerson: Boolean(savedRespondent?.addAnotherPerson),
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      nameMin: 'Dai mababa sa 2 karakter an pangaran o deskripsyon.',
      nameMax: 'Dai malampas sa 120 karakter an pangaran o deskripsyon.',
      nameSameAsComplainant:
        'An respondent dai pwedeng kapareho kan pangaran kan nagreklamo.',
      mobileInvalid:
        'Maglagay nin tamang PH mobile number (e.g. 0917 123 4567 o +639171234567), o i-blanko kun dai aram.',
      barangayInvalid: 'Pumili nin tamang Barangay sa lista.',
      purokInvalid: 'Pumili nin tamang Purok / Zone sa lista.',
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
      nameMin: 'Name or description must be at least 2 characters.',
      nameMax: 'Name or description must not exceed 120 characters.',
      nameSameAsComplainant:
        'Respondent name cannot be the same as the complainant.',
      mobileInvalid:
        'Enter a valid Philippine mobile number (e.g. 0917 123 4567 or +639171234567), or leave blank if unknown.',
      barangayInvalid: 'Please select a valid Barangay from the list.',
      purokInvalid: 'Please select a valid Purok / Zone from the list.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRespondentData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = respondentData.name.trim();
    const complainantName = (complainantInfo.fullName || '').trim().toLowerCase();

    if (trimmedName) {
      if (trimmedName.length < 2) {
        nextErrors.name = t.nameMin;
      } else if (trimmedName.length > 120) {
        nextErrors.name = t.nameMax;
      } else if (
        complainantName &&
        trimmedName.toLowerCase() === complainantName
      ) {
        nextErrors.name = t.nameSameAsComplainant;
      }
    }

    const trimmedMobile = respondentData.mobileNumber.trim();
    if (trimmedMobile && !isValidPhMobile(trimmedMobile)) {
      nextErrors.mobileNumber = t.mobileInvalid;
    }

    if (!NAGA_BARANGAYS.includes(respondentData.barangay)) {
      nextErrors.barangay = t.barangayInvalid;
    }

    if (!PUROK_ZONES.includes(respondentData.purokZone)) {
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

    const sanitizedRespondent = {
      ...respondentData,
      name: respondentData.name.trim(),
      mobileNumber: respondentData.mobileNumber.trim(),
    };

    navigate('/file-complaint/step-5', {
      state: {
        ...(location.state || {}),
        reportType,
        complainantInfo,
        incidentData,
        respondentData: sanitizedRespondent,
      },
    });
  };

  const backState = {
    ...(location.state || {}),
    reportType,
    complainantInfo,
    incidentData,
    respondentData,
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link
            to="/file-complaint/step-3"
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
        <ComplaintStepper currentStep={4} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit} noValidate>
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
                maxLength={120}
                className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                placeholder={t.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'step4NameError' : undefined
                }
                value={respondentData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p
                  id="step4NameError"
                  className="step4-error-text"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
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
                maxLength={20}
                className={`form-input ${
                  errors.mobileNumber ? 'is-invalid' : ''
                }`}
                placeholder={t.mobilePlaceholder}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={
                  errors.mobileNumber ? 'step4MobileError' : undefined
                }
                value={respondentData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <p
                  id="step4MobileError"
                  className="step4-error-text"
                  role="alert"
                >
                  {errors.mobileNumber}
                </p>
              )}
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
                  className={`form-select ${
                    errors.barangay ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.barangay)}
                  aria-describedby={
                    errors.barangay ? 'step4BarangayError' : undefined
                  }
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
              {errors.barangay && (
                <p
                  id="step4BarangayError"
                  className="step4-error-text"
                  role="alert"
                >
                  {errors.barangay}
                </p>
              )}
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
                  className={`form-select ${
                    errors.purokZone ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.purokZone)}
                  aria-describedby={
                    errors.purokZone ? 'step4PurokError' : undefined
                  }
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
              {errors.purokZone && (
                <p
                  id="step4PurokError"
                  className="step4-error-text"
                  role="alert"
                >
                  {errors.purokZone}
                </p>
              )}
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
            <Link
              to="/file-complaint/step-3"
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

export default FileComplaintStep4;
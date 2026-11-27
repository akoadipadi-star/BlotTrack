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

const REFERENCE_TODAY_ISO = '2026-11-27';

const MONTH_INDEX_MAP = {
  january: 0,
  enero: 0,
  february: 1,
  pebrero: 1,
  march: 2,
  marso: 2,
  april: 3,
  abril: 3,
  may: 4,
  mayo: 4,
  june: 5,
  hunyo: 5,
  july: 6,
  hulyo: 6,
  august: 7,
  agosto: 7,
  september: 8,
  setyembre: 8,
  october: 9,
  oktubre: 9,
  november: 10,
  nobyembre: 10,
  december: 11,
  disyembre: 11,
};

function parseIncidentDateToISO(rawDate) {
  const trimmed = rawDate.trim();
  if (!trimmed) return null;

  // Match MM/DD/YYYY or MM / DD / YYYY
  const slashMatch = /^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/.exec(trimmed);
  if (slashMatch) {
    const m = Number(slashMatch[1]) - 1;
    const d = Number(slashMatch[2]);
    const y = Number(slashMatch[3]);
    const dt = new Date(Date.UTC(y, m, d));
    if (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m &&
      dt.getUTCDate() === d
    ) {
      return `${String(y).padStart(4, '0')}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
    return null;
  }

  // Match YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const y = Number(isoMatch[1]);
    const m = Number(isoMatch[2]) - 1;
    const d = Number(isoMatch[3]);
    const dt = new Date(Date.UTC(y, m, d));
    if (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m &&
      dt.getUTCDate() === d
    ) {
      return trimmed;
    }
    return null;
  }

  // Match "Month DD, YYYY"
  const wordMatch = /^([a-zA-ZñÑ]+)\s+(\d{1,2}),?\s+(\d{4})$/.exec(trimmed);
  if (wordMatch) {
    const monthIdx = MONTH_INDEX_MAP[wordMatch[1].toLowerCase()];
    const d = Number(wordMatch[2]);
    const y = Number(wordMatch[3]);
    if (monthIdx !== undefined) {
      const dt = new Date(Date.UTC(y, monthIdx, d));
      if (
        dt.getUTCFullYear() === y &&
        dt.getUTCMonth() === monthIdx &&
        dt.getUTCDate() === d
      ) {
        return `${String(y).padStart(4, '0')}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
    }
  }

  return null;
}

function FileComplaintStep3({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    reportType = 'kp',
    complainantInfo = {},
    incidentData: savedIncident,
  } = location.state || {};

  const [incidentData, setIncidentData] = useState({
    caseType: CASE_TYPES.includes(savedIncident?.caseType)
      ? savedIncident.caseType
      : 'Utang',
    incidentDate: savedIncident?.incidentDate || '',
    location: savedIncident?.location || '',
    narrative: savedIncident?.narrative || '',
    desiredResolution: savedIncident?.desiredResolution || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      caseTypeInvalid: 'Pumili nin tamang klase nin kaso.',
      dateRequired: 'Kinakaipuhan an petsa kan insidente.',
      dateInvalid: 'Maglagay nin tamang petsa (MM/DD/YYYY).',
      dateFuture: 'An petsa kan insidente dai pwedeng nasa maabot na panahon.',
      dateTooOld: 'Maglagay nin balidong petsa kan insidente (puon 2000).',
      locationRequired: 'Kinakaipuhan an lugar kun sain nangyari an insidente.',
      locationMin: 'Dai mababa sa 3 karakter an lugar.',
      locationMax: 'Dai malampas sa 150 karakter an lugar.',
      narrativeRequired: 'Kinakaipuhan an istorya kan nangyari.',
      narrativeMin: 'Dai mababa sa 15 karakter an detalye kan nangyari.',
      narrativeMax: 'Dai malampas sa 2000 karakter an istorya.',
      resolutionRequired: 'Kinakaipuhan an gustong mangyari o solusyon.',
      resolutionMin: 'Dai mababa sa 5 karakter an gustong solusyon.',
      resolutionMax: 'Dai malampas sa 1000 karakter an gustong solusyon.',
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
      caseTypeInvalid: 'Please select a valid case type.',
      dateRequired: 'Date of incident is required.',
      dateInvalid: 'Enter a valid date (MM/DD/YYYY).',
      dateFuture: 'Date of incident cannot be in the future.',
      dateTooOld: 'Please enter a valid incident year (2000 or later).',
      locationRequired: 'Location of the incident is required.',
      locationMin: 'Location must be at least 3 characters.',
      locationMax: 'Location must not exceed 150 characters.',
      narrativeRequired: 'Story of what happened is required.',
      narrativeMin: 'Please provide at least 15 characters describing what happened.',
      narrativeMax: 'Story must not exceed 2000 characters.',
      resolutionRequired: 'Desired outcome / solution is required.',
      resolutionMin: 'Desired solution must be at least 5 characters.',
      resolutionMax: 'Desired solution must not exceed 1000 characters.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!CASE_TYPES.includes(incidentData.caseType)) {
      nextErrors.caseType = t.caseTypeInvalid;
    }

    const trimmedDate = incidentData.incidentDate.trim();
    if (!trimmedDate) {
      nextErrors.incidentDate = t.dateRequired;
    } else {
      const parsedISO = parseIncidentDateToISO(trimmedDate);
      if (!parsedISO) {
        nextErrors.incidentDate = t.dateInvalid;
      } else if (parsedISO > REFERENCE_TODAY_ISO) {
        nextErrors.incidentDate = t.dateFuture;
      } else if (parsedISO < '2000-01-01') {
        nextErrors.incidentDate = t.dateTooOld;
      }
    }

    const trimmedLocation = incidentData.location.trim();
    if (!trimmedLocation) {
      nextErrors.location = t.locationRequired;
    } else if (trimmedLocation.length < 3) {
      nextErrors.location = t.locationMin;
    } else if (trimmedLocation.length > 150) {
      nextErrors.location = t.locationMax;
    }

    const trimmedNarrative = incidentData.narrative.trim();
    if (!trimmedNarrative) {
      nextErrors.narrative = t.narrativeRequired;
    } else if (trimmedNarrative.length < 15) {
      nextErrors.narrative = t.narrativeMin;
    } else if (trimmedNarrative.length > 2000) {
      nextErrors.narrative = t.narrativeMax;
    }

    const trimmedResolution = incidentData.desiredResolution.trim();
    if (!trimmedResolution) {
      nextErrors.desiredResolution = t.resolutionRequired;
    } else if (trimmedResolution.length < 5) {
      nextErrors.desiredResolution = t.resolutionMin;
    } else if (trimmedResolution.length > 1000) {
      nextErrors.desiredResolution = t.resolutionMax;
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

    const sanitizedIncident = {
      ...incidentData,
      incidentDate: incidentData.incidentDate.trim(),
      location: incidentData.location.trim(),
      narrative: incidentData.narrative.trim(),
      desiredResolution: incidentData.desiredResolution.trim(),
    };

    navigate('/file-complaint/step-4', {
      state: {
        ...(location.state || {}),
        reportType,
        complainantInfo,
        incidentData: sanitizedIncident,
      },
    });
  };

  const backState = {
    ...(location.state || {}),
    reportType,
    complainantInfo,
    incidentData,
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link
            to="/file-complaint/step-2"
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
        <ComplaintStepper currentStep={3} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit} noValidate>
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
                    className={`form-select ${
                      errors.caseType ? 'is-invalid' : ''
                    }`}
                    aria-invalid={Boolean(errors.caseType)}
                    aria-describedby={
                      errors.caseType ? 'step3CaseTypeError' : undefined
                    }
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
                {errors.caseType && (
                  <p
                    id="step3CaseTypeError"
                    className="step3-error-text"
                    role="alert"
                  >
                    {errors.caseType}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="incidentDate" className="form-label">
                  {t.incidentDateLabel} <span className="required-star">*</span>
                </label>
                <input
                  id="incidentDate"
                  name="incidentDate"
                  type="text"
                  maxLength={25}
                  className={`form-input ${
                    errors.incidentDate ? 'is-invalid' : ''
                  }`}
                  placeholder={t.incidentDatePlaceholder}
                  aria-invalid={Boolean(errors.incidentDate)}
                  aria-describedby={
                    errors.incidentDate ? 'step3DateError' : undefined
                  }
                  value={incidentData.incidentDate}
                  onChange={handleChange}
                />
                {errors.incidentDate && (
                  <p
                    id="step3DateError"
                    className="step3-error-text"
                    role="alert"
                  >
                    {errors.incidentDate}
                  </p>
                )}
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
                maxLength={150}
                className={`form-input ${errors.location ? 'is-invalid' : ''}`}
                placeholder={t.locationPlaceholder}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={
                  errors.location ? 'step3LocationError' : undefined
                }
                value={incidentData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p
                  id="step3LocationError"
                  className="step3-error-text"
                  role="alert"
                >
                  {errors.location}
                </p>
              )}
            </div>

            {/* Row 3: Istorya an nangyari */}
            <div className="form-field">
              <label
                htmlFor="narrative"
                className="form-label form-label--with-icon"
              >
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
                maxLength={2000}
                className={`form-textarea ${
                  errors.narrative ? 'is-invalid' : ''
                }`}
                placeholder={t.narrativePlaceholder}
                aria-invalid={Boolean(errors.narrative)}
                aria-describedby={
                  errors.narrative
                    ? 'step3NarrativeError'
                    : 'step3NarrativeHelper'
                }
                value={incidentData.narrative}
                onChange={handleChange}
              />
              {errors.narrative ? (
                <p
                  id="step3NarrativeError"
                  className="step3-error-text"
                  role="alert"
                >
                  {errors.narrative}
                </p>
              ) : (
                <span id="step3NarrativeHelper" className="form-helper">
                  {t.narrativeHelper}
                </span>
              )}
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
                maxLength={1000}
                className={`form-textarea ${
                  errors.desiredResolution ? 'is-invalid' : ''
                }`}
                placeholder={t.resolutionPlaceholder}
                aria-invalid={Boolean(errors.desiredResolution)}
                aria-describedby={
                  errors.desiredResolution ? 'step3ResolutionError' : undefined
                }
                value={incidentData.desiredResolution}
                onChange={handleChange}
              />
              {errors.desiredResolution && (
                <p
                  id="step3ResolutionError"
                  className="step3-error-text"
                  role="alert"
                >
                  {errors.desiredResolution}
                </p>
              )}
            </div>
          </div>

          <hr className="complaint-divider step3-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link
              to="/file-complaint/step-2"
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

export default FileComplaintStep3;
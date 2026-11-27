import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import './TrackCase.css';

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

const CASE_NUMBER_PATTERN = /^\d{4}-\d{3}-\d{3}$/;

function TrackCase({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialBarangay = NAGA_BARANGAYS.includes(location.state?.barangay)
    ? location.state.barangay
    : 'Abella';

  const [barangay, setBarangay] = useState(initialBarangay);
  const [caseNumber, setCaseNumber] = useState(
    location.state?.caseNumber || ''
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-track nin Report o Kaso',
      pageSubtitle: 'Siguraduhon na an saimong kaso sana an i-track.',
      cardTitle: 'Hanapon an saimong report',
      cardSubtitle: 'Ilaag an case number kan saimong kaso.',
      barangayLabel: 'Barangay',
      caseNumberLabel: 'Case number',
      caseNumberPlaceholder: 'e.g. 2026-011-001',
      submitBtn: 'Isumite',
      submittingBtn: 'Hinahanap...',
      barangayInvalid: 'Pumili nin tamang Barangay sa lista.',
      caseNumberRequired: 'Kinakaipuhan an Case number (e.g. 2026-011-001).',
      caseNumberInvalid:
        'Maglagay nin tamang format kan Case number (e.g. 2026-011-001).',
    },
    en: {
      back: 'Back',
      pageTitle: 'Track a Report or Case',
      pageSubtitle: 'Make sure you only track your own case.',
      cardTitle: 'Find your report',
      cardSubtitle: 'Enter the case number of your case.',
      barangayLabel: 'Barangay',
      caseNumberLabel: 'Case number',
      caseNumberPlaceholder: 'e.g. 2026-011-001',
      submitBtn: 'Submit',
      submittingBtn: 'Searching...',
      barangayInvalid: 'Please select a valid Barangay from the list.',
      caseNumberRequired: 'Case number is required (e.g. 2026-011-001).',
      caseNumberInvalid:
        'Enter a valid Case number format (e.g. 2026-011-001).',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const validateForm = () => {
    const nextErrors = {};

    if (!NAGA_BARANGAYS.includes(barangay)) {
      nextErrors.barangay = t.barangayInvalid;
    }

    const trimmedCase = caseNumber.trim();
    if (!trimmedCase) {
      nextErrors.caseNumber = t.caseNumberRequired;
    } else if (!CASE_NUMBER_PATTERN.test(trimmedCase)) {
      nextErrors.caseNumber = t.caseNumberInvalid;
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

    navigate('/track-case/status', {
      state: {
        barangay,
        caseNumber: caseNumber.trim(),
      },
    });
  };

  return (
    <main className="track-page">
      <div className="track-outer-container">
        {/* Top Back Link */}
        <div className="track-back-row">
          <Link to="/" className="track-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Centered Page Header */}
        <header className="track-header">
          <h1 className="track-page-title">{t.pageTitle}</h1>
          <p className="track-page-subtitle">{t.pageSubtitle}</p>
        </header>

        {/* Centered Lookup Card */}
        <form className="track-card" onSubmit={handleSubmit} noValidate>
          <div className="track-icon-circle" aria-hidden="true">
            <Search size={22} strokeWidth={2.1} />
          </div>

          <h2 className="track-card-title">{t.cardTitle}</h2>
          <p className="track-card-subtitle">{t.cardSubtitle}</p>

          <div className="track-fields">
            {/* Barangay Dropdown */}
            <div className="track-field">
              <label htmlFor="trackBarangay" className="track-label">
                {t.barangayLabel} <span className="track-required">*</span>
              </label>
              <div className="track-select-wrapper">
                <select
                  id="trackBarangay"
                  className={`track-select ${
                    errors.barangay ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.barangay)}
                  aria-describedby={
                    errors.barangay ? 'trackBarangayError' : undefined
                  }
                  value={barangay}
                  onChange={(e) => {
                    setBarangay(e.target.value);
                    if (errors.barangay) {
                      setErrors((prev) => ({ ...prev, barangay: undefined }));
                    }
                  }}
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
                  className="track-select-chevron"
                  aria-hidden="true"
                />
              </div>
              {errors.barangay && (
                <p
                  id="trackBarangayError"
                  className="track-error-text"
                  role="alert"
                >
                  {errors.barangay}
                </p>
              )}
            </div>

            {/* Case Number Input */}
            <div className="track-field">
              <label htmlFor="trackCaseNumber" className="track-label">
                {t.caseNumberLabel} <span className="track-required">*</span>
              </label>
              <input
                id="trackCaseNumber"
                type="text"
                maxLength={20}
                className={`track-input ${
                  errors.caseNumber ? 'is-invalid' : ''
                }`}
                placeholder={t.caseNumberPlaceholder}
                aria-invalid={Boolean(errors.caseNumber)}
                aria-describedby={
                  errors.caseNumber ? 'trackCaseNumberError' : undefined
                }
                value={caseNumber}
                onChange={(e) => {
                  setCaseNumber(e.target.value);
                  if (errors.caseNumber) {
                    setErrors((prev) => ({ ...prev, caseNumber: undefined }));
                  }
                }}
              />
              {errors.caseNumber && (
                <p
                  id="trackCaseNumberError"
                  className="track-error-text"
                  role="alert"
                >
                  {errors.caseNumber}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="track-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </button>
        </form>
      </div>
    </main>
  );
}

export default TrackCase;
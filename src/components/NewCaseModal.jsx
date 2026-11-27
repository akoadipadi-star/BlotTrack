import { useEffect, useState } from 'react';
import {
  FileText,
  X,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Plus,
} from 'lucide-react';
import './NewCaseModal.css';

const COMPLAINT_TITLES = [
  'Collection Sum of Money',
  'Property Boundary Dispute',
  'Unjust Vexation',
  'Noise / Nuisance',
  'Slight Physical Injuries',
  'Breach of Contract',
  'Malicious Mischief',
];

const ALLOWED_NATURES = ['Civil', 'Criminal'];

const VALIDATION_TEXT = {
  bikol: {
    caseTitleRequired:
      'Kinakaipuhan an Case Title (e.g. Juan Dela Cruz vs. Pedro Santos).',
    caseTitleMin: 'Dai mababa sa 5 karakter an Case Title.',
    caseTitleMax: 'Dai malampas sa 150 karakter an Case Title.',
    caseTitleFormat: 'Gamiton an format na "Complainant vs. Respondent".',
    complaintTitleInvalid: 'Pumili nin tamang Complaint Title.',
    natureInvalid: 'Pumili kun Civil o Criminal an kaso.',
    submitting: 'Isinusumite...',
    submit: 'Isumite',
    cancel: 'Kanselahon',
  },
  en: {
    caseTitleRequired:
      'Case Title is required (e.g. Juan Dela Cruz vs. Pedro Santos).',
    caseTitleMin: 'Case Title must be at least 5 characters.',
    caseTitleMax: 'Case Title must not exceed 150 characters.',
    caseTitleFormat: 'Please use the format "Complainant vs. Respondent".',
    complaintTitleInvalid: 'Please select a valid Complaint Title.',
    natureInvalid: 'Please select either Civil or Criminal.',
    submitting: 'Submitting...',
    submit: 'Submit',
    cancel: 'Cancel',
  },
};

function NewCaseModal({
  isOpen,
  onClose,
  onSubmitCase,
  caseNumber = '2026-011-002',
  dateFiled = 'November 10, 2026',
  language = 'bikol',
}) {
  const [caseTitle, setCaseTitle] = useState('');
  const [complaintTitle, setComplaintTitle] = useState(
    'Collection Sum of Money'
  );
  const [nature, setNature] = useState('Civil');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const msg = VALIDATION_TEXT[language === 'en' ? 'en' : 'bikol'];

  useEffect(() => {
    if (!isOpen) return;
    setErrors({});
    setIsSubmitting(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const validateForm = () => {
    const nextErrors = {};
    const trimmedTitle = caseTitle.trim();

    if (!trimmedTitle) {
      nextErrors.caseTitle = msg.caseTitleRequired;
    } else if (trimmedTitle.length < 5) {
      nextErrors.caseTitle = msg.caseTitleMin;
    } else if (trimmedTitle.length > 150) {
      nextErrors.caseTitle = msg.caseTitleMax;
    } else if (!/^.+\s+vs\.?\s+.+$/i.test(trimmedTitle)) {
      nextErrors.caseTitle = msg.caseTitleFormat;
    }

    if (!COMPLAINT_TITLES.includes(complaintTitle)) {
      nextErrors.complaintTitle = msg.complaintTitleInvalid;
    }

    if (!ALLOWED_NATURES.includes(nature)) {
      nextErrors.nature = msg.natureInvalid;
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

    const newRecord = {
      id: caseNumber,
      parties: caseTitle.trim(),
      nature: complaintTitle,
      caseNatureCategory: nature,
      dateFiled,
    };

    if (onSubmitCase) {
      onSubmitCase(newRecord);
    }

    setCaseTitle('');
    setComplaintTitle('Collection Sum of Money');
    setNature('Civil');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="new-case-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newCaseModalTitle"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
    >
      <div
        className="new-case-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="new-case-header">
          <div className="new-case-header-left">
            <div className="new-case-icon-box" aria-hidden="true">
              <FileText size={19} strokeWidth={2} />
            </div>
            <div>
              <h2 id="newCaseModalTitle" className="new-case-title">
                Magdagdag nin Bagong Case Record
              </h2>
              <p className="new-case-subtitle">
                Ilagaag an initial case details para magibo an record.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="new-case-close-btn"
            aria-label="Close modal"
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="new-case-body">
            {/* Row 1: Read-Only Case Number & Date Filed */}
            <div className="new-case-two-col">
              <div className="new-case-field">
                <label className="new-case-label">Case Number</label>
                <div className="new-case-readonly-box">
                  <ShieldCheck
                    size={15}
                    strokeWidth={2}
                    className="new-case-readonly-icon"
                    aria-hidden="true"
                  />
                  <span>{caseNumber}</span>
                </div>
              </div>

              <div className="new-case-field">
                <label className="new-case-label">Date Filed</label>
                <div className="new-case-readonly-box">
                  <Calendar
                    size={15}
                    strokeWidth={2}
                    className="new-case-readonly-icon"
                    aria-hidden="true"
                  />
                  <span>{dateFiled}</span>
                </div>
              </div>
            </div>

            {/* Row 2: Case Title * */}
            <div className="new-case-field">
              <label htmlFor="modalCaseTitle" className="new-case-label">
                Case Title <span className="new-case-required">*</span>
              </label>
              <input
                id="modalCaseTitle"
                type="text"
                maxLength={150}
                className={`new-case-input ${
                  errors.caseTitle ? 'is-invalid' : ''
                }`}
                placeholder="e.g. Juan Dela Cruz vs. Pedro Santos"
                aria-invalid={Boolean(errors.caseTitle)}
                aria-describedby={
                  errors.caseTitle ? 'modalCaseTitleError' : undefined
                }
                value={caseTitle}
                onChange={(e) => {
                  setCaseTitle(e.target.value);
                  if (errors.caseTitle) {
                    setErrors((prev) => ({ ...prev, caseTitle: undefined }));
                  }
                }}
              />
              {errors.caseTitle && (
                <p
                  id="modalCaseTitleError"
                  className="new-case-error-text"
                  role="alert"
                >
                  {errors.caseTitle}
                </p>
              )}
            </div>

            {/* Row 3: Complaint Title * */}
            <div className="new-case-field">
              <label htmlFor="modalComplaintTitle" className="new-case-label">
                Complaint Title <span className="new-case-required">*</span>
              </label>
              <div className="new-case-select-wrapper">
                <select
                  id="modalComplaintTitle"
                  className={`new-case-select ${
                    errors.complaintTitle ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.complaintTitle)}
                  value={complaintTitle}
                  onChange={(e) => {
                    setComplaintTitle(e.target.value);
                    if (errors.complaintTitle) {
                      setErrors((prev) => ({
                        ...prev,
                        complaintTitle: undefined,
                      }));
                    }
                  }}
                >
                  {COMPLAINT_TITLES.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="new-case-select-chevron"
                  aria-hidden="true"
                />
              </div>
              {errors.complaintTitle && (
                <p className="new-case-error-text" role="alert">
                  {errors.complaintTitle}
                </p>
              )}
            </div>

            {/* Row 4: Nature * (Civil / Criminal) */}
            <div className="new-case-field">
              <span className="new-case-label" id="modalNatureLabel">
                Nature <span className="new-case-required">*</span>
              </span>
              <div
                className="new-case-two-col"
                role="radiogroup"
                aria-labelledby="modalNatureLabel"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={nature === 'Civil'}
                  className={`new-case-nature-btn ${
                    nature === 'Civil' ? 'is-selected' : ''
                  }`}
                  onClick={() => {
                    setNature('Civil');
                    if (errors.nature) {
                      setErrors((prev) => ({ ...prev, nature: undefined }));
                    }
                  }}
                >
                  Civil
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={nature === 'Criminal'}
                  className={`new-case-nature-btn ${
                    nature === 'Criminal' ? 'is-selected' : ''
                  }`}
                  onClick={() => {
                    setNature('Criminal');
                    if (errors.nature) {
                      setErrors((prev) => ({ ...prev, nature: undefined }));
                    }
                  }}
                >
                  Criminal
                </button>
              </div>
              {errors.nature && (
                <p className="new-case-error-text" role="alert">
                  {errors.nature}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="new-case-footer">
            <button
              type="button"
              className="new-case-cancel-btn"
              disabled={isSubmitting}
              onClick={onClose}
            >
              {msg.cancel}
            </button>

            <button
              type="submit"
              className="new-case-submit-btn"
              disabled={isSubmitting}
            >
              <Plus size={15} strokeWidth={2.4} />
              <span>{isSubmitting ? msg.submitting : msg.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCaseModal;
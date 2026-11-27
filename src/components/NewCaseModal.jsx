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

function NewCaseModal({
  isOpen,
  onClose,
  onSubmitCase,
  caseNumber = '2026-011-002',
  dateFiled = 'November 10, 2026',
}) {
  const [caseTitle, setCaseTitle] = useState('');
  const [complaintTitle, setComplaintTitle] = useState(
    'Collection Sum of Money'
  );
  const [nature, setNature] = useState('Civil');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: caseNumber,
      parties: caseTitle.trim() || 'Juan Dela Cruz vs. Pedro Santos',
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
    onClose();
  };

  return (
    <div
      className="new-case-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newCaseModalTitle"
      onClick={onClose}
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
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
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
                className="new-case-input"
                placeholder="e.g. Juan Dela Cruz vs. Pedro Santos"
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
              />
            </div>

            {/* Row 3: Complaint Title * */}
            <div className="new-case-field">
              <label htmlFor="modalComplaintTitle" className="new-case-label">
                Complaint Title <span className="new-case-required">*</span>
              </label>
              <div className="new-case-select-wrapper">
                <select
                  id="modalComplaintTitle"
                  className="new-case-select"
                  value={complaintTitle}
                  onChange={(e) => setComplaintTitle(e.target.value)}
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
                  onClick={() => setNature('Civil')}
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
                  onClick={() => setNature('Criminal')}
                >
                  Criminal
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="new-case-footer">
            <button
              type="button"
              className="new-case-cancel-btn"
              onClick={onClose}
            >
              Kanselahon
            </button>

            <button type="submit" className="new-case-submit-btn">
              <Plus size={15} strokeWidth={2.4} />
              <span>Isumite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCaseModal;
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Upload,
  FileText,
  X,
} from 'lucide-react';
import ComplaintStepper from '../components/ComplaintStepper';
import './FileComplaintStep5.css';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_FILES_COUNT = 5;

function hasAllowedExtension(fileName) {
  const lower = fileName.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function FileComplaintStep5({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const {
    reportType = 'kp',
    complainantInfo = {},
    incidentData = {},
    respondentData = {},
    evidenceFiles: savedEvidence = [],
  } = location.state || {};

  const [files, setFiles] = useState(
    Array.isArray(savedEvidence) ? savedEvidence : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Magdagdag nin ebidensya',
      stepSubheading: 'Opsyonal lamang. Pwede man darahon sa barangay hall.',
      uploadTitle: 'Mag-upload nin litrato o dokumento',
      uploadBrowse: 'Pinduton para mag-browse',
      uploadHint: 'JPG, PNG o PDF • Hanggang 10 MB bawat file',
      greenTitle: 'Encrypted asin pribado',
      greenSub: 'Authorized staff sana an makakahiling kan files.',
      continueBtn: 'I-save asin magpadagos',
      errorInvalidType:
        'JPG, PNG, o PDF na file sana an pwede i-upload.',
      errorEmptyFile:
        'May piniling file na mayo nin laog (0 KB). Pumili nin tamang file.',
      errorTooLarge:
        'An file dai dapat maglampas sa 10 MB bawat saro.',
      errorMaxCount: `Hanggang ${MAX_FILES_COUNT} na file sana an pwede i-upload.`,
      errorDuplicate: 'Naka-upload na an file na ini.',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'Add evidence',
      stepSubheading: 'Optional only. You may also bring it to the barangay hall.',
      uploadTitle: 'Upload a photo or document',
      uploadBrowse: 'Click to browse',
      uploadHint: 'JPG, PNG or PDF • Up to 10 MB per file',
      greenTitle: 'Encrypted and private',
      greenSub: 'Only authorized staff can view the files.',
      continueBtn: 'Save and continue',
      errorInvalidType:
        'Only JPG, PNG, or PDF files are allowed.',
      errorEmptyFile:
        'One or more selected files are empty (0 KB). Please choose a valid file.',
      errorTooLarge:
        'Each file must not exceed 10 MB.',
      errorMaxCount: `You can upload up to ${MAX_FILES_COUNT} files only.`,
      errorDuplicate: 'This file has already been added.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleFilesAdded = (selectedFileList) => {
    const incoming = Array.from(selectedFileList || []);
    if (incoming.length === 0) return;

    const accepted = [];
    let rejectionMessage = '';

    for (const file of incoming) {
      if (files.length + accepted.length >= MAX_FILES_COUNT) {
        rejectionMessage = t.errorMaxCount;
        break;
      }

      const validType =
        ALLOWED_MIME_TYPES.includes(file.type) ||
        hasAllowedExtension(file.name);

      if (!validType) {
        rejectionMessage = t.errorInvalidType;
        continue;
      }

      if (file.size <= 0) {
        rejectionMessage = t.errorEmptyFile;
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejectionMessage = t.errorTooLarge;
        continue;
      }

      const isDuplicate = [...files, ...accepted].some(
        (existing) =>
          existing.name === file.name && existing.size === file.size
      );
      if (isDuplicate) {
        rejectionMessage = t.errorDuplicate;
        continue;
      }

      accepted.push({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }

    if (accepted.length > 0) {
      setFiles((prev) => [...prev, ...accepted]);
    }
    setFileError(rejectionMessage);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFilesAdded(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (fileError) setFileError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    navigate('/file-complaint/step-6', {
      state: {
        ...(location.state || {}),
        reportType,
        complainantInfo,
        incidentData,
        respondentData,
        evidenceFiles: files.map((f) => ({ name: f.name, size: f.size })),
      },
    });
  };

  const backState = {
    ...(location.state || {}),
    reportType,
    complainantInfo,
    incidentData,
    respondentData,
    evidenceFiles: files,
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Top Back Link */}
        <div className="complaint-back-row">
          <Link
            to="/file-complaint/step-4"
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
        <ComplaintStepper currentStep={5} language={language} />

        {/* Main White Form Card */}
        <form className="complaint-card" onSubmit={handleSubmit} noValidate>
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">5</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* Dashed File Dropzone */}
          <div
            role="button"
            tabIndex={0}
            aria-invalid={Boolean(fileError)}
            aria-describedby={fileError ? 'step5FileError' : undefined}
            className={`evidence-dropzone ${isDragging ? 'is-dragging' : ''} ${
              fileError ? 'is-invalid' : ''
            }`}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              className="evidence-file-input"
              onChange={handleFileChange}
            />

            <Upload
              size={24}
              strokeWidth={2}
              className="evidence-upload-icon"
              aria-hidden="true"
            />
            <p className="evidence-upload-title">{t.uploadTitle}</p>
            <p className="evidence-upload-browse">{t.uploadBrowse}</p>
            <p className="evidence-upload-hint">{t.uploadHint}</p>
          </div>

          {fileError && (
            <p
              id="step5FileError"
              className="step5-error-text"
              role="alert"
            >
              {fileError}
            </p>
          )}

          {/* Selected Files List (appears only if user uploads files) */}
          {files.length > 0 && (
            <ul className="evidence-file-list">
              {files.map((file, idx) => (
                <li key={`${file.name}-${idx}`} className="evidence-file-item">
                  <div className="evidence-file-info">
                    <FileText size={15} strokeWidth={2} />
                    <span className="evidence-file-name">{file.name}</span>
                    <span className="evidence-file-size">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    className="evidence-file-remove"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => handleRemoveFile(idx)}
                  >
                    <X size={14} strokeWidth={2.2} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Encrypted & Private Green Banner */}
          <div className="privacy-green-banner">
            <ShieldCheck
              size={18}
              strokeWidth={2}
              className="privacy-green-icon"
              aria-hidden="true"
            />
            <div>
              <p className="privacy-green-title">{t.greenTitle}</p>
              <p className="privacy-green-sub">{t.greenSub}</p>
            </div>
          </div>

          <hr className="complaint-divider step5-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link
              to="/file-complaint/step-4"
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

export default FileComplaintStep5;  
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  Users,
  Check,
  HelpCircle,
} from 'lucide-react';
import ComplaintStepper from '../components/ComplaintStepper';
import './FileComplaintStep1.css';

const ALLOWED_REPORT_TYPES = ['blotter', 'kp'];

function FileComplaintStep1({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialType = ALLOWED_REPORT_TYPES.includes(
    location.state?.reportType
  )
    ? location.state.reportType
    : 'blotter';

  const [selectedType, setSelectedType] = useState(initialType);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-file nin Reklamo / Magpa-Blotter',
      privacyText: 'Kompidensyal asin protektado an saimong impormasyon.',
      stepHeading: 'Ano an kaipuhan mong i-report?',
      stepSubheading:
        'Pumili nin tamang dalan. Iba an incident record sa reklamong kaipuhan nin mediation.',
      blotterBadge: 'BARANGAY BLOTTER',
      blotterTitle: 'Talaan nin Insidente',
      blotterDesc:
        'Para sa police/record report na dae kaipuhan nin pag-aayos kan Lupon.',
      blotterExamples: [
        'Nawawarang gamit',
        'Shoplifting',
        'Aksidente o pagkaraot nin property',
      ],
      kpBadge: 'KATARUNGANG PAMBARANGAY',
      kpTitle: 'Reklamo para sa Pag-aayos',
      kpDesc:
        'Para sa personal na alitan na kaipuhan nin Lupon mediation asin kasunduan.',
      kpExamples: [
        'Utang o away-kapitbahay',
        'Hangganan nin daga',
        'Paninirang-puri',
      ],
      selectedLabel: 'Napili',
      selectBlotterLabel: 'Pili-on an Blotter',
      selectKpLabel: 'Pili-on an KP Case',
      unsureBold: 'Dae sigurado?',
      unsureText:
        'Pili-on an pinakaharani. Pwede ining itama kan Secretary pagkatapos nin review.',
      cancelBtn: 'Kanselahon',
      continueBtn: 'I-save asin magpadagos',
      selectionError:
        'Pumili muna kun Barangay Blotter o Katarungang Pambarangay bago magpadagos.',
    },
    en: {
      back: 'Back',
      pageTitle: 'File a Complaint / Blotter',
      privacyText: 'Your information is confidential and protected.',
      stepHeading: 'What do you need to report?',
      stepSubheading:
        'Choose the right path. An incident record differs from a complaint requiring mediation.',
      blotterBadge: 'BARANGAY BLOTTER',
      blotterTitle: 'Incident Record',
      blotterDesc:
        'For police/record reports that do not require Lupon settlement.',
      blotterExamples: [
        'Lost items',
        'Shoplifting',
        'Accident or property damage',
      ],
      kpBadge: 'KATARUNGANG PAMBARANGAY',
      kpTitle: 'Complaint for Settlement',
      kpDesc:
        'For personal disputes requiring Lupon mediation and agreement.',
      kpExamples: [
        'Debt or neighbor dispute',
        'Property boundary',
        'Defamation / slander',
      ],
      selectedLabel: 'Selected',
      selectBlotterLabel: 'Select Blotter',
      selectKpLabel: 'Select KP Case',
      unsureBold: 'Not sure?',
      unsureText:
        'Choose the closest option. The Secretary can correct this after review.',
      cancelBtn: 'Cancel',
      continueBtn: 'Save and continue',
      selectionError:
        'Please select either Barangay Blotter or Katarungang Pambarangay before continuing.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (error) setError('');
  };

  const handleContinue = () => {
    if (isSubmitting) return;

    if (!ALLOWED_REPORT_TYPES.includes(selectedType)) {
      setError(t.selectionError);
      return;
    }

    setError('');
    setIsSubmitting(true);
    navigate('/file-complaint/step-2', {
      state: {
        ...(location.state || {}),
        reportType: selectedType,
      },
    });
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">
        {/* Back Navigation */}
        <div className="complaint-back-row">
          <Link to="/" className="complaint-back-link">
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
        <ComplaintStepper currentStep={1} language={language} />

        {/* Main White Card */}
        <section className="complaint-card">
          {/* Card Header */}
          <div className="complaint-card-header">
            <div className="step-number-badge">1</div>
            <div>
              <h2 className="step-heading">{t.stepHeading}</h2>
              <p className="step-subheading">{t.stepSubheading}</p>
            </div>
          </div>

          <hr className="complaint-divider" />

          {/* Two Selection Cards */}
          <div
            className="report-type-grid"
            role="radiogroup"
            aria-label={t.stepHeading}
          >
            {/* Option 1: Barangay Blotter */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedType === 'blotter'}
              className={`report-type-card ${
                selectedType === 'blotter' ? 'is-selected' : ''
              }`}
              onClick={() => handleSelectType('blotter')}
            >
              <div className="report-type-top">
                <div className="report-icon-box report-icon-box--blotter">
                  <FileText size={20} strokeWidth={1.9} />
                </div>

                <span className="report-pill report-pill--blotter">
                  {t.blotterBadge}
                </span>

                <h3 className="report-type-title">{t.blotterTitle}</h3>
                <p className="report-type-desc">{t.blotterDesc}</p>

                <ul className="report-examples-list">
                  {t.blotterExamples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>

              <div className="report-type-footer">
                {selectedType === 'blotter' ? (
                  <>
                    <Check size={15} strokeWidth={2.5} />
                    <span>{t.selectedLabel}</span>
                  </>
                ) : (
                  <>
                    <ArrowRight size={15} strokeWidth={2.2} />
                    <span>{t.selectBlotterLabel}</span>
                  </>
                )}
              </div>
            </button>

            {/* Option 2: Katarungang Pambarangay */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedType === 'kp'}
              className={`report-type-card ${
                selectedType === 'kp' ? 'is-selected' : ''
              }`}
              onClick={() => handleSelectType('kp')}
            >
              <div className="report-type-top">
                <div className="report-icon-box report-icon-box--kp">
                  <Users size={20} strokeWidth={1.9} />
                </div>

                <span className="report-pill report-pill--kp">{t.kpBadge}</span>

                <h3 className="report-type-title">{t.kpTitle}</h3>
                <p className="report-type-desc">{t.kpDesc}</p>

                <ul className="report-examples-list">
                  {t.kpExamples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>

              <div className="report-type-footer">
                {selectedType === 'kp' ? (
                  <>
                    <Check size={15} strokeWidth={2.5} />
                    <span>{t.selectedLabel}</span>
                  </>
                ) : (
                  <>
                    <ArrowRight size={15} strokeWidth={2.2} />
                    <span>{t.selectKpLabel}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {error && (
            <p className="step1-error-text" role="alert">
              {error}
            </p>
          )}

          {/* Unsure Helper Banner */}
          <div className="unsure-banner">
            <HelpCircle size={16} strokeWidth={2} className="unsure-icon" />
            <p className="unsure-text">
              <strong>{t.unsureBold}</strong> {t.unsureText}
            </p>
          </div>

          <hr className="complaint-divider complaint-divider--bottom" />

          {/* Card Footer Action Buttons */}
          <div className="complaint-card-actions">
            <Link to="/" className="btn-cancel">
              {t.cancelBtn}
            </Link>

            <button
              type="button"
              className="btn-continue"
              disabled={isSubmitting}
              onClick={handleContinue}
            >
              <span>{t.continueBtn}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FileComplaintStep1;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import './LuponRegister.css';

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

const LUPON_POSITIONS = [
  'Secretary',
  'Punong Barangay / Lupon Chairman',
  'Lupon Member',
  'Pangkat Secretary',
];

function normalizePhSubscriberNumber(rawValue) {
  const compact = rawValue.replace(/[\s\-()]/g, '');
  if (/^\+639\d{9}$/.test(compact)) return compact.slice(3);
  if (/^639\d{9}$/.test(compact)) return compact.slice(2);
  if (/^09\d{9}$/.test(compact)) return compact.slice(1);
  if (/^9\d{9}$/.test(compact)) return compact;
  return null;
}

function LuponRegister({ language = 'bikol' }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    barangay: 'Abella',
    fullName: '',
    mobileNumber: '',
    position: 'Secretary',
    isAuthorized: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    bikol: {
      backToLogin: 'Back to login',
      eyebrow: 'LUPON PORTAL',
      title: 'Registration',
      subtitle: 'Mag-rehistro nin account.',
      barangayLabel: 'Barangay',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'ex. Juan Dela Cruz',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      positionLabel: 'Position',
      declaration:
        'Pinapatunayan ko na awtorisado akong miyembro kan Lupon Tagapamayapa sa Ciudad nin Naga asin tama an impormasyon sa itaas.',
      submitBtn: 'Isumite',
      submittingBtn: 'Ipinapasa...',
      barangayInvalid: 'Pumili nin tamang Barangay sa lista.',
      fullNameRequired: 'Kinakaipuhan an Full Name.',
      fullNameMin: 'Dai mababa sa 2 karakter an Full Name.',
      fullNameMax: 'Dai malampas sa 100 karakter an Full Name.',
      fullNameInvalid:
        'Mga letra, espasyo, tuldok (.), gitling (-), asin kudlit (\') sana an pwede.',
      mobileRequired: 'Kinakaipuhan an mobile number.',
      mobileInvalid:
        'Maglagay nin tamang 10-digit PH mobile number pagkatapos kan +63 (e.g. 917 123 4567).',
      positionInvalid: 'Pumili nin tamang Position sa lista.',
      declarationRequired:
        'Markahan muna an sertipikasyon bago isumite an registration.',
    },
    en: {
      backToLogin: 'Back to login',
      eyebrow: 'LUPON PORTAL',
      title: 'Registration',
      subtitle: 'Register an account.',
      barangayLabel: 'Barangay',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'ex. Juan Dela Cruz',
      mobileLabel: 'Mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      positionLabel: 'Position',
      declaration:
        'I certify that I am an authorized member of the Lupon Tagapamayapa in Naga City and that the information above is accurate.',
      submitBtn: 'Submit',
      submittingBtn: 'Submitting...',
      barangayInvalid: 'Please select a valid Barangay from the list.',
      fullNameRequired: 'Full Name is required.',
      fullNameMin: 'Full Name must be at least 2 characters.',
      fullNameMax: 'Full Name must not exceed 100 characters.',
      fullNameInvalid:
        'Only letters, spaces, periods (.), hyphens (-), and apostrophes (\') are allowed.',
      mobileRequired: 'Mobile number is required.',
      mobileInvalid:
        'Enter a valid 10-digit PH mobile number after +63 (e.g. 917 123 4567).',
      positionInvalid: 'Please select a valid Position from the list.',
      declarationRequired:
        'Please check the authorization certification box before submitting.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!NAGA_BARANGAYS.includes(formData.barangay)) {
      nextErrors.barangay = t.barangayInvalid;
    }

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
    } else if (!normalizePhSubscriberNumber(trimmedMobile)) {
      nextErrors.mobileNumber = t.mobileInvalid;
    }

    if (!LUPON_POSITIONS.includes(formData.position)) {
      nextErrors.position = t.positionInvalid;
    }

    if (!formData.isAuthorized) {
      nextErrors.isAuthorized = t.declarationRequired;
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

    const normalizedSubscriber = normalizePhSubscriberNumber(
      formData.mobileNumber.trim()
    );

    navigate('/lupon-register/submitted', {
      state: {
        registeredBarangay: formData.barangay,
        registeredFullName: formData.fullName.trim(),
        registeredMobile: `+63${normalizedSubscriber}`,
        registeredPosition: formData.position,
      },
    });
  };

  return (
    <main className="lupon-auth-page">
      {/* Subtle Concentric Blue Halo */}
      <div className="lupon-auth-halo" aria-hidden="true" />

      <section
        className="lupon-auth-card lupon-register-card"
        aria-labelledby="luponRegisterHeading"
      >
        <Link to="/lupon-login" className="lupon-back-login-link">
          <ArrowLeft size={13} strokeWidth={2.2} />
          <span>{t.backToLogin}</span>
        </Link>

        <p className="lupon-auth-eyebrow">{t.eyebrow}</p>
        <h1 id="luponRegisterHeading" className="lupon-auth-title">
          {t.title}
        </h1>
        <p className="lupon-auth-subtitle lupon-register-subtitle">
          {t.subtitle}
        </p>

        <form className="lupon-auth-form" onSubmit={handleSubmit} noValidate>
          {/* Barangay */}
          <div className="lupon-field">
            <label htmlFor="regBarangay" className="lupon-label">
              {t.barangayLabel} <span className="lupon-required">*</span>
            </label>
            <div className="lupon-select-wrapper">
              <select
                id="regBarangay"
                name="barangay"
                className={`lupon-select ${
                  errors.barangay ? 'is-invalid' : ''
                }`}
                aria-invalid={Boolean(errors.barangay)}
                aria-describedby={
                  errors.barangay ? 'regBarangayError' : undefined
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
                className="lupon-select-chevron"
                aria-hidden="true"
              />
            </div>
            {errors.barangay && (
              <p
                id="regBarangayError"
                className="lupon-error-text"
                role="alert"
              >
                {errors.barangay}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="lupon-field">
            <label htmlFor="regFullName" className="lupon-label">
              {t.fullNameLabel} <span className="lupon-required">*</span>
            </label>
            <input
              id="regFullName"
              name="fullName"
              type="text"
              maxLength={100}
              className={`lupon-input ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder={t.fullNamePlaceholder}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'regFullNameError' : undefined
              }
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p
                id="regFullNameError"
                className="lupon-error-text"
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="lupon-field">
            <label htmlFor="regMobile" className="lupon-label">
              {t.mobileLabel} <span className="lupon-required">*</span>
            </label>
            <div
              className={`lupon-phone-group ${
                errors.mobileNumber ? 'is-invalid' : ''
              }`}
            >
              <span className="lupon-phone-prefix">+63</span>
              <input
                id="regMobile"
                name="mobileNumber"
                type="tel"
                maxLength={16}
                className="lupon-phone-input"
                placeholder={t.mobilePlaceholder}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={
                  errors.mobileNumber ? 'regMobileError' : undefined
                }
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            {errors.mobileNumber && (
              <p id="regMobileError" className="lupon-error-text" role="alert">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          {/* Position */}
          <div className="lupon-field">
            <label htmlFor="regPosition" className="lupon-label">
              {t.positionLabel} <span className="lupon-required">*</span>
            </label>
            <div className="lupon-select-wrapper">
              <select
                id="regPosition"
                name="position"
                className={`lupon-select ${
                  errors.position ? 'is-invalid' : ''
                }`}
                aria-invalid={Boolean(errors.position)}
                aria-describedby={
                  errors.position ? 'regPositionError' : undefined
                }
                value={formData.position}
                onChange={handleChange}
              >
                {LUPON_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="lupon-select-chevron"
                aria-hidden="true"
              />
            </div>
            {errors.position && (
              <p
                id="regPositionError"
                className="lupon-error-text"
                role="alert"
              >
                {errors.position}
              </p>
            )}
          </div>

          {/* Authorization Checkbox */}
          <label
            className={`lupon-register-check-row ${
              errors.isAuthorized ? 'is-invalid' : ''
            }`}
            htmlFor="regAuthorized"
          >
            <input
              id="regAuthorized"
              name="isAuthorized"
              type="checkbox"
              className="lupon-register-checkbox"
              aria-invalid={Boolean(errors.isAuthorized)}
              aria-describedby={
                errors.isAuthorized ? 'regAuthorizedError' : undefined
              }
              checked={formData.isAuthorized}
              onChange={handleChange}
            />
            <span className="lupon-register-check-text">{t.declaration}</span>
          </label>

          {errors.isAuthorized && (
            <p
              id="regAuthorizedError"
              className="lupon-error-text"
              role="alert"
            >
              {errors.isAuthorized}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="lupon-primary-btn"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? t.submittingBtn : t.submitBtn}</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </form>
      </section>
    </main>
  );
}

export default LuponRegister;
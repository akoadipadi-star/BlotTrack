import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Eye, EyeOff } from 'lucide-react';
import './LuponLogin.css';

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

function normalizePhSubscriberNumber(rawValue) {
  const compact = rawValue.replace(/[\s\-()]/g, '');
  if (/^\+639\d{9}$/.test(compact)) return compact.slice(3);
  if (/^639\d{9}$/.test(compact)) return compact.slice(2);
  if (/^09\d{9}$/.test(compact)) return compact.slice(1);
  if (/^9\d{9}$/.test(compact)) return compact;
  return null;
}

function LuponLogin({ language = 'bikol' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialBarangay = NAGA_BARANGAYS.includes(location.state?.barangay)
    ? location.state.barangay
    : 'Abella';

  const [barangay, setBarangay] = useState(initialBarangay);
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    bikol: {
      eyebrow: 'LUPON PORTAL',
      title: 'Login',
      subtitle: 'Mag-sign in tanganing magpadagos sa saimong workspace.',
      barangayLabel: 'Barangay',
      mobileLabel: 'Registered mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      pinLabel: '4-digit security PIN',
      pinPlaceholder: '••••',
      showPinLabel: 'Ipahiling an PIN',
      hidePinLabel: 'Itago an PIN',
      signInBtn: 'Mag-sign in',
      signingInBtn: 'Nagla-login...',
      forgotLink: 'Nalingawan an password?',
      newUserDivider: 'Bagong user?',
      registerBtn: 'Magrehistro nin account',
      barangayInvalid: 'Pumili nin tamang Barangay sa lista.',
      mobileRequired: 'Kinakaipuhan an registered mobile number.',
      mobileInvalid:
        'Maglagay nin tamang 10-digit PH mobile number pagkatapos kan +63 (e.g. 917 123 4567).',
      pinRequired: 'Kinakaipuhan an 4-digit security PIN.',
      pinInvalid: 'An security PIN dapat eksaktong 4 na numero.',
    },
    en: {
      eyebrow: 'LUPON PORTAL',
      title: 'Login',
      subtitle: 'Sign in to continue to your workspace.',
      barangayLabel: 'Barangay',
      mobileLabel: 'Registered mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      pinLabel: '4-digit security PIN',
      pinPlaceholder: '••••',
      showPinLabel: 'Show PIN',
      hidePinLabel: 'Hide PIN',
      signInBtn: 'Sign in',
      signingInBtn: 'Signing in...',
      forgotLink: 'Forgot password?',
      newUserDivider: 'New user?',
      registerBtn: 'Register an account',
      barangayInvalid: 'Please select a valid Barangay from the list.',
      mobileRequired: 'Registered mobile number is required.',
      mobileInvalid:
        'Enter a valid 10-digit PH mobile number after +63 (e.g. 917 123 4567).',
      pinRequired: '4-digit security PIN is required.',
      pinInvalid: 'Security PIN must be exactly 4 numeric digits.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handlePinChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(digitsOnly);
    if (errors.pin) {
      setErrors((prev) => ({ ...prev, pin: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!NAGA_BARANGAYS.includes(barangay)) {
      nextErrors.barangay = t.barangayInvalid;
    }

    const trimmedMobile = mobileNumber.trim();
    if (!trimmedMobile) {
      nextErrors.mobileNumber = t.mobileRequired;
    } else if (!normalizePhSubscriberNumber(trimmedMobile)) {
      nextErrors.mobileNumber = t.mobileInvalid;
    }

    if (!pin) {
      nextErrors.pin = t.pinRequired;
    } else if (!/^\d{4}$/.test(pin)) {
      nextErrors.pin = t.pinInvalid;
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
      mobileNumber.trim()
    );

    navigate('/lupon-dashboard', {
      state: {
        barangay,
        mobileNumber: `+63${normalizedSubscriber}`,
      },
    });
  };

  return (
    <main className="lupon-auth-page">
      {/* Subtle Concentric Blue Halo */}
      <div className="lupon-auth-halo" aria-hidden="true" />

      <section className="lupon-auth-card" aria-labelledby="luponLoginHeading">
        <p className="lupon-auth-eyebrow">{t.eyebrow}</p>
        <h1 id="luponLoginHeading" className="lupon-auth-title">
          {t.title}
        </h1>
        <p className="lupon-auth-subtitle">{t.subtitle}</p>

        <form className="lupon-auth-form" onSubmit={handleSubmit} noValidate>
          {/* Barangay Select */}
          <div className="lupon-field">
            <label htmlFor="luponBarangay" className="lupon-label">
              {t.barangayLabel}
            </label>
            <div className="lupon-select-wrapper">
              <select
                id="luponBarangay"
                className={`lupon-select ${
                  errors.barangay ? 'is-invalid' : ''
                }`}
                aria-invalid={Boolean(errors.barangay)}
                aria-describedby={
                  errors.barangay ? 'luponBarangayError' : undefined
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
                className="lupon-select-chevron"
                aria-hidden="true"
              />
            </div>
            {errors.barangay && (
              <p
                id="luponBarangayError"
                className="lupon-error-text"
                role="alert"
              >
                {errors.barangay}
              </p>
            )}
          </div>

          {/* Registered Mobile Number */}
          <div className="lupon-field">
            <label htmlFor="luponMobile" className="lupon-label">
              {t.mobileLabel}
            </label>
            <div
              className={`lupon-phone-group ${
                errors.mobileNumber ? 'is-invalid' : ''
              }`}
            >
              <span className="lupon-phone-prefix">+63</span>
              <input
                id="luponMobile"
                type="tel"
                maxLength={16}
                className="lupon-phone-input"
                placeholder={t.mobilePlaceholder}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={
                  errors.mobileNumber ? 'luponMobileError' : undefined
                }
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  if (errors.mobileNumber) {
                    setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                  }
                }}
              />
            </div>
            {errors.mobileNumber && (
              <p
                id="luponMobileError"
                className="lupon-error-text"
                role="alert"
              >
                {errors.mobileNumber}
              </p>
            )}
          </div>

          {/* 4-digit Security PIN */}
          <div className="lupon-field">
            <label htmlFor="luponPin" className="lupon-label">
              {t.pinLabel}
            </label>
            <div className="lupon-pin-wrapper">
              <input
                id="luponPin"
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={4}
                className={`lupon-input lupon-pin-input ${
                  errors.pin ? 'is-invalid' : ''
                }`}
                placeholder={t.pinPlaceholder}
                aria-invalid={Boolean(errors.pin)}
                aria-describedby={errors.pin ? 'luponPinError' : undefined}
                value={pin}
                onChange={handlePinChange}
              />
              <button
                type="button"
                className="lupon-pin-toggle"
                aria-label={showPin ? t.hidePinLabel : t.showPinLabel}
                onClick={() => setShowPin((prev) => !prev)}
              >
                {showPin ? (
                  <EyeOff size={15} strokeWidth={2} />
                ) : (
                  <Eye size={15} strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.pin && (
              <p id="luponPinError" className="lupon-error-text" role="alert">
                {errors.pin}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="lupon-primary-btn"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? t.signingInBtn : t.signInBtn}</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="lupon-forgot-row">
          <Link to="/lupon-forgot-password" className="lupon-forgot-link">
            {t.forgotLink}
          </Link>
        </div>

        {/* New User Divider */}
        <div className="lupon-divider-row">
          <span className="lupon-divider-text">{t.newUserDivider}</span>
        </div>

        {/* Register Account Outlined Button */}
        <Link to="/lupon-register" className="lupon-secondary-btn">
          {t.registerBtn}
        </Link>
      </section>
    </main>
  );
}

export default LuponLogin;
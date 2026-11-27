import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
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

function LuponLogin({ language = 'bikol' }) {
  const navigate = useNavigate();

  const [barangay, setBarangay] = useState('Abella');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');

  const content = {
    bikol: {
      eyebrow: 'LUPON PORTAL',
      title: 'Login',
      subtitle: 'Mag-sign in tanganing magpadagos sa saimong workspace.',
      barangayLabel: 'Barangay',
      mobileLabel: 'Registered mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      pinLabel: '4-digit security PIN',
      pinPlaceholder: 'password',
      signInBtn: 'Mag-sign in',
      forgotLink: 'Nalingawan an password?',
      newUserDivider: 'Bagong user?',
      registerBtn: 'Magrehistro nin account',
    },
    en: {
      eyebrow: 'LUPON PORTAL',
      title: 'Login',
      subtitle: 'Sign in to continue to your workspace.',
      barangayLabel: 'Barangay',
      mobileLabel: 'Registered mobile number',
      mobilePlaceholder: '9XX XXX XXXX',
      pinLabel: '4-digit security PIN',
      pinPlaceholder: 'password',
      signInBtn: 'Sign in',
      forgotLink: 'Forgot password?',
      newUserDivider: 'New user?',
      registerBtn: 'Register an account',
    },
  };

  const t = content[language] || content.bikol;

  const handlePinChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(digitsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/lupon-dashboard', { state: { barangay } });
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

        <form className="lupon-auth-form" onSubmit={handleSubmit}>
          {/* Barangay Select */}
          <div className="lupon-field">
            <label htmlFor="luponBarangay" className="lupon-label">
              {t.barangayLabel}
            </label>
            <div className="lupon-select-wrapper">
              <select
                id="luponBarangay"
                className="lupon-select"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
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
          </div>

          {/* Registered Mobile Number */}
          <div className="lupon-field">
            <label htmlFor="luponMobile" className="lupon-label">
              {t.mobileLabel}
            </label>
            <div className="lupon-phone-group">
              <span className="lupon-phone-prefix">+63</span>
              <input
                id="luponMobile"
                type="tel"
                className="lupon-phone-input"
                placeholder={t.mobilePlaceholder}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>

          {/* 4-digit Security PIN */}
          <div className="lupon-field">
            <label htmlFor="luponPin" className="lupon-label">
              {t.pinLabel}
            </label>
            <input
              id="luponPin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              className="lupon-input lupon-pin-input"
              placeholder={t.pinPlaceholder}
              value={pin}
              onChange={handlePinChange}
            />
          </div>

          {/* Sign In Button */}
          <button type="submit" className="lupon-primary-btn">
            <span>{t.signInBtn}</span>
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
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

function LuponRegister({ language = 'bikol' }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    barangay: 'Abella',
    fullName: '',
    mobileNumber: '',
    position: 'Secretary',
    isAuthorized: true,
  });

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
    },
  };

  const t = content[language] || content.bikol;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.isAuthorized) return;
    navigate('/lupon-register/submitted', {
      state: {
        registeredBarangay: formData.barangay,
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

        <form className="lupon-auth-form" onSubmit={handleSubmit}>
          {/* Barangay */}
          <div className="lupon-field">
            <label htmlFor="regBarangay" className="lupon-label">
              {t.barangayLabel} <span className="lupon-required">*</span>
            </label>
            <div className="lupon-select-wrapper">
              <select
                id="regBarangay"
                name="barangay"
                className="lupon-select"
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
              className="lupon-input"
              placeholder={t.fullNamePlaceholder}
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="lupon-field">
            <label htmlFor="regMobile" className="lupon-label">
              {t.mobileLabel} <span className="lupon-required">*</span>
            </label>
            <div className="lupon-phone-group">
              <span className="lupon-phone-prefix">+63</span>
              <input
                id="regMobile"
                name="mobileNumber"
                type="tel"
                className="lupon-phone-input"
                placeholder={t.mobilePlaceholder}
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
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
                className="lupon-select"
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
          </div>

          {/* Authorization Checkbox */}
          <label className="lupon-register-check-row" htmlFor="regAuthorized">
            <input
              id="regAuthorized"
              name="isAuthorized"
              type="checkbox"
              className="lupon-register-checkbox"
              checked={formData.isAuthorized}
              onChange={handleChange}
            />
            <span className="lupon-register-check-text">{t.declaration}</span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="lupon-primary-btn"
            disabled={!formData.isAuthorized}
          >
            <span>{t.submitBtn}</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </form>
      </section>
    </main>
  );
}

export default LuponRegister;
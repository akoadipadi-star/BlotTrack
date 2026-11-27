import { useState } from 'react';
import { Users, ChevronDown, Check } from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import ChangePasswordModal from '../components/ChangePasswordModal';
import './LuponProfile.css';

const ZONE_OPTIONS = [
  'Zone 1',
  'Zone 2',
  'Zone 3',
  'Zone 4',
  'Zone 5',
  'Zone 6',
  'Zone 7',
];

const POSITION_OPTIONS = [
  'Barangay Secretary',
  'Punong Barangay',
  'Lupon Member',
  'Pangkat Secretary',
];

const VALIDATION_TEXT = {
  bikol: {
    fullNameRequired: 'Kinakaipuhan an Full Name.',
    fullNameMin: 'Dai mababa sa 2 karakter an Full Name.',
    fullNameMax: 'Dai malampas sa 100 karakter an Full Name.',
    fullNameInvalid:
      'Mga letra, espasyo, tuldok (.), gitling (-), asin kudlit (\') sana an pwede.',
    addressInvalid: 'Pumili nin tamang Zone sa lista.',
    positionInvalid: 'Pumili nin tamang Position sa lista.',
    mobileRequired: 'Kinakaipuhan an Mobile Number.',
    mobileInvalid:
      'Maglagay nin tamang PH mobile number (e.g. 0917 555 2048 o +639175552048).',
    saving: 'Isine-save...',
    saved: 'Nai-save na!',
    save: 'I-save',
  },
  en: {
    fullNameRequired: 'Full Name is required.',
    fullNameMin: 'Full Name must be at least 2 characters.',
    fullNameMax: 'Full Name must not exceed 100 characters.',
    fullNameInvalid:
      'Only letters, spaces, periods (.), hyphens (-), and apostrophes (\') are allowed.',
    addressInvalid: 'Please select a valid Zone from the list.',
    positionInvalid: 'Please select a valid Position from the list.',
    mobileRequired: 'Mobile Number is required.',
    mobileInvalid:
      'Enter a valid Philippine mobile number (e.g. 0917 555 2048 or +639175552048).',
    saving: 'Saving...',
    saved: 'Saved!',
    save: 'Save',
  },
};

function isValidPhMobile(rawValue) {
  const compact = rawValue.replace(/[\s\-()]/g, '');
  return /^(09\d{9}|\+639\d{9})$/.test(compact);
}

function LuponProfile({ language = 'bikol', onLanguageChange }) {
  const [fullName, setFullName] = useState('Maria L. Reyes');
  const [address, setAddress] = useState('Zone 1');
  const [position, setPosition] = useState('Barangay Secretary');
  const [mobileNumber, setMobileNumber] = useState('0917 555 2048');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const msg = VALIDATION_TEXT[language === 'en' ? 'en' : 'bikol'];

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      nextErrors.fullName = msg.fullNameRequired;
    } else if (trimmedName.length < 2) {
      nextErrors.fullName = msg.fullNameMin;
    } else if (trimmedName.length > 100) {
      nextErrors.fullName = msg.fullNameMax;
    } else if (!/^[a-zA-ZÀ-ÿñÑ\s.'-]+$/.test(trimmedName)) {
      nextErrors.fullName = msg.fullNameInvalid;
    }

    if (!ZONE_OPTIONS.includes(address)) {
      nextErrors.address = msg.addressInvalid;
    }

    if (!POSITION_OPTIONS.includes(position)) {
      nextErrors.position = msg.positionInvalid;
    }

    const trimmedMobile = mobileNumber.trim();
    if (!trimmedMobile) {
      nextErrors.mobileNumber = msg.mobileRequired;
    } else if (!isValidPhMobile(trimmedMobile)) {
      nextErrors.mobileNumber = msg.mobileInvalid;
    }

    return nextErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSavedNotice(false);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setFullName((prev) => prev.trim());
    setMobileNumber((prev) => prev.trim());

    setSavedNotice(true);
    setIsSubmitting(false);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdatePassword = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={
        language === 'bikol'
          ? 'Mag-report nin Problema sa System'
          : 'Report a System Problem'
      }
    >
      <div className="profile-page-container">
        {/* Top Date & Heading */}
        <header className="profile-page-header">
          <p className="profile-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
          <h1 className="profile-title">Impormasyon kan Account</h1>
          <p className="profile-subtitle">
            I-update an saimong personal, papel, asin siguradong impormasyon sa
            pag-login
          </p>
        </header>

        {/* Personal Details Card */}
        <section
          className="profile-card"
          aria-labelledby="personalDetailsHeading"
        >
          {/* Card Header */}
          <div className="profile-card-header">
            <div className="profile-card-icon-box" aria-hidden="true">
              <Users size={18} strokeWidth={2} />
            </div>
            <div>
              <h2 id="personalDetailsHeading" className="profile-card-title">
                Personal Details
              </h2>
              <p className="profile-card-sub">
                Personal na Impormasyon at Tungkulin
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} noValidate>
            <div className="profile-card-body">
              <div className="profile-form-grid">
                {/* Full Name * */}
                <div className="profile-field">
                  <label htmlFor="profileFullName" className="profile-label">
                    Full Name <span className="profile-required">*</span>
                  </label>
                  <input
                    id="profileFullName"
                    type="text"
                    maxLength={100}
                    className={`profile-input ${
                      errors.fullName ? 'is-invalid' : ''
                    }`}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? 'profileFullNameError' : undefined
                    }
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) {
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }
                    }}
                  />
                  {errors.fullName && (
                    <p
                      id="profileFullNameError"
                      className="profile-error-text"
                      role="alert"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Address * */}
                <div className="profile-field">
                  <label htmlFor="profileAddress" className="profile-label">
                    Address <span className="profile-required">*</span>
                  </label>
                  <div className="profile-select-wrapper">
                    <select
                      id="profileAddress"
                      className={`profile-select ${
                        errors.address ? 'is-invalid' : ''
                      }`}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={
                        errors.address ? 'profileAddressError' : undefined
                      }
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) {
                          setErrors((prev) => ({
                            ...prev,
                            address: undefined,
                          }));
                        }
                      }}
                    >
                      {ZONE_OPTIONS.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="profile-select-chevron"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.address && (
                    <p
                      id="profileAddressError"
                      className="profile-error-text"
                      role="alert"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Position * */}
                <div className="profile-field">
                  <label htmlFor="profilePosition" className="profile-label">
                    Position <span className="profile-required">*</span>
                  </label>
                  <div className="profile-select-wrapper">
                    <select
                      id="profilePosition"
                      className={`profile-select ${
                        errors.position ? 'is-invalid' : ''
                      }`}
                      aria-invalid={Boolean(errors.position)}
                      aria-describedby={
                        errors.position ? 'profilePositionError' : undefined
                      }
                      value={position}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        if (errors.position) {
                          setErrors((prev) => ({
                            ...prev,
                            position: undefined,
                          }));
                        }
                      }}
                    >
                      {POSITION_OPTIONS.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="profile-select-chevron"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.position && (
                    <p
                      id="profilePositionError"
                      className="profile-error-text"
                      role="alert"
                    >
                      {errors.position}
                    </p>
                  )}
                </div>

                {/* Mobile Number * */}
                <div className="profile-field">
                  <label htmlFor="profileMobile" className="profile-label">
                    Mobile Number <span className="profile-required">*</span>
                  </label>
                  <input
                    id="profileMobile"
                    type="tel"
                    maxLength={20}
                    className={`profile-input ${
                      errors.mobileNumber ? 'is-invalid' : ''
                    }`}
                    aria-invalid={Boolean(errors.mobileNumber)}
                    aria-describedby={
                      errors.mobileNumber ? 'profileMobileError' : undefined
                    }
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (errors.mobileNumber) {
                        setErrors((prev) => ({
                          ...prev,
                          mobileNumber: undefined,
                        }));
                      }
                    }}
                  />
                  {errors.mobileNumber && (
                    <p
                      id="profileMobileError"
                      className="profile-error-text"
                      role="alert"
                    >
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Sanglian an Password Modal Trigger */}
              <div className="profile-password-section">
                <button
                  type="button"
                  className="profile-password-link"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Sanglian an Password
                </button>
              </div>
            </div>

            {/* Footer Save Bar */}
            <div className="profile-card-footer">
              <button
                type="submit"
                className="profile-save-btn"
                disabled={isSubmitting}
              >
                <Check size={15} strokeWidth={2.4} />
                <span>
                  {isSubmitting
                    ? msg.saving
                    : savedNotice
                      ? msg.saved
                      : msg.save}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onUpdatePassword={handleUpdatePassword}
        language={language}
      />
    </LuponLayout>
  );
}

export default LuponProfile;
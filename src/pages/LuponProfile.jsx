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

function LuponProfile({ language = 'bikol', onLanguageChange }) {
  const [fullName, setFullName] = useState('Maria L. Reyes');
  const [address, setAddress] = useState('Zone 1');
  const [position, setPosition] = useState('Barangay Secretary');
  const [mobileNumber, setMobileNumber] = useState('0917 555 2048');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
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
          <form onSubmit={handleSave}>
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
                    className="profile-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Address * */}
                <div className="profile-field">
                  <label htmlFor="profileAddress" className="profile-label">
                    Address <span className="profile-required">*</span>
                  </label>
                  <div className="profile-select-wrapper">
                    <select
                      id="profileAddress"
                      className="profile-select"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                </div>

                {/* Position * */}
                <div className="profile-field">
                  <label htmlFor="profilePosition" className="profile-label">
                    Position <span className="profile-required">*</span>
                  </label>
                  <div className="profile-select-wrapper">
                    <select
                      id="profilePosition"
                      className="profile-select"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
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
                </div>

                {/* Mobile Number * */}
                <div className="profile-field">
                  <label htmlFor="profileMobile" className="profile-label">
                    Mobile Number <span className="profile-required">*</span>
                  </label>
                  <input
                    id="profileMobile"
                    type="text"
                    className="profile-input"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
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
              <button type="submit" className="profile-save-btn">
                <Check size={15} strokeWidth={2.4} />
                <span>{savedNotice ? 'Nai-save na!' : 'I-save'}</span>
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
      />
    </LuponLayout>
  );
}

export default LuponProfile;
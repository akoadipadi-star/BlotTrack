import { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import './ChangePasswordModal.css';

function ChangePasswordModal({ isOpen, onClose, onUpdatePassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdatePassword) {
      onUpdatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
    }
    onClose();
  };

  return (
    <div
      className="change-pass-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changePassModalTitle"
      onClick={onClose}
    >
      <div
        className="change-pass-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="change-pass-header">
          <div className="change-pass-header-left">
            <div className="change-pass-icon-box" aria-hidden="true">
              <ShieldCheck size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 id="changePassModalTitle" className="change-pass-title">
                Change Password
              </h2>
              <p className="change-pass-subtitle">
                Hiwalay na Security Section
              </p>
            </div>
          </div>

          <button
            type="button"
            className="change-pass-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="change-pass-body">
            {/* Current Password * */}
            <div className="change-pass-field">
              <label htmlFor="modalCurrentPassword" className="change-pass-label">
                Current Password <span className="change-pass-required">*</span>
              </label>
              <input
                id="modalCurrentPassword"
                type="password"
                className="change-pass-input"
                placeholder="Ikaag an current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            {/* New Password * */}
            <div className="change-pass-field">
              <label htmlFor="modalNewPassword" className="change-pass-label">
                New Password <span className="change-pass-required">*</span>
              </label>
              <input
                id="modalNewPassword"
                type="password"
                className="change-pass-input"
                placeholder="Ikaag an bagong password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="change-pass-hint">Dai mababa sa 8 karakter.</p>
            </div>

            {/* Confirm New Password * */}
            <div className="change-pass-field">
              <label
                htmlFor="modalConfirmPassword"
                className="change-pass-label"
              >
                Confirm New Password{' '}
                <span className="change-pass-required">*</span>
              </label>
              <input
                id="modalConfirmPassword"
                type="password"
                className="change-pass-input"
                placeholder="Ikaag giraray an bagong password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Bottom Footer Action Bar */}
          <div className="change-pass-footer">
            <button type="submit" className="change-pass-submit-btn">
              I-update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
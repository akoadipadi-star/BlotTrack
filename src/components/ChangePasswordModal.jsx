import { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import './ChangePasswordModal.css';

const VALIDATION_TEXT = {
  bikol: {
    currentRequired: 'Kinakaipuhan an Current Password.',
    newRequired: 'Kinakaipuhan an New Password.',
    newMin: 'Dai mababa sa 8 karakter an New Password.',
    newMax: 'Dai malampas sa 128 karakter an New Password.',
    newSameAsCurrent:
      'An bagong password dapat iba sa saimong presenteng password.',
    confirmRequired: 'Pakikumpirma an saimong bagong password.',
    confirmMismatch: 'Dai magkapareho an New Password asin Confirm Password.',
    updating: 'Ina-update...',
    update: 'I-update',
  },
  en: {
    currentRequired: 'Current Password is required.',
    newRequired: 'New Password is required.',
    newMin: 'New Password must be at least 8 characters.',
    newMax: 'New Password must not exceed 128 characters.',
    newSameAsCurrent:
      'New password must be different from your current password.',
    confirmRequired: 'Please confirm your new password.',
    confirmMismatch: 'New Password and Confirm Password do not match.',
    updating: 'Updating...',
    update: 'Update',
  },
};

function ChangePasswordModal({
  isOpen,
  onClose,
  onUpdatePassword,
  language = 'bikol',
}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const msg = VALIDATION_TEXT[language === 'en' ? 'en' : 'bikol'];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const nextErrors = {};

    if (!currentPassword.trim()) {
      nextErrors.currentPassword = msg.currentRequired;
    }

    if (!newPassword) {
      nextErrors.newPassword = msg.newRequired;
    } else if (newPassword.length < 8) {
      nextErrors.newPassword = msg.newMin;
    } else if (newPassword.length > 128) {
      nextErrors.newPassword = msg.newMax;
    } else if (currentPassword && newPassword === currentPassword) {
      nextErrors.newPassword = msg.newSameAsCurrent;
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = msg.confirmRequired;
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = msg.confirmMismatch;
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

    if (onUpdatePassword) {
      onUpdatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="change-pass-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changePassModalTitle"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
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
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="change-pass-body">
            {/* Current Password * */}
            <div className="change-pass-field">
              <label htmlFor="modalCurrentPassword" className="change-pass-label">
                Current Password <span className="change-pass-required">*</span>
              </label>
              <input
                id="modalCurrentPassword"
                type="password"
                maxLength={128}
                className={`change-pass-input ${
                  errors.currentPassword ? 'is-invalid' : ''
                }`}
                placeholder="Ikaag an current password"
                aria-invalid={Boolean(errors.currentPassword)}
                aria-describedby={
                  errors.currentPassword ? 'modalCurrentPasswordError' : undefined
                }
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (errors.currentPassword || errors.newPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      currentPassword: undefined,
                      newPassword: undefined,
                    }));
                  }
                }}
              />
              {errors.currentPassword && (
                <p
                  id="modalCurrentPasswordError"
                  className="change-pass-error-text"
                  role="alert"
                >
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password * */}
            <div className="change-pass-field">
              <label htmlFor="modalNewPassword" className="change-pass-label">
                New Password <span className="change-pass-required">*</span>
              </label>
              <input
                id="modalNewPassword"
                type="password"
                maxLength={128}
                className={`change-pass-input ${
                  errors.newPassword ? 'is-invalid' : ''
                }`}
                placeholder="Ikaag an bagong password"
                aria-invalid={Boolean(errors.newPassword)}
                aria-describedby={
                  errors.newPassword
                    ? 'modalNewPasswordError'
                    : 'modalNewPasswordHint'
                }
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword || errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      newPassword: undefined,
                      confirmPassword: undefined,
                    }));
                  }
                }}
              />
              {errors.newPassword ? (
                <p
                  id="modalNewPasswordError"
                  className="change-pass-error-text"
                  role="alert"
                >
                  {errors.newPassword}
                </p>
              ) : (
                <p id="modalNewPasswordHint" className="change-pass-hint">
                  Dai mababa sa 8 karakter.
                </p>
              )}
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
                maxLength={128}
                className={`change-pass-input ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
                placeholder="Ikaag giraray an bagong password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? 'modalConfirmPasswordError' : undefined
                }
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }
                }}
              />
              {errors.confirmPassword && (
                <p
                  id="modalConfirmPasswordError"
                  className="change-pass-error-text"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Footer Action Bar */}
          <div className="change-pass-footer">
            <button
              type="submit"
              className="change-pass-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? msg.updating : msg.update}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
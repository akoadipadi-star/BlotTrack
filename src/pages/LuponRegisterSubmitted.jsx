import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, Copy, AlertCircle } from 'lucide-react';
import './LuponRegisterSubmitted.css';

function buildRequestCode(barangay, position) {
  if (!barangay && !position) return 'ABB-SEC-018';
  const cleanedBrgy = String(barangay || 'Abella')
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 3)
    .toUpperCase();
  const brgyCode = cleanedBrgy.length === 3 ? cleanedBrgy : 'ABB';

  const normalizedPos = String(position || '').toLowerCase();
  let posCode = 'SEC';
  if (normalizedPos.includes('chairman')) posCode = 'CHR';
  else if (normalizedPos.includes('pangkat')) posCode = 'PNG';
  else if (normalizedPos.includes('member')) posCode = 'MEM';

  return `${brgyCode}-${posCode}-018`;
}

function LuponRegisterSubmitted({ language = 'bikol' }) {
  const location = useLocation();
  const state = location.state || {};
  const [copied, setCopied] = useState(false);

  const hasValidRegistration =
    Boolean(state.registeredBarangay) &&
    Boolean(state.registeredFullName?.trim()) &&
    Boolean(state.registeredMobile?.trim()) &&
    Boolean(state.registeredPosition);

  const requestCode = buildRequestCode(
    state.registeredBarangay,
    state.registeredPosition
  );

  const content = {
    bikol: {
      directAccessWarning:
        'Mayo nin nahanap na aktibong rehistro. Nagpapahiling nin sample request number — mag-rehistro muna tanganing makakua nin opisyal na Request Number.',
      registerLink: 'Mag-rehistro',
      title: 'Naipasa na an rehistro',
      description:
        'Ire-rebyu kan Barangay Admin an saimong kahagadan para sa account. Mapadara kami nin SMS pag aprobada na an saimong access.',
      requestLabel: 'REQUEST NUMBER',
      copyLabel: copied ? 'Nakopya na!' : 'Kopyahon',
      backToLoginBtn: 'Magbalik sa login',
    },
    en: {
      directAccessWarning:
        'No active registration submission was found. Showing a sample request number — complete the registration form to receive an official Request Number.',
      registerLink: 'Register now',
      title: 'Registration submitted',
      description:
        'The Barangay Admin will review your account request. We will send an SMS once your access has been approved.',
      requestLabel: 'REQUEST NUMBER',
      copyLabel: copied ? 'Copied!' : 'Copy',
      backToLoginBtn: 'Back to login',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(requestCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="lupon-auth-page">
      {/* Subtle Concentric Blue Halo */}
      <div className="lupon-auth-halo" aria-hidden="true" />

      <section
        className="lupon-auth-card lupon-reg-success-card"
        aria-labelledby="regSuccessHeading"
      >
        {/* Direct-Navigation Fallback Notice */}
        {!hasValidRegistration && (
          <div className="lupon-reg-warning-banner" role="status">
            <AlertCircle size={15} strokeWidth={2.1} aria-hidden="true" />
            <span>
              {t.directAccessWarning}{' '}
              <Link to="/lupon-register" className="lupon-reg-warning-link">
                {t.registerLink}
              </Link>
            </span>
          </div>
        )}

        {/* Green Check Circle */}
        <div className="lupon-reg-success-circle" aria-hidden="true">
          <Check size={24} strokeWidth={2.8} />
        </div>

        <h1 id="regSuccessHeading" className="lupon-reg-success-title">
          {t.title}
        </h1>
        <p className="lupon-reg-success-desc">{t.description}</p>

        {/* Request Number Box */}
        <div className="lupon-request-box">
          <p className="lupon-request-label">{t.requestLabel}</p>
          <div className="lupon-request-code-row">
            <p className="lupon-request-code">{requestCode}</p>
            <button
              type="button"
              className="lupon-request-copy-btn"
              onClick={handleCopyCode}
              aria-label={`${t.copyLabel} ${requestCode}`}
            >
              <Copy size={13} strokeWidth={2.1} />
              <span>{t.copyLabel}</span>
            </button>
          </div>
        </div>

        {/* Back to Login Button */}
        <Link to="/lupon-login" className="lupon-primary-btn">
          {t.backToLoginBtn}
        </Link>
      </section>
    </main>
  );
}

export default LuponRegisterSubmitted;
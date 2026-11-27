import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import './LuponRegisterSubmitted.css';

function buildRequestCode(barangay, position) {
  if (!barangay && !position) return 'ABB-SEC-018';
  const brgyCode = (barangay || 'Abella')
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 3)
    .toUpperCase();

  let posCode = 'SEC';
  if (position?.toLowerCase().includes('chairman')) posCode = 'CHR';
  else if (position?.toLowerCase().includes('pangkat')) posCode = 'PNG';
  else if (position?.toLowerCase().includes('member')) posCode = 'MEM';

  return `${brgyCode}-${posCode}-018`;
}

function LuponRegisterSubmitted({ language = 'bikol' }) {
  const location = useLocation();
  const state = location.state || {};
  const requestCode = buildRequestCode(
    state.registeredBarangay,
    state.registeredPosition
  );

  const content = {
    bikol: {
      title: 'Naipasa na an rehistro',
      description:
        'Ire-rebyu kan Barangay Admin an saimong kahagadan para sa account. Mapadara kami nin SMS pag aprobada na an saimong access.',
      requestLabel: 'REQUEST NUMBER',
      backToLoginBtn: 'Magbalik sa login',
    },
    en: {
      title: 'Registration submitted',
      description:
        'The Barangay Admin will review your account request. We will send an SMS once your access has been approved.',
      requestLabel: 'REQUEST NUMBER',
      backToLoginBtn: 'Back to login',
    },
  };

  const t = content[language] || content.bikol;

  return (
    <main className="lupon-auth-page">
      {/* Subtle Concentric Blue Halo */}
      <div className="lupon-auth-halo" aria-hidden="true" />

      <section
        className="lupon-auth-card lupon-reg-success-card"
        aria-labelledby="regSuccessHeading"
      >
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
          <p className="lupon-request-code">{requestCode}</p>
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
import './BarangayIllustration.css';

function BarangayIllustration() {
  return (
    <div className="hero-illustration-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 420 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-illustration-svg"
      >
        {/* Soft Concentric Background Circles */}
        <circle cx="215" cy="170" r="158" fill="#E6EFFB" fillOpacity="0.65" />
        <circle cx="215" cy="170" r="118" fill="#DCE8F9" fillOpacity="0.8" />

        {/* Flagpole */}
        <line
          x1="196"
          y1="52"
          x2="196"
          y2="112"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Philippine Flag */}
        <g transform="translate(197, 54)">
          <rect width="34" height="10" fill="#1D4ED8" />
          <rect y="10" width="34" height="10" fill="#DC2626" />
          <polygon points="0,0 15,10 0,20" fill="#FFFFFF" />
          <circle cx="5.5" cy="10" r="2.2" fill="#F59E0B" />
        </g>

        {/* Barangay Hall Roof / Header */}
        <rect x="116" y="110" width="160" height="32" rx="4" fill="#173F7A" />
        <rect x="122" y="138" width="148" height="90" fill="#FFFFFF" />

        {/* Hall Signboard */}
        <rect
          x="132"
          y="146"
          width="128"
          height="16"
          rx="2"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <text
          x="196"
          y="157"
          textAnchor="middle"
          fill="#334155"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="0.4"
        >
          KATARUNGANG PAMBARANGAY
        </text>

        {/* Three Pillars / Windows */}
        <rect
          x="138"
          y="170"
          width="24"
          height="58"
          rx="2"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        <rect
          x="184"
          y="170"
          width="24"
          height="58"
          rx="2"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        <rect
          x="230"
          y="170"
          width="24"
          height="58"
          rx="2"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Building Base Step */}
        <rect x="112" y="228" width="168" height="6" rx="2" fill="#CBD5E1" />

        {/* Person 1 (Left - Tan/Gold) */}
        <g transform="translate(292, 168)">
          <circle cx="13" cy="11" r="8" fill="#1E293B" />
          <circle cx="13" cy="12" r="6.5" fill="#D99B66" />
          <path d="M13 5.5C9.5 5.5 7 8 7 11H19C19 8 16.5 5.5 13 5.5Z" fill="#1E293B" />
          <rect x="3" y="22" width="20" height="44" rx="8" fill="#C89D6C" />
        </g>

        {/* Person 2 (Center - Navy) */}
        <g transform="translate(324, 158)">
          <circle cx="14" cy="11" r="8.5" fill="#1E293B" />
          <circle cx="14" cy="12.5" r="7" fill="#C68652" />
          <path d="M14 5.5C10 5.5 7.5 8 7.5 11.5H20.5C20.5 8 18 5.5 14 5.5Z" fill="#1E293B" />
          <rect x="3" y="23" width="22" height="53" rx="9" fill="#173F7A" />
        </g>

        {/* Person 3 (Right - Slate Blue) */}
        <g transform="translate(358, 172)">
          <circle cx="12" cy="10" r="7.5" fill="#1E293B" />
          <circle cx="12" cy="11.5" r="6" fill="#D99B66" />
          <path d="M12 5.5C8.8 5.5 6.5 7.8 6.5 10.5H17.5C17.5 7.8 15.2 5.5 12 5.5Z" fill="#1E293B" />
          <rect x="3" y="20" width="18" height="42" rx="7" fill="#6488B4" />
        </g>
      </svg>
    </div>
  );
}

export default BarangayIllustration;
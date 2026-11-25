import { ShieldCheck, Clock, PhoneCall, MessageSquareWarning } from 'lucide-react';
import './Footer.css';

function Footer({ language, onOpenReportModal }) {
  const content = {
    bikol: {
      privacyTitle: 'Ligtas an data mo',
      privacySub: 'Naka-encrypt at maingat',
      availTitle: 'Available kahit kailan',
      availSub: 'Mag-report o mag-track nin kaso 24/7',
      helpTitle: 'Kaipuhan nin Tabang?',
      helpSub: 'Maaaring bumisita sa barangay sa Lunes–Sabado, 8AM–5PM',
      reportBtn: 'I-report kun igwang problema',
    },
    en: {
      privacyTitle: 'Your data is safe',
      privacySub: 'Encrypted and securely handled',
      availTitle: 'Available anytime',
      availSub: 'Report or track a case 24/7',
      helpTitle: 'Need Assistance?',
      helpSub: 'You may visit the barangay hall Monday–Saturday, 8AM–5PM',
      reportBtn: 'Report a problem',
    },
  };

  const t = content[language] || content.bikol;

  return (
    <footer className="site-footer">
      <div className="footer-info-bar">
        <div className="container footer-grid">
          <div className="footer-item">
            <div className="footer-icon">
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="footer-item-title">{t.privacyTitle}</h4>
              <p className="footer-item-sub">{t.privacySub}</p>
            </div>
          </div>

          <div className="footer-item">
            <div className="footer-icon">
              <Clock size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="footer-item-title">{t.availTitle}</h4>
              <p className="footer-item-sub">{t.availSub}</p>
            </div>
          </div>

          <div className="footer-item">
            <div className="footer-icon">
              <PhoneCall size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="footer-item-title">{t.helpTitle}</h4>
              <p className="footer-item-sub">{t.helpSub}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <button
            type="button"
            className="report-problem-btn"
            onClick={onOpenReportModal}
          >
            <MessageSquareWarning size={16} strokeWidth={2} />
            <span>{t.reportBtn}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
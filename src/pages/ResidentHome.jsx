import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import BarangayIllustration from '../components/BarangayIllustration';
import './ResidentHome.css';

function ResidentHome({ language }) {
  const content = {
    bikol: {
      badge: 'LIGTAS • SIMPLE • SERBISYONG MAAASAHAN',
      titleLine1: 'Hustisya sa barangay,',
      titleLine2: 'mas pinadali na!',
      subtitle:
        'Magpa-blotter, mag-file nin reklamo, o hilingon an estado kan saimong kaso igdi sa Naga.',
      privacyNote:
        'Libre asin kumpidensyal. An saimong impormasyon ay protektado kan Data Privacy Act.',
      sectionHeading: 'Paano mi kamo matabangan?',
      sectionSub: 'Pumili nin opsyon para magpoon.',
      card1Title: 'Mag-file nin Reklamo / Magpa-Blotter',
      card1Desc: 'Pumili nin insidente o KP mediation asin isumite nang ligtas.',
      card1Action: 'Magpoon',
      card2Title: 'Mag-track nin Kaso',
      card2Desc: 'Hilingon an updates, schedule nin hearing, asin progreso.',
      card2Action: 'Mag-track nin Kaso',
    },
    en: {
      badge: 'SAFE • SIMPLE • RELIABLE SERVICE',
      titleLine1: 'Barangay justice,',
      titleLine2: 'made simpler!',
      subtitle:
        'File a blotter report, submit a complaint, or check the status of your case here in Naga.',
      privacyNote:
        'Free and confidential. Your information is protected under the Data Privacy Act.',
      sectionHeading: 'How can we help you?',
      sectionSub: 'Choose an option to get started.',
      card1Title: 'File a Complaint / Blotter',
      card1Desc: 'Select an incident or KP mediation and submit securely.',
      card1Action: 'Get Started',
      card2Title: 'Track a Case',
      card2Desc: 'View updates, hearing schedules, and case progress.',
      card2Action: 'Track a Case',
    },
  };

  const t = content[language] || content.bikol;

  return (
    <main className="resident-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <ShieldCheck size={14} strokeWidth={2.2} />
              <span>{t.badge}</span>
            </div>

            <h1 className="hero-title">
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h1>

            <p className="hero-subtitle">{t.subtitle}</p>

            <div className="hero-privacy">
              <CheckCircle2 size={15} className="hero-privacy-icon" />
              <span>{t.privacyNote}</span>
            </div>
          </div>

          <div className="hero-visual">
            <BarangayIllustration />
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="actions-section">
        <div className="container">
          <div className="actions-header">
            <h2 className="actions-title">{t.sectionHeading}</h2>
            <p className="actions-subtitle">{t.sectionSub}</p>
          </div>

          <div className="actions-grid">
            {/* Primary Navy Card */}
            <Link to="/file-complaint" className="action-card action-card--primary">
              <div className="action-card-body">
                <h3 className="action-card-title">{t.card1Title}</h3>
                <p className="action-card-desc">{t.card1Desc}</p>
              </div>
              <div className="action-card-cta">
                <span>{t.card1Action}</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </div>
            </Link>

            {/* Secondary White Card */}
            <Link to="/track-case" className="action-card action-card--secondary">
              <div className="action-card-body">
                <h3 className="action-card-title">{t.card2Title}</h3>
                <p className="action-card-desc">{t.card2Desc}</p>
              </div>
              <div className="action-card-cta">
                <span>{t.card2Action}</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResidentHome;
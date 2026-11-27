import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Clock, Home } from 'lucide-react';
import './TrackCaseResult.css';

function TrackCaseResult({ language = 'bikol' }) {
  const location = useLocation();
  const caseNumber = location.state?.caseNumber || '2026-011-001';
  const barangay = location.state?.barangay || 'Abella';

  const [smsAlertsOn, setSmsAlertsOn] = useState(true);

  const content = {
    bikol: {
      back: 'Magbalik',
      pageTitle: 'Mag-track nin Report o Kaso',
      pageSubtitle: 'Siguraduhon na an saimong kaso sana an i-track.',
      statusBadge: 'IN MEDIATION',
      caseCategory: 'Collection Sum of Money',
      smsAlertsLabel: smsAlertsOn ? 'SMS alerts: On' : 'SMS alerts: Off',
      progressHeading: 'Progreso kan Kaso',
      steps: [
        {
          title: 'Naresibe an reklamo',
          subtitle: 'Nobyembre 1, 2026',
          status: 'completed',
        },
        {
          title: 'Sinuri kan Sekretary',
          subtitle: 'Nobyembre 2, 2026',
          status: 'completed',
        },
        {
          title: 'Enot na summon',
          subtitle: 'Nobyembre 6, 2026',
          status: 'completed',
        },
        {
          title: 'Pag-oolay nin Kasunduan',
          subtitle: 'Nobyembre 8, 2026 • 9:00 AM',
          status: 'active',
        },
        {
          title: 'Resolusyon',
          subtitle: 'Pending',
          status: 'pending',
        },
      ],
      nextHearingLabel: 'SUNOD NA HEARING',
      hearingDay: '08',
      hearingMonth: 'NOV',
      hearingYear: '2026',
      hearingTitle: 'Enot na Pag-oolay',
      hearingTime: '9:00 AM – 10:00 AM',
      hearingVenue: `${barangay}- Barangay Hall, Lupon Office`,
      reminderText:
        'Mag-abot nin 15 minutos antes asin magdara nin sarong valid ID.',
    },
    en: {
      back: 'Back',
      pageTitle: 'Track a Report or Case',
      pageSubtitle: 'Make sure you only track your own case.',
      statusBadge: 'IN MEDIATION',
      caseCategory: 'Collection Sum of Money',
      smsAlertsLabel: smsAlertsOn ? 'SMS alerts: On' : 'SMS alerts: Off',
      progressHeading: 'Case Progress',
      steps: [
        {
          title: 'Complaint received',
          subtitle: 'November 1, 2026',
          status: 'completed',
        },
        {
          title: 'Reviewed by Secretary',
          subtitle: 'November 2, 2026',
          status: 'completed',
        },
        {
          title: 'First summons issued',
          subtitle: 'November 6, 2026',
          status: 'completed',
        },
        {
          title: 'Mediation Conference',
          subtitle: 'November 8, 2026 • 9:00 AM',
          status: 'active',
        },
        {
          title: 'Resolution',
          subtitle: 'Pending',
          status: 'pending',
        },
      ],
      nextHearingLabel: 'NEXT HEARING',
      hearingDay: '08',
      hearingMonth: 'NOV',
      hearingYear: '2026',
      hearingTitle: 'First Mediation Session',
      hearingTime: '9:00 AM – 10:00 AM',
      hearingVenue: `${barangay}- Barangay Hall, Lupon Office`,
      reminderText:
        'Arrive 15 minutes early and bring one valid ID.',
    },
  };

  const t = content[language] || content.bikol;

  return (
    <main className="track-result-page">
      <div className="track-result-container">
        {/* Top Back Link */}
        <div className="track-result-back-row">
          <Link to="/track-case" className="track-result-back-link">
            <ArrowLeft size={15} strokeWidth={2.2} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Centered Page Header */}
        <header className="track-result-header">
          <h1 className="track-result-title">{t.pageTitle}</h1>
          <p className="track-result-subtitle">{t.pageSubtitle}</p>
        </header>

        {/* Top Case Summary Banner Card */}
        <section className="case-summary-card" aria-label="Case Summary">
          <div className="case-summary-left">
            <span className="case-status-pill">{t.statusBadge}</span>
            <h2 className="case-number-heading">{caseNumber}</h2>
            <p className="case-category-text">{t.caseCategory}</p>
          </div>

          <button
            type="button"
            className="sms-alerts-btn"
            aria-pressed={smsAlertsOn}
            onClick={() => setSmsAlertsOn((prev) => !prev)}
          >
            <Bell size={15} strokeWidth={2} />
            <span>{t.smsAlertsLabel}</span>
          </button>
        </section>

        {/* Bottom Two-Column Cards */}
        <div className="track-result-grid">
          {/* Left Card: Case Progress Timeline */}
          <section className="progress-card" aria-label={t.progressHeading}>
            <h3 className="progress-card-heading">{t.progressHeading}</h3>

            <ol className="case-timeline">
              {t.steps.map((step, idx) => {
                const isLast = idx === t.steps.length - 1;

                return (
                  <li
                    key={step.title}
                    className={`timeline-item is-${step.status}`}
                  >
                    <div className="timeline-marker-col">
                      <div className="timeline-dot">
                        {step.status === 'completed' && (
                          <Check size={12} strokeWidth={2.8} />
                        )}
                        {step.status === 'active' && (
                          <span className="timeline-dot-inner" />
                        )}
                      </div>
                      {!isLast && <div className="timeline-connector" />}
                    </div>

                    <div className="timeline-content">
                      <p className="timeline-title">{step.title}</p>
                      <p className="timeline-subtitle">{step.subtitle}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Right Card: Next Hearing */}
          <aside className="hearing-card" aria-label={t.nextHearingLabel}>
            <p className="hearing-eyebrow">{t.nextHearingLabel}</p>

            <div className="hearing-date-row">
              <span className="hearing-day">{t.hearingDay}</span>
              <div className="hearing-month-year">
                <span>{t.hearingMonth}</span>
                <span>{t.hearingYear}</span>
              </div>
            </div>

            <h3 className="hearing-session-title">{t.hearingTitle}</h3>

            <ul className="hearing-meta-list">
              <li className="hearing-meta-item">
                <Clock size={14} strokeWidth={2} />
                <span>{t.hearingTime}</span>
              </li>
              <li className="hearing-meta-item">
                <Home size={14} strokeWidth={2} />
                <span>{t.hearingVenue}</span>
              </li>
            </ul>

            <div className="hearing-reminder-box">
              <p>{t.reminderText}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default TrackCaseResult;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  FileText,
  Clock,
  Calendar,
  Shield,
  ArrowRight,
  ChevronRight,
  Home,
  Check,
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import NewCaseModal from '../components/NewCaseModal';
import './LuponDashboard.css';

const VALID_BARANGAYS = [
  'Abella',
  'Bagumbayan Norte',
  'Bagumbayan Sur',
  'Balatas',
  'Calauag',
  'Cararayan',
  'Carolina',
  'Concepcion Grande',
  'Concepcion Pequeña',
  'Dayangdang',
  'Del Rosario',
  'Dinaga',
  'Igualdad Interior',
  'Lerma',
  'Liboton',
  'Mabolo',
  'Pacol',
  'Panicuason',
  'Peñafrancia',
  'Sabang',
  'San Felipe',
  'San Francisco',
  'San Isidro',
  'Santa Cruz',
  'Tabuco',
  'Tinago',
  'Triangulo',
];

function LuponDashboard({ language = 'bikol', onLanguageChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const rawBarangay = location.state?.barangay;
  const barangay = VALID_BARANGAYS.includes(rawBarangay)
    ? rawBarangay
    : 'Abella';

  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [reportBanner, setReportBanner] = useState('');

  const content = {
    bikol: {
      eyebrow: 'MARTES, NOBYEMBRE 3, 2026',
      greeting: 'Marhay na aga, Secretary Maria',
      subtitle: 'Ini an kaipuhan nin atensyon mo ngunyan.',
      encodeBtn: 'Mag-encode nin bagong kaso',
      statsAria: 'Estadistika kan kaso',
      kpiCards: [
        {
          id: 'new',
          value: '12',
          title: 'Bagong sumite nin kaso',
          subtitle: '+4 puon kasuudma',
          icon: FileText,
          tone: 'blue',
        },
        {
          id: 'review',
          value: '5',
          title: 'Nakatakdang rebyuhon',
          subtitle: 'Kaipuhan gibuhon',
          icon: Clock,
          tone: 'amber',
        },
        {
          id: 'pending-hearing',
          value: '2',
          title: 'Nakabinbin na Pagdangog',
          subtitle: 'Sunod sa alas-9:00 nin aga',
          icon: Calendar,
          tone: 'blue',
        },
        {
          id: 'active',
          value: '23',
          title: 'Aktibong Kaso',
          subtitle: '3 harani na an due date',
          icon: Shield,
          tone: 'blue',
        },
      ],
      attentionHeading: 'Kaipuhan nin atensyon',
      attentionSub: 'Naka-priority base sa deadline',
      allCasesLink: 'Lahat na kaso',
      attentionItems: [
        {
          caseId: '2026-011-001',
          parties: 'Juan Dela Cruz vs. Pedro Santos',
          nature: 'Property Boundary Dispute',
          title: 'I-rebyu an isinumiter',
          meta: '2026-011-001 • Juan Dela Cruz vs. Pedro Santos',
          badge: 'Due today',
          icon: Clock,
          tone: 'peach',
        },
        {
          caseId: '2026-010-001',
          parties: 'Mario Reyes vs. Unknown Respondent',
          nature: 'Missing Item',
          title: 'Kumpletuhon an pagpatunay kan kaso',
          meta: '2026-010-001 • Mario Reyes • Missing Item',
          badge: '1 day left',
          icon: Clock,
          tone: 'amber',
        },
        {
          caseId: '2026-010-002',
          parties: 'Roberto Cruz vs. Daniel Go',
          nature: 'Collection Sum of Money',
          title: 'I-prepare an Amicable Settlement',
          meta: '2026-010-002 • Roberto Cruz vs. Daniel Go',
          badge: '9:00 AM',
          icon: Calendar,
          tone: 'amber',
        },
      ],
      scheduleHeading: 'Schedule ngunyan',
      scheduleSub: 'Martes, Nobyembre 3',
      calendarLink: 'Kalendaryo',
      scheduleItems: [
        {
          time: '9:00',
          meridiem: 'AM',
          title: 'Enot na Mediation Hearing',
          location: '2026-011-001 • Lupon Office',
          parties: 'Juan Dela Cruz vs. Pedro Santos',
        },
        {
          time: '1:30',
          meridiem: 'PM',
          title: 'Conciliation Meeting',
          location: '2026-010-003 • Conference Room',
          parties: 'Rosa Lim vs. Ernesto Tan',
        },
        {
          time: '3:00',
          meridiem: 'PM',
          title: 'Settlement Signing',
          location: "2026-010-002 • Secretary's Office",
          parties: 'Roberto Cruz vs. Daniel Go',
        },
      ],
      actionsHeading: 'Mga aksyon',
      actionsSub: 'Mga parating gibuhon kan Secretary',
      actionNewTitle: 'Bagong Case Record',
      actionNewSub: 'I-encode an bagong detalye kan kaso',
      actionScheduleTitle: 'Mag-skedyul nin Hearing',
      actionScheduleSub: 'Magpili nin bakanteng oras',
      actionReportTitle: 'Mag-generate nin Report',
      actionReportSub: 'Monthly KP summary',
      summaryHeading: 'Buod nin mga Reklamo',
      summarySub: 'Mga kaso kaining bulan',
      fullReportLink: 'Full report',
      topZoneEyebrow: 'PINAKAMATAAS NA ZONE',
      topZoneName: 'Zone 4',
      topZoneMeta: '18 cases • 29% of total',
      complaintTitlesLabel: 'Complaint Titles',
      complaintTotalLabel: '63 total',
      casesSuffix: 'cases',
      reportGeneratedNotice:
        'Nai-generate na an Monthly KP Summary Report para sa Barangay ' +
        barangay +
        ' (Nobyembre 2026).',
    },
    en: {
      eyebrow: 'TUESDAY, NOVEMBER 3, 2026',
      greeting: 'Good morning, Secretary Maria',
      subtitle: 'Here is what needs your attention today.',
      encodeBtn: 'Encode new case',
      statsAria: 'Case statistics',
      kpiCards: [
        {
          id: 'new',
          value: '12',
          title: 'New case submissions',
          subtitle: '+4 since yesterday',
          icon: FileText,
          tone: 'blue',
        },
        {
          id: 'review',
          value: '5',
          title: 'Scheduled for review',
          subtitle: 'Action needed',
          icon: Clock,
          tone: 'amber',
        },
        {
          id: 'pending-hearing',
          value: '2',
          title: 'Pending Hearings',
          subtitle: 'Next at 9:00 AM',
          icon: Calendar,
          tone: 'blue',
        },
        {
          id: 'active',
          value: '23',
          title: 'Active Cases',
          subtitle: '3 nearing deadline',
          icon: Shield,
          tone: 'blue',
        },
      ],
      attentionHeading: 'Needs attention',
      attentionSub: 'Prioritized by deadline',
      allCasesLink: 'All cases',
      attentionItems: [
        {
          caseId: '2026-011-001',
          parties: 'Juan Dela Cruz vs. Pedro Santos',
          nature: 'Property Boundary Dispute',
          title: 'Review new submission',
          meta: '2026-011-001 • Juan Dela Cruz vs. Pedro Santos',
          badge: 'Due today',
          icon: Clock,
          tone: 'peach',
        },
        {
          caseId: '2026-010-001',
          parties: 'Mario Reyes vs. Unknown Respondent',
          nature: 'Missing Item',
          title: 'Complete case verification',
          meta: '2026-010-001 • Mario Reyes • Missing Item',
          badge: '1 day left',
          icon: Clock,
          tone: 'amber',
        },
        {
          caseId: '2026-010-002',
          parties: 'Roberto Cruz vs. Daniel Go',
          nature: 'Collection Sum of Money',
          title: 'Prepare Amicable Settlement',
          meta: '2026-010-002 • Roberto Cruz vs. Daniel Go',
          badge: '9:00 AM',
          icon: Calendar,
          tone: 'amber',
        },
      ],
      scheduleHeading: "Today's schedule",
      scheduleSub: 'Tuesday, November 3',
      calendarLink: 'Calendar',
      scheduleItems: [
        {
          time: '9:00',
          meridiem: 'AM',
          title: 'First Mediation Hearing',
          location: '2026-011-001 • Lupon Office',
          parties: 'Juan Dela Cruz vs. Pedro Santos',
        },
        {
          time: '1:30',
          meridiem: 'PM',
          title: 'Conciliation Meeting',
          location: '2026-010-003 • Conference Room',
          parties: 'Rosa Lim vs. Ernesto Tan',
        },
        {
          time: '3:00',
          meridiem: 'PM',
          title: 'Settlement Signing',
          location: "2026-010-002 • Secretary's Office",
          parties: 'Roberto Cruz vs. Daniel Go',
        },
      ],
      actionsHeading: 'Quick actions',
      actionsSub: 'Frequent Secretary tasks',
      actionNewTitle: 'New Case Record',
      actionNewSub: 'Encode new case details',
      actionScheduleTitle: 'Schedule a Hearing',
      actionScheduleSub: 'Pick an available slot',
      actionReportTitle: 'Generate Report',
      actionReportSub: 'Monthly KP summary',
      summaryHeading: 'Complaint Summary',
      summarySub: 'Cases this month',
      fullReportLink: 'Full report',
      topZoneEyebrow: 'HIGHEST INCIDENT ZONE',
      topZoneName: 'Zone 4',
      topZoneMeta: '18 cases • 29% of total',
      complaintTitlesLabel: 'Complaint Titles',
      complaintTotalLabel: '63 total',
      casesSuffix: 'cases',
      reportGeneratedNotice:
        'Monthly KP Summary Report generated for Barangay ' +
        barangay +
        ' (November 2026).',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const complaintSummaryBars = [
    { label: 'Collection Sum of Money', count: 21, percent: 76 },
    { label: 'Property Boundary', count: 16, percent: 60 },
    { label: 'Unjust Vexation', count: 14, percent: 52 },
    { label: 'Noise / Nuisance', count: 12, percent: 44 },
  ];

  const handleCreateCase = (newRecord) => {
    navigate('/lupon-cases', { state: { createdCase: newRecord } });
  };

  const handleGenerateMonthlyReport = () => {
    setReportBanner(t.reportGeneratedNotice);
    setTimeout(() => {
      setReportBanner((prev) =>
        prev === t.reportGeneratedNotice ? '' : prev
      );
    }, 3500);
  };

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      barangay={barangay}
    >
      <div className="dashboard-container">
        {/* Greeting Header + Primary Action Button */}
        <div className="dashboard-header-row">
          <div>
            <p className="dashboard-date-eyebrow">{t.eyebrow}</p>
            <h1 className="dashboard-greeting">{t.greeting}</h1>
            <p className="dashboard-subtitle">{t.subtitle}</p>
          </div>

          <button
            type="button"
            className="dashboard-encode-btn"
            onClick={() => setIsNewCaseOpen(true)}
          >
            <Plus size={16} strokeWidth={2.4} />
            <span>{t.encodeBtn}</span>
          </button>
        </div>

        {/* Report Generation Feedback Toast */}
        {reportBanner && (
          <div
            className="dashboard-feedback-banner"
            role="status"
            aria-live="polite"
          >
            <Check size={15} strokeWidth={2.4} aria-hidden="true" />
            <span>{reportBanner}</span>
          </div>
        )}

        {/* 4-Column KPI Stat Cards */}
        <section className="dashboard-kpi-grid" aria-label={t.statsAria}>
          {t.kpiCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div key={card.id} className="kpi-card">
                <div className={`kpi-icon-box is-${card.tone}`}>
                  <IconComponent size={18} strokeWidth={2} />
                </div>
                <span className="kpi-value">{card.value}</span>
                <div className="kpi-labels">
                  <p className="kpi-title">{card.title}</p>
                  <p className="kpi-sub">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Middle Two-Column Section: Kaipuhan nin atensyon + Schedule ngunyan */}
        <div className="dashboard-two-col">
          {/* Left: Kaipuhan nin atensyon */}
          <section className="dash-panel" aria-labelledby="attentionHeading">
            <div className="dash-panel-header">
              <div>
                <h2 id="attentionHeading" className="dash-panel-title">
                  {t.attentionHeading}
                </h2>
                <p className="dash-panel-sub">{t.attentionSub}</p>
              </div>
              <Link to="/lupon-cases" className="dash-panel-link">
                <span>{t.allCasesLink}</span>
                <ArrowRight size={13} strokeWidth={2.3} />
              </Link>
            </div>

            <div className="attention-list">
              {t.attentionItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.caseId}
                    to={`/lupon-cases/${item.caseId}`}
                    state={{
                      caseItem: {
                        id: item.caseId,
                        parties: item.parties,
                        nature: item.nature,
                      },
                    }}
                    className="attention-row"
                  >
                    <div className="attention-row-left">
                      <div className={`attention-icon is-${item.tone}`}>
                        <IconComponent size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="attention-title">{item.title}</p>
                        <p className="attention-meta">{item.meta}</p>
                      </div>
                    </div>

                    <div className="attention-row-right">
                      <span className="attention-badge">{item.badge}</span>
                      <ChevronRight
                        size={15}
                        strokeWidth={2}
                        className="attention-chevron"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Right: Schedule ngunyan */}
          <section className="dash-panel" aria-labelledby="scheduleHeading">
            <div className="dash-panel-header">
              <div>
                <h2 id="scheduleHeading" className="dash-panel-title">
                  {t.scheduleHeading}
                </h2>
                <p className="dash-panel-sub">{t.scheduleSub}</p>
              </div>
              <Link to="/lupon-hearings" className="dash-panel-link">
                <span>{t.calendarLink}</span>
                <ArrowRight size={13} strokeWidth={2.3} />
              </Link>
            </div>

            <div className="schedule-list">
              {t.scheduleItems.map((slot) => (
                <div key={slot.time} className="schedule-row">
                  <div className="schedule-time-col">
                    <span className="schedule-time">{slot.time}</span>
                    <span className="schedule-meridiem">{slot.meridiem}</span>
                  </div>
                  <div className="schedule-info">
                    <p className="schedule-title">{slot.title}</p>
                    <p className="schedule-meta">{slot.location}</p>
                    <p className="schedule-meta">{slot.parties}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Two-Column Section: Mga aksyon + Buod nin mga Reklamo */}
        <div className="dashboard-two-col dashboard-two-col--bottom">
          {/* Left: Mga aksyon */}
          <section className="dash-panel" aria-labelledby="actionsHeading">
            <div className="dash-panel-header">
              <div>
                <h2 id="actionsHeading" className="dash-panel-title">
                  {t.actionsHeading}
                </h2>
                <p className="dash-panel-sub">{t.actionsSub}</p>
              </div>
            </div>

            <div className="quick-actions-grid">
              <button
                type="button"
                className="quick-action-card"
                onClick={() => setIsNewCaseOpen(true)}
              >
                <div className="quick-action-icon">
                  <Plus size={16} strokeWidth={2.2} />
                </div>
                <p className="quick-action-title">{t.actionNewTitle}</p>
                <p className="quick-action-sub">{t.actionNewSub}</p>
              </button>

              <Link to="/lupon-hearings" className="quick-action-card">
                <div className="quick-action-icon">
                  <Calendar size={16} strokeWidth={2} />
                </div>
                <p className="quick-action-title">{t.actionScheduleTitle}</p>
                <p className="quick-action-sub">{t.actionScheduleSub}</p>
              </Link>

              <button
                type="button"
                className="quick-action-card"
                onClick={handleGenerateMonthlyReport}
              >
                <div className="quick-action-icon">
                  <FileText size={16} strokeWidth={2} />
                </div>
                <p className="quick-action-title">{t.actionReportTitle}</p>
                <p className="quick-action-sub">{t.actionReportSub}</p>
              </button>
            </div>
          </section>

          {/* Right: Buod nin mga Reklamo */}
          <section className="dash-panel" aria-labelledby="summaryHeading">
            <div className="dash-panel-header">
              <div>
                <h2 id="summaryHeading" className="dash-panel-title">
                  {t.summaryHeading}
                </h2>
                <p className="dash-panel-sub">{t.summarySub}</p>
              </div>
              <Link to="/lupon-cases" className="dash-panel-link">
                <span>{t.fullReportLink}</span>
                <ArrowRight size={13} strokeWidth={2.3} />
              </Link>
            </div>

            {/* Highlighted Top Zone Box */}
            <div className="top-zone-card">
              <div className="top-zone-left">
                <div className="top-zone-icon" aria-hidden="true">
                  <Home size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="top-zone-eyebrow">{t.topZoneEyebrow}</p>
                  <p className="top-zone-name">{t.topZoneName}</p>
                  <p className="top-zone-meta">{t.topZoneMeta}</p>
                </div>
              </div>
              <span className="top-zone-pill">+12%</span>
            </div>

            {/* Complaint Titles Progress List */}
            <div className="complaint-bars-section">
              <div className="complaint-bars-header">
                <span className="complaint-bars-title">
                  {t.complaintTitlesLabel}
                </span>
                <span className="complaint-bars-total">
                  {t.complaintTotalLabel}
                </span>
              </div>

              <div className="complaint-bars-list">
                {complaintSummaryBars.map((bar) => (
                  <div key={bar.label} className="complaint-bar-row">
                    <span className="complaint-bar-label">{bar.label}</span>
                    <span className="complaint-bar-count">
                      {bar.count} {t.casesSuffix}
                    </span>
                    <div className="complaint-bar-track">
                      <div
                        className="complaint-bar-fill"
                        style={{ width: `${bar.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add New Case Record Modal */}
      <NewCaseModal
        isOpen={isNewCaseOpen}
        onClose={() => setIsNewCaseOpen(false)}
        onSubmitCase={handleCreateCase}
        language={language}
      />
    </LuponLayout>
  );
}

export default LuponDashboard;
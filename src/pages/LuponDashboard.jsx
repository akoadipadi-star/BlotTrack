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
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import NewCaseModal from '../components/NewCaseModal';
import './LuponDashboard.css';

function LuponDashboard({ language = 'bikol', onLanguageChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const barangay = location.state?.barangay || 'Abella';

  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  const kpiCards = [
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
  ];

  const attentionItems = [
    {
      title: 'I-rebyu an isinumiter',
      meta: '2026-011-001 • Juan Dela Cruz vs. Pedro Santos',
      badge: 'Due today',
      icon: Clock,
      tone: 'peach',
    },
    {
      title: 'Kumpletuhon an pagpatunay kan kaso',
      meta: '2026-010-001 • Mario Reyes • Missing Item',
      badge: '1 day left',
      icon: Clock,
      tone: 'amber',
    },
    {
      title: 'I-prepare an Amicable Settlement',
      meta: '2026-010-002 • Roberto Cruz vs. Daniel Go',
      badge: '9:00 AM',
      icon: Calendar,
      tone: 'amber',
    },
  ];

  const scheduleItems = [
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
  ];

  const complaintSummaryBars = [
    { label: 'Collection Sum of Money', count: 21, percent: 76 },
    { label: 'Property Boundary', count: 16, percent: 60 },
    { label: 'Unjust Vexation', count: 14, percent: 52 },
    { label: 'Noise / Nuisance', count: 12, percent: 44 },
  ];

  const handleCreateCase = (newRecord) => {
    navigate('/lupon-cases', { state: { createdCase: newRecord } });
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
            <p className="dashboard-date-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
            <h1 className="dashboard-greeting">
              Marhay na aga, Secretary Maria
            </h1>
            <p className="dashboard-subtitle">
              Ini an kaipuhan nin atensyon mo ngunyan.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-encode-btn"
            onClick={() => setIsNewCaseOpen(true)}
          >
            <Plus size={16} strokeWidth={2.4} />
            <span>Mag-encode nin bagong kaso</span>
          </button>
        </div>

        {/* 4-Column KPI Stat Cards */}
        <section className="dashboard-kpi-grid" aria-label="Case statistics">
          {kpiCards.map((card) => {
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
                  Kaipuhan nin atensyon
                </h2>
                <p className="dash-panel-sub">Naka-priority base sa deadline</p>
              </div>
              <Link to="/lupon-cases" className="dash-panel-link">
                <span>Lahat na kaso</span>
                <ArrowRight size={13} strokeWidth={2.3} />
              </Link>
            </div>

            <div className="attention-list">
              {attentionItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    to="/lupon-cases"
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
                  Schedule ngunyan
                </h2>
                <p className="dash-panel-sub">Martes, Nobyembre 3</p>
              </div>
              <Link to="/lupon-hearings" className="dash-panel-link">
                <span>Kalendaryo</span>
                <ArrowRight size={13} strokeWidth={2.3} />
              </Link>
            </div>

            <div className="schedule-list">
              {scheduleItems.map((slot) => (
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
                  Mga aksyon
                </h2>
                <p className="dash-panel-sub">
                  Mga parating gibuhon kan Secretary
                </p>
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
                <p className="quick-action-title">Bagong Case Record</p>
                <p className="quick-action-sub">
                  I-encode an bagong detalye kan kaso
                </p>
              </button>

              <Link to="/lupon-hearings" className="quick-action-card">
                <div className="quick-action-icon">
                  <Calendar size={16} strokeWidth={2} />
                </div>
                <p className="quick-action-title">Mag-skedyul nin Hearing</p>
                <p className="quick-action-sub">Magpili nin bakanteng oras</p>
              </Link>

              <Link to="/lupon-cases" className="quick-action-card">
                <div className="quick-action-icon">
                  <FileText size={16} strokeWidth={2} />
                </div>
                <p className="quick-action-title">Mag-generate nin Report</p>
                <p className="quick-action-sub">Monthly KP summary</p>
              </Link>
            </div>
          </section>

          {/* Right: Buod nin mga Reklamo */}
          <section className="dash-panel" aria-labelledby="summaryHeading">
            <div className="dash-panel-header">
              <div>
                <h2 id="summaryHeading" className="dash-panel-title">
                  Buod nin mga Reklamo
                </h2>
                <p className="dash-panel-sub">Mga kaso kaining bulan</p>
              </div>
              <Link to="/lupon-cases" className="dash-panel-link">
                <span>Full report</span>
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
                  <p className="top-zone-eyebrow">PINAKAMATAAS NA ZONE</p>
                  <p className="top-zone-name">Zone 4</p>
                  <p className="top-zone-meta">18 cases • 29% of total</p>
                </div>
              </div>
              <span className="top-zone-pill">+12%</span>
            </div>

            {/* Complaint Titles Progress List */}
            <div className="complaint-bars-section">
              <div className="complaint-bars-header">
                <span className="complaint-bars-title">Complaint Titles</span>
                <span className="complaint-bars-total">63 total</span>
              </div>

              <div className="complaint-bars-list">
                {complaintSummaryBars.map((bar) => (
                  <div key={bar.label} className="complaint-bar-row">
                    <span className="complaint-bar-label">{bar.label}</span>
                    <span className="complaint-bar-count">
                      {bar.count} cases
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
      />
    </LuponLayout>
  );
}

export default LuponDashboard;
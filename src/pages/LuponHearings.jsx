import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Clock,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  Users,
  Home,
  Check,
  MessageSquareText,
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import ScheduleHearingModal from '../components/ScheduleHearingModal';
import './LuponHearings.css';

const INITIAL_HEARINGS = [
  {
    id: '2026-010-028',
    time: '1:30 PM',
    duration: '60 MIN',
    stage: 'Extended Conciliation',
    stageTone: 'peach',
    dueBadge: '2 days left',
    isUrgent: true,
    parties: 'Jai  Santos vs. Ben Dela Peña',
    nature: 'Hangganan ng Lupa',
    mediators: 'Anita Flores, Mae Rayos, Janie Lupo',
    room: 'Lupon Room',
    noticeDelivered: true,
  },
  {
    id: '2026-010-029',
    time: '9:00 AM',
    duration: '60 MIN',
    stage: 'Mediation',
    stageTone: 'blue',
    dueBadge: null,
    isUrgent: false,
    parties: 'Rosa Mendoza vs. Carlo Reyes',
    nature: 'Utang',
    mediators: 'Hon. Ramon Luna',
    room: 'Lupon Room',
    noticeDelivered: false,
  },
  {
    id: '2026-010-030',
    time: '10:30 AM',
    duration: '60 MIN',
    stage: 'Arbitration',
    stageTone: 'amber',
    dueBadge: null,
    isUrgent: false,
    parties: 'Liza Ramos vs. Elena Cruz',
    nature: 'Away-Kapitbahay',
    mediators: 'Anita Flores, Mae Rayos, Janie Lupo',
    room: 'Lupon Room',
    noticeDelivered: false,
  },
];

const WEEK_PRESETS = [
  {
    rangeLabel: 'November 1–7, 2026',
    days: [
      { weekday: 'Mon', dayNum: '01' },
      { weekday: 'Tue', dayNum: '02' },
      { weekday: 'Wed', dayNum: '03' },
      { weekday: 'Thu', dayNum: '04' },
      { weekday: 'Fri', dayNum: '05' },
      { weekday: 'Sat', dayNum: '06' },
      { weekday: 'Sun', dayNum: '07' },
    ],
  },
  {
    rangeLabel: 'November 8–14, 2026',
    days: [
      { weekday: 'Mon', dayNum: '08' },
      { weekday: 'Tue', dayNum: '09' },
      { weekday: 'Wed', dayNum: '10' },
      { weekday: 'Thu', dayNum: '11' },
      { weekday: 'Fri', dayNum: '12' },
      { weekday: 'Sat', dayNum: '13' },
      { weekday: 'Sun', dayNum: '14' },
    ],
  },
  {
    rangeLabel: 'November 15–21, 2026',
    days: [
      { weekday: 'Mon', dayNum: '15' },
      { weekday: 'Tue', dayNum: '16' },
      { weekday: 'Wed', dayNum: '17' },
      { weekday: 'Thu', dayNum: '18' },
      { weekday: 'Fri', dayNum: '19' },
      { weekday: 'Sat', dayNum: '20' },
      { weekday: 'Sun', dayNum: '21' },
    ],
  },
  {
    rangeLabel: 'November 22–28, 2026',
    days: [
      { weekday: 'Mon', dayNum: '22' },
      { weekday: 'Tue', dayNum: '23' },
      { weekday: 'Wed', dayNum: '24' },
      { weekday: 'Thu', dayNum: '25' },
      { weekday: 'Fri', dayNum: '26' },
      { weekday: 'Sat', dayNum: '27' },
      { weekday: 'Sun', dayNum: '28' },
    ],
  },
];

const INITIAL_CALENDAR_EVENTS = [
  {
    id: '2026-011-001',
    dayNum: '03',
    time: '9:00 AM',
    line1: 'Juan Dela Cruz vs Pedro Santos',
    line2: 'Property Boundary Dispute',
    isUrgent: true,
  },
  {
    id: '2026-011-002',
    dayNum: '04',
    time: '9:00 AM',
    line1: 'Collection Sum of Money',
    line2: 'Rosa Mendoza vs. Carlo Reyes',
    isUrgent: false,
  },
  {
    id: '2026-011-003',
    dayNum: '04',
    time: '10:30 AM',
    line1: 'Unjust Vexation',
    line2: 'Liza Ramos vs. Elena Cruz',
    isUrgent: false,
  },
];

function LuponHearings({ language = 'bikol', onLanguageChange }) {
  const [hearings, setHearings] = useState(INITIAL_HEARINGS);
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_CALENDAR_EVENTS);
  const [viewMode, setViewMode] = useState('calendar');
  const [weekIndex, setWeekIndex] = useState(0);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [actionNotice, setActionNotice] = useState('');

  const content = {
    bikol: {
      reportBtn: 'Mag-report nin Problema sa System',
      eyebrowCalendar: 'MARTES, NOBYEMBRE 3, 2026',
      eyebrowList: 'KATARUNGANG PAMBARANGAY',
      pageTitle: 'Skedyul nin Pag-oolay',
      pageSubtitle: 'Ayuson an hearings, notices, asin deadlines kan kaso.',
      scheduleBtn: 'Mag-iskedyul nin Bagong Hearing',
      urgentBannerTitle: (count) =>
        `${count} ${count === 1 ? 'kaso' : 'kaso'} harani na sa 15-aldaw na limit`,
      urgentBannerSub: 'KP-2026-0129 is due in 2 days',
      showAll: 'Ipakita gabos',
      showUrgent: 'Show urgent →',
      calendarView: 'Kalendaryo',
      listView: 'Listahan',
      prevWeekLabel: 'Nakaaging semana',
      nextWeekLabel: 'Sunod na semana',
      urgentLegend: 'Urgent',
      dayName: 'MARTES',
      dayMonth: 'NOBYEMBRE 2026',
      scheduledCount: (count) => `${count} naka-iskedyul na hearing`,
      deliveredLabel: 'Naipadala • Delivered',
      sendReminderLabel: 'Magpadala ng SMS Reminder',
      printSummonsLabel: 'I-print / I-download ang Patawag',
      caseDetailsLabel: 'Detalye ng kaso',
      rescheduleLabel: 'Reschedule',
      emptyState: 'Mayo nin nakatalaan na hearing para sa piniling filter.',
      smsSentNotice: (id) => `Naipadara na an SMS reminder para sa kaso ${id}.`,
      summonsNotice: (id) =>
        `Andam na an printable Patawag (Summons) para sa kaso ${id}.`,
      scheduledSuccessNotice: (id) =>
        `Matrayumpong nai-iskedyul an hearing para sa kaso ${id}.`,
      rescheduledSuccessNotice: (id) =>
        `Na-update na an skedyul kan hearing para sa kaso ${id}.`,
    },
    en: {
      reportBtn: 'Report a System Problem',
      eyebrowCalendar: 'TUESDAY, NOVEMBER 3, 2026',
      eyebrowList: 'KATARUNGANG PAMBARANGAY',
      pageTitle: 'Mediation Schedule',
      pageSubtitle: 'Manage hearings, notices, and case deadlines.',
      scheduleBtn: 'Schedule New Hearing',
      urgentBannerTitle: (count) =>
        `${count} ${count === 1 ? 'case is' : 'cases are'} nearing the 15-day limit`,
      urgentBannerSub: 'KP-2026-0129 is due in 2 days',
      showAll: 'Show all',
      showUrgent: 'Show urgent →',
      calendarView: 'Calendar',
      listView: 'List',
      prevWeekLabel: 'Previous week',
      nextWeekLabel: 'Next week',
      urgentLegend: 'Urgent',
      dayName: 'TUESDAY',
      dayMonth: 'NOVEMBER 2026',
      scheduledCount: (count) => `${count} scheduled hearings`,
      deliveredLabel: 'Sent • Delivered',
      sendReminderLabel: 'Send SMS Reminder',
      printSummonsLabel: 'Print / Download Summons',
      caseDetailsLabel: 'Case details',
      rescheduleLabel: 'Reschedule',
      emptyState: 'No hearings scheduled for the selected filter.',
      smsSentNotice: (id) => `SMS reminder sent for case ${id}.`,
      summonsNotice: (id) => `Printable Summons prepared for case ${id}.`,
      scheduledSuccessNotice: (id) =>
        `Successfully scheduled hearing for case ${id}.`,
      rescheduledSuccessNotice: (id) =>
        `Hearing schedule updated for case ${id}.`,
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];
  const activeWeek = WEEK_PRESETS[weekIndex] || WEEK_PRESETS[0];

  const urgentCount = hearings.filter((h) => h.isUrgent).length;

  const displayedHearings = showUrgentOnly
    ? hearings.filter((h) => h.isUrgent)
    : hearings;

  const displayedCalendarEvents = showUrgentOnly
    ? calendarEvents.filter((ev) => ev.isUrgent)
    : calendarEvents;

  const triggerNotice = (message) => {
    setActionNotice(message);
    setTimeout(() => {
      setActionNotice((current) => (current === message ? '' : current));
    }, 3000);
  };

  const handleSendReminder = (id) => {
    setHearings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, noticeDelivered: true } : h))
    );
    triggerNotice(t.smsSentNotice(id));
  };

  const handlePrintSummons = (id) => {
    triggerNotice(t.summonsNotice(id));
  };

  const handleOpenNewSchedule = () => {
    setRescheduleTarget(null);
    setIsScheduleOpen(true);
  };

  const handleOpenReschedule = (hearingItem) => {
    setRescheduleTarget(hearingItem);
    setIsScheduleOpen(true);
  };

  const handleConfirmSchedule = (updatedHearing, isReschedule) => {
    if (isReschedule) {
      setHearings((prev) =>
        prev.map((item) =>
          item.id === updatedHearing.id ? { ...item, ...updatedHearing } : item
        )
      );
      triggerNotice(t.rescheduledSuccessNotice(updatedHearing.id));
    } else {
      const targetDayNum =
        updatedHearing.date?.slice(-2) || activeWeek.days[4].dayNum;
      setHearings((prev) => [...prev, updatedHearing]);
      setCalendarEvents((prev) => [
        ...prev,
        {
          id: updatedHearing.id,
          dayNum: targetDayNum,
          time: updatedHearing.time,
          line1: updatedHearing.stage,
          line2: updatedHearing.parties,
          isUrgent: false,
        },
      ]);
      triggerNotice(t.scheduledSuccessNotice(updatedHearing.id));
    }
  };

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={t.reportBtn}
    >
      <div className="hearings-container">
        {/* Top Eyebrow, Heading & Primary CTA */}
        <div className="hearings-header-row">
          <div>
            <p className="hearings-eyebrow">
              {viewMode === 'calendar' ? t.eyebrowCalendar : t.eyebrowList}
            </p>
            <h1 className="hearings-title">{t.pageTitle}</h1>
            <p className="hearings-subtitle">{t.pageSubtitle}</p>
          </div>

          <button
            type="button"
            className="hearings-schedule-btn"
            onClick={handleOpenNewSchedule}
          >
            <Plus size={16} strokeWidth={2.4} />
            <span>{t.scheduleBtn}</span>
          </button>
        </div>

        {/* Action Feedback Toast */}
        {actionNotice && (
          <div className="hearings-feedback-banner" role="status" aria-live="polite">
            <Check size={15} strokeWidth={2.4} aria-hidden="true" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Urgent 15-Day Limit Banner */}
        <div className="hearings-urgent-banner" role="status">
          <div className="hearings-urgent-left">
            <Clock
              size={18}
              strokeWidth={2}
              className="hearings-urgent-icon"
              aria-hidden="true"
            />
            <div>
              <p className="hearings-urgent-title">
                {t.urgentBannerTitle(urgentCount)}
              </p>
              <p className="hearings-urgent-sub">{t.urgentBannerSub}</p>
            </div>
          </div>

          <button
            type="button"
            className="hearings-urgent-link"
            onClick={() => setShowUrgentOnly((prev) => !prev)}
          >
            {showUrgentOnly ? t.showAll : t.showUrgent}
          </button>
        </div>

        {/* Main Schedule Card */}
        <section className="hearings-card" aria-label={t.pageTitle}>
          {/* View Toggle & Date Range Toolbar */}
          <div className="hearings-toolbar">
            <div
              className="hearings-view-toggle"
              role="group"
              aria-label="Schedule view"
            >
              <button
                type="button"
                className={`hearings-view-btn ${
                  viewMode === 'calendar' ? 'is-active' : ''
                }`}
                onClick={() => setViewMode('calendar')}
              >
                <Calendar size={14} strokeWidth={2} />
                <span>{t.calendarView}</span>
              </button>
              <button
                type="button"
                className={`hearings-view-btn ${
                  viewMode === 'list' ? 'is-active' : ''
                }`}
                onClick={() => setViewMode('list')}
              >
                <FileText size={14} strokeWidth={2} />
                <span>{t.listView}</span>
              </button>
            </div>

            <div className="hearings-date-nav">
              <button
                type="button"
                className="hearings-nav-arrow"
                aria-label={t.prevWeekLabel}
                disabled={weekIndex === 0}
                onClick={() => setWeekIndex((prev) => Math.max(0, prev - 1))}
              >
                <ChevronLeft size={14} strokeWidth={2.2} />
              </button>
              <span className="hearings-date-range">
                {activeWeek.rangeLabel}
              </span>
              <button
                type="button"
                className="hearings-nav-arrow"
                aria-label={t.nextWeekLabel}
                disabled={weekIndex === WEEK_PRESETS.length - 1}
                onClick={() =>
                  setWeekIndex((prev) =>
                    Math.min(WEEK_PRESETS.length - 1, prev + 1)
                  )
                }
              >
                <ChevronRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {viewMode === 'calendar' ? (
            <>
              {/* 7-Day Weekly Calendar Grid */}
              <div className="week-calendar-grid" role="grid">
                {activeWeek.days.map((day) => {
                  const dayEvents = displayedCalendarEvents.filter(
                    (ev) => ev.dayNum === day.dayNum
                  );

                  return (
                    <div key={day.dayNum} className="week-day-col">
                      <div className="week-day-head">
                        <span className="week-day-name">{day.weekday}</span>
                        <span className="week-day-num">{day.dayNum}</span>
                      </div>

                      <div className="week-day-body">
                        {dayEvents.map((ev) => (
                          <Link
                            key={ev.id}
                            to={`/lupon-cases/${ev.id}`}
                            className={`cal-event-card ${
                              ev.isUrgent ? 'is-urgent' : 'is-standard'
                            }`}
                          >
                            <span className="cal-event-time">{ev.time}</span>
                            <span className="cal-event-id">{ev.id}</span>
                            <span className="cal-event-line1">{ev.line1}</span>
                            <span className="cal-event-line2">{ev.line2}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calendar Bottom Legend */}
              <div className="week-calendar-legend">
                <span className="week-legend-swatch" aria-hidden="true" />
                <span className="week-legend-label">{t.urgentLegend}</span>
              </div>
            </>
          ) : (
            <>
              {/* Date Group Header */}
              <div className="hearings-day-header">
                <div className="hearings-day-left">
                  <span className="hearings-day-num">03</span>
                  <div className="hearings-day-meta">
                    <span className="hearings-day-name">{t.dayName}</span>
                    <span className="hearings-day-month">{t.dayMonth}</span>
                  </div>
                </div>
                <span className="hearings-day-count">
                  {t.scheduledCount(displayedHearings.length)}
                </span>
              </div>

              {/* Hearing Rows */}
              {displayedHearings.length === 0 ? (
                <p className="hearings-empty-text">{t.emptyState}</p>
              ) : (
                <div className="hearings-list">
                  {displayedHearings.map((item) => (
                    <div
                      key={item.id}
                      className={`hearing-session-row ${
                        item.isUrgent ? 'is-urgent' : ''
                      }`}
                    >
                      {item.isUrgent && (
                        <span
                          className="hearing-urgent-bar"
                          aria-hidden="true"
                        />
                      )}

                      {/* Time Column */}
                      <div className="hearing-time-col">
                        <p className="hearing-time-text">{item.time}</p>
                        <p className="hearing-duration-text">{item.duration}</p>
                      </div>

                      {/* Vertical Track Divider + Case Details */}
                      <div className="hearing-details-col">
                        <span
                          className="hearing-track-line"
                          aria-hidden="true"
                        />
                        <span
                          className="hearing-track-dot"
                          aria-hidden="true"
                        />

                        <div className="hearing-badges-row">
                          <span className="hearing-case-pill">{item.id}</span>
                          <span
                            className={`hearing-stage-pill is-${item.stageTone}`}
                          >
                            {item.stage}
                          </span>
                          {item.dueBadge && (
                            <span className="hearing-due-tag">
                              <Clock size={12} strokeWidth={2.2} />
                              <span>{item.dueBadge}</span>
                            </span>
                          )}
                        </div>

                        <h2 className="hearing-parties-heading">
                          {item.parties}
                        </h2>

                        <div className="hearing-meta-row">
                          <span className="hearing-meta-chip">
                            <FileText size={12} strokeWidth={2} />
                            <span>{item.nature}</span>
                          </span>
                          <span className="hearing-meta-chip">
                            <Users size={12} strokeWidth={2} />
                            <span>{item.mediators}</span>
                          </span>
                          <span className="hearing-meta-chip">
                            <Home size={12} strokeWidth={2} />
                            <span>{item.room}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right 2x2 Action Grid */}
                      <div className="hearing-actions-grid">
                        {item.noticeDelivered ? (
                          <button
                            type="button"
                            className="hearing-btn-delivered"
                            disabled
                          >
                            <Check size={13} strokeWidth={2.4} />
                            <span>{t.deliveredLabel}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="hearing-btn-outline-blue"
                            onClick={() => handleSendReminder(item.id)}
                          >
                            <MessageSquareText size={13} strokeWidth={2} />
                            <span>{t.sendReminderLabel}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="hearing-btn-outline-blue"
                          onClick={() => handlePrintSummons(item.id)}
                        >
                          <span>{t.printSummonsLabel}</span>
                        </button>

                        <Link
                          to={`/lupon-cases/${item.id}`}
                          className="hearing-btn-primary"
                        >
                          {t.caseDetailsLabel}
                        </Link>

                        <button
                          type="button"
                          className="hearing-btn-outline-neutral"
                          onClick={() => handleOpenReschedule(item)}
                        >
                          {t.rescheduleLabel}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Schedule / Reschedule Hearing Modal */}
      <ScheduleHearingModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onConfirmSchedule={handleConfirmSchedule}
        initialHearing={rescheduleTarget}
        language={language}
      />
    </LuponLayout>
  );
}

export default LuponHearings;
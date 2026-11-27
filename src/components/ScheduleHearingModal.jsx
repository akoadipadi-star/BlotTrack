import { useEffect, useState } from 'react';
import { Calendar, X, ChevronDown, MessageSquare, Clock } from 'lucide-react';
import './ScheduleHearingModal.css';

const KP_CASE_OPTIONS = [
  {
    value: '2026-010-028 • Jai Santos vs. Ben Dela Peña',
    isConciliation: true,
    pangkatDeadline: 'Nobyembre 18, 2026',
    daysLeftText:
      '12 na aldaw na natatada • An piniling petsa dapat nasa laog kan aktibong panahon o nakarekord na ekstensyon.',
  },
  {
    value: '2026-011-048 • Noel Garcia vs. Allan Sy',
    isConciliation: false,
  },
  {
    value: '2026-010-029 • Rosa Mendoza vs. Carlo Reyes',
    isConciliation: false,
  },
  {
    value: '2026-010-030 • Liza Ramos vs. Elena Cruz',
    isConciliation: false,
  },
];

const NOTICE_OPTIONS = [
  '1st Patawag',
  '2nd Patawag',
  '3rd Patawag',
  'Notice of Conciliation',
  'Notice of Arbitration',
];

const PANGKAT_MEMBER_POOL = [
  'Ramon Luna',
  'Lisa Ram',
  'Joner Lita',
  'Hon. Ramon Luna',
  'Anita Flores',
  'Mae Rayos',
  'Janie Lupo',
  'Nestor Diaz',
  'Benjamin Torres',
];

function ScheduleHearingModal({
  isOpen,
  onClose,
  onConfirmSchedule,
  initialHearing = null,
}) {
  const isReschedule = Boolean(initialHearing);

  const defaultCaseOption = initialHearing
    ? KP_CASE_OPTIONS.find((opt) =>
        opt.value.startsWith(initialHearing.id)
      )?.value || `${initialHearing.id} • ${initialHearing.parties.replace(/\s+/g, ' ')}`
    : '2026-011-048 • Noel Garcia vs. Allan Sy';

  const [selectedCase, setSelectedCase] = useState(defaultCaseOption);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [roomVenue, setRoomVenue] = useState('Lupon Office');
  const [noticeType, setNoticeType] = useState(
    isReschedule ? '2nd Patawag' : '1st Patawag'
  );
  const [luponMember, setLuponMember] = useState('Hon. Ramon Luna');
  const [pangkatMembers, setPangkatMembers] = useState([
    'Ramon Luna',
    'Lisa Ram',
    'Joner Lita',
  ]);

  useEffect(() => {
    if (!isOpen) return;
    if (initialHearing) {
      const matched = KP_CASE_OPTIONS.find((opt) =>
        opt.value.startsWith(initialHearing.id)
      );
      setSelectedCase(
        matched
          ? matched.value
          : `${initialHearing.id} • ${initialHearing.parties.replace(/\s+/g, ' ')}`
      );
      setNoticeType('2nd Patawag');
      setDateInput('');
      setTimeInput('');
      setRoomVenue('Lupon Office');
      setPangkatMembers(['Ramon Luna', 'Lisa Ram', 'Joner Lita']);
    } else {
      setSelectedCase('2026-011-048 • Noel Garcia vs. Allan Sy');
      setNoticeType('1st Patawag');
      setDateInput('');
      setTimeInput('');
      setRoomVenue('Lupon Office');
      setLuponMember('Hon. Ramon Luna');
    }
  }, [isOpen, initialHearing]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeCaseMeta = KP_CASE_OPTIONS.find(
    (opt) => opt.value === selectedCase
  );
  const showConciliationFields =
    Boolean(activeCaseMeta?.isConciliation) ||
    initialHearing?.stage?.toLowerCase().includes('conciliation');

  const displayDate = dateInput.trim() || 'Nobyembre 11, 2026';
  const displayTime = timeInput.trim() || '9:00 AM';
  const displayRoom = roomVenue.trim() || 'Lupon Office';

  const smsPreviewText = `May nakaiskedyul na pag-oolay para sa imong kaso sa ${displayDate}, ${displayTime} sa ${displayRoom}. Mag-abot 15 minutos bago an oras. Dalhon an valid ID.`;

  const handlePangkatChange = (index, value) => {
    setPangkatMembers((prev) =>
      prev.map((member, idx) => (idx === index ? value : member))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [rawId, rawParties] = selectedCase.split(' • ');
    const assignedMediators = showConciliationFields
      ? pangkatMembers.join(', ')
      : luponMember;

    const scheduledRecord = {
      id: rawId || '2026-011-048',
      time: displayTime,
      duration: '60 MIN',
      stage: showConciliationFields
        ? 'Extended Conciliation'
        : noticeType === '1st Patawag'
          ? 'Mediation'
          : noticeType,
      stageTone: showConciliationFields ? 'peach' : 'blue',
      dueBadge: showConciliationFields ? '2 days left' : null,
      isUrgent: showConciliationFields,
      parties: rawParties || 'Noel Garcia vs. Allan Sy',
      nature: initialHearing?.nature || 'KP Case',
      mediators: assignedMediators,
      room: displayRoom,
      noticeDelivered: true,
    };

    if (onConfirmSchedule) {
      onConfirmSchedule(scheduledRecord, isReschedule);
    }
    onClose();
  };

  return (
    <div
      className="sched-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedModalHeading"
      onClick={onClose}
    >
      <div className="sched-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Modal Header */}
        <div className="sched-modal-header">
          <div className="sched-modal-header-left">
            <div className="sched-modal-icon-box" aria-hidden="true">
              <Calendar size={19} strokeWidth={2} />
            </div>
            <div>
              <h2 id="schedModalHeading" className="sched-modal-title">
                Mag-iskedyul nin Pagdinig
              </h2>
              <p className="sched-modal-subtitle">
                Magpili nin bakanteng petsa sa laog kan itinalaan na panahon.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="sched-modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="sched-modal-body">
            {/* Row 1: KP Case * */}
            <div className="sched-field">
              <label htmlFor="schedKpCase" className="sched-label">
                KP Case <span className="sched-required">*</span>
              </label>
              <div className="sched-select-wrapper">
                <select
                  id="schedKpCase"
                  className="sched-select"
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                >
                  {KP_CASE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.value}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="sched-select-chevron"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Conditional Pangkat Deadline Warning Banner */}
            {showConciliationFields && (
              <div className="sched-pangkat-banner" role="status">
                <Clock
                  size={17}
                  strokeWidth={2}
                  className="sched-pangkat-icon"
                  aria-hidden="true"
                />
                <div>
                  <p className="sched-pangkat-title">
                    Katapusan kan Pangkat:{' '}
                    {activeCaseMeta?.pangkatDeadline || 'Nobyembre 18, 2026'}
                  </p>
                  <p className="sched-pangkat-sub">
                    {activeCaseMeta?.daysLeftText ||
                      '12 na aldaw na natatada • An piniling petsa dapat nasa laog kan aktibong panahon o nakarekord na ekstensyon.'}
                  </p>
                </div>
              </div>
            )}

            {/* Row 2: Petsa * & Oras * */}
            <div className="sched-two-col">
              <div className="sched-field">
                <label htmlFor="schedDate" className="sched-label">
                  Petsa <span className="sched-required">*</span>
                </label>
                <input
                  id="schedDate"
                  type="text"
                  className="sched-input"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                />
              </div>

              <div className="sched-field">
                <label htmlFor="schedTime" className="sched-label">
                  Oras <span className="sched-required">*</span>
                </label>
                <input
                  id="schedTime"
                  type="text"
                  className="sched-input"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Room / Venue * & Patawag / Notice * */}
            <div className="sched-two-col">
              <div className="sched-field">
                <label htmlFor="schedRoom" className="sched-label">
                  Room / Venue <span className="sched-required">*</span>
                </label>
                <input
                  id="schedRoom"
                  type="text"
                  className="sched-input"
                  value={roomVenue}
                  onChange={(e) => setRoomVenue(e.target.value)}
                />
              </div>

              <div className="sched-field">
                <label htmlFor="schedNotice" className="sched-label">
                  Patawag / Notice <span className="sched-required">*</span>
                </label>
                <div className="sched-select-wrapper">
                  <select
                    id="schedNotice"
                    className="sched-select"
                    value={noticeType}
                    onChange={(e) => setNoticeType(e.target.value)}
                  >
                    {NOTICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="sched-select-chevron"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Lupon Member/s * (3-member stack for Conciliation, single select otherwise) */}
            <div className="sched-field">
              <label
                htmlFor={
                  showConciliationFields ? 'schedPangkat0' : 'schedMember'
                }
                className="sched-label"
              >
                Lupon Member/s <span className="sched-required">*</span>
              </label>

              {showConciliationFields ? (
                <div className="sched-pangkat-stack">
                  {pangkatMembers.map((memberVal, idx) => (
                    <div key={idx} className="sched-select-wrapper">
                      <select
                        id={`schedPangkat${idx}`}
                        aria-label={`Pangkat Member ${idx + 1}`}
                        className="sched-select"
                        value={memberVal}
                        onChange={(e) =>
                          handlePangkatChange(idx, e.target.value)
                        }
                      >
                        {PANGKAT_MEMBER_POOL.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className="sched-select-chevron"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sched-select-wrapper">
                  <select
                    id="schedMember"
                    className="sched-select"
                    value={luponMember}
                    onChange={(e) => setLuponMember(e.target.value)}
                  >
                    {PANGKAT_MEMBER_POOL.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="sched-select-chevron"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            {/* Row 5: Mensahe SMS Preview Box */}
            <div className="sched-sms-box">
              <div className="sched-sms-header">
                <MessageSquare size={14} strokeWidth={2.2} />
                <span>Mensahe</span>
              </div>

              <div className="sched-sms-bubble">
                <p>{smsPreviewText}</p>
              </div>

              <p className="sched-sms-note">
                Ipapadara sa parehong partido pagkatapos kan kumpirmasyon.
              </p>
            </div>
          </div>

          {/* Bottom Footer Action Buttons */}
          <div className="sched-modal-footer">
            <button
              type="button"
              className="sched-cancel-btn"
              onClick={onClose}
            >
              Ikansela
            </button>

            <button type="submit" className="sched-confirm-btn">
              <Calendar size={15} strokeWidth={2.1} />
              <span>Kumpirmaron an Iskedyul</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleHearingModal;
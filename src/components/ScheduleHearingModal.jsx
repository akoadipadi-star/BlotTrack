import { useEffect, useState } from 'react';
import { Calendar, X, ChevronDown, MessageSquare, Clock } from 'lucide-react';
import './ScheduleHearingModal.css';

const KP_CASE_OPTIONS = [
  {
    value: '2026-010-028 • Jai Santos vs. Ben Dela Peña',
    isConciliation: true,
    pangkatDeadline: 'Nobyembre 18, 2026',
    pangkatDeadlineISO: '2026-11-18',
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

const REFERENCE_TODAY_ISO = '2026-11-03';

const MONTH_INDEX_MAP = {
  january: 0,
  enero: 0,
  february: 1,
  pebrero: 1,
  march: 2,
  marso: 2,
  april: 3,
  abril: 3,
  may: 4,
  mayo: 4,
  june: 5,
  hunyo: 5,
  july: 6,
  hulyo: 6,
  august: 7,
  agosto: 7,
  september: 8,
  setyembre: 8,
  october: 9,
  oktubre: 9,
  november: 10,
  nobyembre: 10,
  december: 11,
  disyembre: 11,
};

function parseHearingDateToISO(rawDate) {
  const trimmed = rawDate.trim();
  if (!trimmed) return null;

  // Match YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const y = Number(isoMatch[1]);
    const m = Number(isoMatch[2]) - 1;
    const d = Number(isoMatch[3]);
    const dt = new Date(Date.UTC(y, m, d));
    if (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m &&
      dt.getUTCDate() === d
    ) {
      return trimmed;
    }
    return null;
  }

  // Match MM/DD/YYYY
  const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (slashMatch) {
    const m = Number(slashMatch[1]) - 1;
    const d = Number(slashMatch[2]);
    const y = Number(slashMatch[3]);
    const dt = new Date(Date.UTC(y, m, d));
    if (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m &&
      dt.getUTCDate() === d
    ) {
      return `${String(y).padStart(4, '0')}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
    return null;
  }

  // Match "Month DD, YYYY" (e.g., "Nobyembre 11, 2026" or "November 11, 2026")
  const wordMatch = /^([a-zA-ZñÑ]+)\s+(\d{1,2}),?\s+(\d{4})$/.exec(trimmed);
  if (wordMatch) {
    const monthIdx = MONTH_INDEX_MAP[wordMatch[1].toLowerCase()];
    const d = Number(wordMatch[2]);
    const y = Number(wordMatch[3]);
    if (monthIdx !== undefined) {
      const dt = new Date(Date.UTC(y, monthIdx, d));
      if (
        dt.getUTCFullYear() === y &&
        dt.getUTCMonth() === monthIdx &&
        dt.getUTCDate() === d
      ) {
        return `${String(y).padStart(4, '0')}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
    }
  }

  return null;
}

function parseHearingTimeMinutes(rawTime) {
  const trimmed = rawTime.trim();
  if (!trimmed) return null;

  // Match 12-hour format: e.g. "9:00 AM", "1:30 PM", "10:15am"
  const ampmMatch = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(trimmed);
  if (ampmMatch) {
    let hours = Number(ampmMatch[1]);
    const mins = Number(ampmMatch[2]);
    const period = ampmMatch[3].toUpperCase();
    if (hours < 1 || hours > 12 || mins < 0 || mins > 59) return null;
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
  }

  // Match 24-hour format: e.g. "09:00", "14:30"
  const milMatch = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(trimmed);
  if (milMatch) {
    return Number(milMatch[1]) * 60 + Number(milMatch[2]);
  }

  return null;
}

const VALIDATION_TEXT = {
  bikol: {
    kpCaseRequired: 'Pumili nin balidong KP Case.',
    dateRequired: 'Kinakaipuhan an Petsa kan pagdinig.',
    dateInvalid:
      'Maglagay nin tamang petsa (e.g. Nobyembre 11, 2026 o 2026-11-11).',
    datePast: 'Dai pwede an nakaaging petsa.',
    dateExceedsDeadline: (deadline) =>
      `An petsa dai dapat lumampas sa Katapusan kan Pangkat (${deadline}).`,
    timeRequired: 'Kinakaipuhan an Oras kan pagdinig.',
    timeInvalid: 'Maglagay nin tamang oras (e.g. 9:00 AM o 1:30 PM).',
    timeHours:
      'An oras kan pagdinig dapat nasa pag-ultanan kan 8:00 AM asin 5:00 PM.',
    roomRequired: 'Kinakaipuhan an Room / Venue.',
    roomMin: 'Dai mababa sa 2 karakter an Room / Venue.',
    roomMax: 'Dai malampas sa 100 karakter an Room / Venue.',
    noticeInvalid: 'Pumili nin tamang Patawag / Notice.',
    memberRequired: 'Pumili nin Lupon Member.',
    pangkatDuplicate:
      'Dai pwedeng maulit an parehong miyembro sa 3 Pangkat slots.',
    confirming: 'Kinukumpirmar...',
    confirm: 'Kumpirmaron an Iskedyul',
    cancel: 'Ikansela',
  },
  en: {
    kpCaseRequired: 'Please select a valid KP Case.',
    dateRequired: 'Hearing date is required.',
    dateInvalid:
      'Enter a valid date (e.g. November 11, 2026 or 2026-11-11).',
    datePast: 'Hearing date cannot be in the past.',
    dateExceedsDeadline: (deadline) =>
      `Hearing date cannot exceed the Pangkat deadline (${deadline}).`,
    timeRequired: 'Hearing time is required.',
    timeInvalid: 'Enter a valid time (e.g. 9:00 AM or 1:30 PM).',
    timeHours: 'Hearing time must be between 8:00 AM and 5:00 PM.',
    roomRequired: 'Room / Venue is required.',
    roomMin: 'Room / Venue must be at least 2 characters.',
    roomMax: 'Room / Venue must not exceed 100 characters.',
    noticeInvalid: 'Please select a valid Patawag / Notice.',
    memberRequired: 'Please select a Lupon Member.',
    pangkatDuplicate:
      'Duplicate Pangkat members are not allowed across the 3 slots.',
    confirming: 'Confirming...',
    confirm: 'Confirm Schedule',
    cancel: 'Cancel',
  },
};

function ScheduleHearingModal({
  isOpen,
  onClose,
  onConfirmSchedule,
  initialHearing = null,
  language = 'bikol',
}) {
  const isReschedule = Boolean(initialHearing);
  const msg = VALIDATION_TEXT[language === 'en' ? 'en' : 'bikol'];

  const defaultCaseOption = initialHearing
    ? KP_CASE_OPTIONS.find((opt) =>
        opt.value.startsWith(initialHearing.id)
      )?.value ||
      `${initialHearing.id} • ${initialHearing.parties.replace(/\s+/g, ' ')}`
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setErrors({});
    setIsSubmitting(false);

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
      setRoomVenue(initialHearing.room || 'Lupon Office');
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
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const activeCaseMeta = KP_CASE_OPTIONS.find(
    (opt) => opt.value === selectedCase
  );
  const showConciliationFields =
    Boolean(activeCaseMeta?.isConciliation) ||
    initialHearing?.stage?.toLowerCase().includes('conciliation');

  const previewDate = dateInput.trim() || 'Nobyembre 11, 2026';
  const previewTime = timeInput.trim() || '9:00 AM';
  const previewRoom = roomVenue.trim() || 'Lupon Office';

  const smsPreviewText = `May nakaiskedyul na pag-oolay para sa imong kaso sa ${previewDate}, ${previewTime} sa ${previewRoom}. Mag-abot 15 minutos bago an oras. Dalhon an valid ID.`;

  const handlePangkatChange = (index, value) => {
    setPangkatMembers((prev) =>
      prev.map((member, idx) => (idx === index ? value : member))
    );
    if (errors.pangkatMembers) {
      setErrors((prev) => ({ ...prev, pangkatMembers: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!selectedCase || !selectedCase.trim()) {
      nextErrors.selectedCase = msg.kpCaseRequired;
    }

    const trimmedDate = dateInput.trim();
    if (!trimmedDate) {
      nextErrors.dateInput = msg.dateRequired;
    } else {
      const parsedISO = parseHearingDateToISO(trimmedDate);
      if (!parsedISO) {
        nextErrors.dateInput = msg.dateInvalid;
      } else if (parsedISO < REFERENCE_TODAY_ISO) {
        nextErrors.dateInput = msg.datePast;
      } else if (showConciliationFields) {
        const deadlineISO =
          activeCaseMeta?.pangkatDeadlineISO || '2026-11-18';
        const deadlineLabel =
          activeCaseMeta?.pangkatDeadline || 'Nobyembre 18, 2026';
        if (parsedISO > deadlineISO) {
          nextErrors.dateInput = msg.dateExceedsDeadline(deadlineLabel);
        }
      }
    }

    const trimmedTime = timeInput.trim();
    if (!trimmedTime) {
      nextErrors.timeInput = msg.timeRequired;
    } else {
      const totalMinutes = parseHearingTimeMinutes(trimmedTime);
      if (totalMinutes === null) {
        nextErrors.timeInput = msg.timeInvalid;
      } else if (totalMinutes < 8 * 60 || totalMinutes > 17 * 60) {
        nextErrors.timeInput = msg.timeHours;
      }
    }

    const trimmedRoom = roomVenue.trim();
    if (!trimmedRoom) {
      nextErrors.roomVenue = msg.roomRequired;
    } else if (trimmedRoom.length < 2) {
      nextErrors.roomVenue = msg.roomMin;
    } else if (trimmedRoom.length > 100) {
      nextErrors.roomVenue = msg.roomMax;
    }

    if (!NOTICE_OPTIONS.includes(noticeType)) {
      nextErrors.noticeType = msg.noticeInvalid;
    }

    if (showConciliationFields) {
      const normalized = pangkatMembers.map((m) => m.trim());
      if (normalized.some((m) => !m)) {
        nextErrors.pangkatMembers = msg.memberRequired;
      } else if (new Set(normalized).size !== normalized.length) {
        nextErrors.pangkatMembers = msg.pangkatDuplicate;
      }
    } else if (!PANGKAT_MEMBER_POOL.includes(luponMember)) {
      nextErrors.luponMember = msg.memberRequired;
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const [rawId, rawParties] = selectedCase.split(' • ');
    const assignedMediators = showConciliationFields
      ? pangkatMembers.join(', ')
      : luponMember;

    const scheduledRecord = {
      id: rawId || '2026-011-048',
      date: dateInput.trim(),
      time: timeInput.trim(),
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
      room: roomVenue.trim(),
      noticeDelivered: true,
    };

    if (onConfirmSchedule) {
      onConfirmSchedule(scheduledRecord, isReschedule);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="sched-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedModalHeading"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
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
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="sched-modal-body">
            {/* Row 1: KP Case * */}
            <div className="sched-field">
              <label htmlFor="schedKpCase" className="sched-label">
                KP Case <span className="sched-required">*</span>
              </label>
              <div className="sched-select-wrapper">
                <select
                  id="schedKpCase"
                  className={`sched-select ${
                    errors.selectedCase ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.selectedCase)}
                  value={selectedCase}
                  onChange={(e) => {
                    setSelectedCase(e.target.value);
                    if (errors.selectedCase || errors.dateInput || errors.pangkatMembers) {
                      setErrors((prev) => ({
                        ...prev,
                        selectedCase: undefined,
                        dateInput: undefined,
                        pangkatMembers: undefined,
                      }));
                    }
                  }}
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
              {errors.selectedCase && (
                <p className="sched-error-text" role="alert">
                  {errors.selectedCase}
                </p>
              )}
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
                  className={`sched-input ${
                    errors.dateInput ? 'is-invalid' : ''
                  }`}
                  placeholder="e.g. Nobyembre 11, 2026"
                  aria-invalid={Boolean(errors.dateInput)}
                  aria-describedby={
                    errors.dateInput ? 'schedDateError' : undefined
                  }
                  value={dateInput}
                  onChange={(e) => {
                    setDateInput(e.target.value);
                    if (errors.dateInput) {
                      setErrors((prev) => ({ ...prev, dateInput: undefined }));
                    }
                  }}
                />
                {errors.dateInput && (
                  <p
                    id="schedDateError"
                    className="sched-error-text"
                    role="alert"
                  >
                    {errors.dateInput}
                  </p>
                )}
              </div>

              <div className="sched-field">
                <label htmlFor="schedTime" className="sched-label">
                  Oras <span className="sched-required">*</span>
                </label>
                <input
                  id="schedTime"
                  type="text"
                  className={`sched-input ${
                    errors.timeInput ? 'is-invalid' : ''
                  }`}
                  placeholder="e.g. 9:00 AM"
                  aria-invalid={Boolean(errors.timeInput)}
                  aria-describedby={
                    errors.timeInput ? 'schedTimeError' : undefined
                  }
                  value={timeInput}
                  onChange={(e) => {
                    setTimeInput(e.target.value);
                    if (errors.timeInput) {
                      setErrors((prev) => ({ ...prev, timeInput: undefined }));
                    }
                  }}
                />
                {errors.timeInput && (
                  <p
                    id="schedTimeError"
                    className="sched-error-text"
                    role="alert"
                  >
                    {errors.timeInput}
                  </p>
                )}
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
                  maxLength={100}
                  className={`sched-input ${
                    errors.roomVenue ? 'is-invalid' : ''
                  }`}
                  aria-invalid={Boolean(errors.roomVenue)}
                  aria-describedby={
                    errors.roomVenue ? 'schedRoomError' : undefined
                  }
                  value={roomVenue}
                  onChange={(e) => {
                    setRoomVenue(e.target.value);
                    if (errors.roomVenue) {
                      setErrors((prev) => ({ ...prev, roomVenue: undefined }));
                    }
                  }}
                />
                {errors.roomVenue && (
                  <p
                    id="schedRoomError"
                    className="sched-error-text"
                    role="alert"
                  >
                    {errors.roomVenue}
                  </p>
                )}
              </div>

              <div className="sched-field">
                <label htmlFor="schedNotice" className="sched-label">
                  Patawag / Notice <span className="sched-required">*</span>
                </label>
                <div className="sched-select-wrapper">
                  <select
                    id="schedNotice"
                    className={`sched-select ${
                      errors.noticeType ? 'is-invalid' : ''
                    }`}
                    aria-invalid={Boolean(errors.noticeType)}
                    value={noticeType}
                    onChange={(e) => {
                      setNoticeType(e.target.value);
                      if (errors.noticeType) {
                        setErrors((prev) => ({
                          ...prev,
                          noticeType: undefined,
                        }));
                      }
                    }}
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
                {errors.noticeType && (
                  <p className="sched-error-text" role="alert">
                    {errors.noticeType}
                  </p>
                )}
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
                  {pangkatMembers.map((memberVal, idx) => {
                    const isDuplicate =
                      pangkatMembers.filter((m) => m === memberVal).length > 1;
                    return (
                      <div key={idx} className="sched-select-wrapper">
                        <select
                          id={`schedPangkat${idx}`}
                          aria-label={`Pangkat Member ${idx + 1}`}
                          className={`sched-select ${
                            errors.pangkatMembers && isDuplicate
                              ? 'is-invalid'
                              : ''
                          }`}
                          aria-invalid={Boolean(
                            errors.pangkatMembers && isDuplicate
                          )}
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
                    );
                  })}
                </div>
              ) : (
                <div className="sched-select-wrapper">
                  <select
                    id="schedMember"
                    className={`sched-select ${
                      errors.luponMember ? 'is-invalid' : ''
                    }`}
                    aria-invalid={Boolean(errors.luponMember)}
                    value={luponMember}
                    onChange={(e) => {
                      setLuponMember(e.target.value);
                      if (errors.luponMember) {
                        setErrors((prev) => ({
                          ...prev,
                          luponMember: undefined,
                        }));
                      }
                    }}
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

              {(errors.pangkatMembers || errors.luponMember) && (
                <p className="sched-error-text" role="alert">
                  {errors.pangkatMembers || errors.luponMember}
                </p>
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
              disabled={isSubmitting}
              onClick={onClose}
            >
              {language === 'en' ? msg.cancel : 'Ikansela'}
            </button>

            <button
              type="submit"
              className="sched-confirm-btn"
              disabled={isSubmitting}
            >
              <Calendar size={15} strokeWidth={2.1} />
              <span>
                {isSubmitting
                  ? msg.confirming
                  : language === 'en'
                    ? msg.confirm
                    : 'Kumpirmaron an Iskedyul'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleHearingModal;
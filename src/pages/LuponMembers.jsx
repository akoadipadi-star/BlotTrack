import { useMemo, useState } from 'react';
import { Bell, Phone, Check, X, Search, AlertCircle } from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import './LuponMembers.css';

const INITIAL_PENDING = [
  {
    id: 'pending-1',
    fullName: 'Marites Villanueva',
    mobile: '0919 882 1045',
    zone: 'Zone 3',
    dateRegistered: 'November 3, 2026',
    role: 'Pangkat Tagapagkasundo',
  },
  {
    id: 'pending-2',
    fullName: 'Roberto Almeda',
    mobile: '0921 445 7820',
    zone: 'Zone 6',
    dateRegistered: 'November 2, 2026',
    role: 'Pangkat Tagapagkasundo',
  },
];

const INITIAL_MEMBERS = [
  {
    id: 'mem-1',
    name: 'Ramon Luna',
    role: 'Pangkat Tagapagkasundo',
    address: 'Zone 4',
    mobile: '0917 432 1884',
    assignedCases: 4,
    isActive: true,
  },
  {
    id: 'mem-2',
    name: 'Anita Flores',
    role: 'Pangkat Tagapagkasundo',
    address: 'Zone 4',
    mobile: '0920 651 3072',
    assignedCases: 3,
    isActive: true,
  },
  {
    id: 'mem-3',
    name: 'Nestor Diaz',
    role: 'Pangkat Tagapagkasundo',
    address: 'Zone 4',
    mobile: '0918 220 4581',
    assignedCases: 2,
    isActive: true,
  },
  {
    id: 'mem-4',
    name: 'Corazon Garcia',
    role: 'Pangkat Tagapagkasundo',
    address: 'Zone 4',
    mobile: '0998 741 6205',
    assignedCases: 0,
    isActive: false,
  },
  {
    id: 'mem-5',
    name: 'Benjamin Torres',
    role: 'Pangkat Tagapagkasundo',
    address: 'Zone 4',
    mobile: '0915 330 7824',
    assignedCases: 1,
    isActive: true,
  },
];

function LuponMembers({ language = 'bikol', onLanguageChange }) {
  const [pendingMembers, setPendingMembers] = useState(INITIAL_PENDING);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusBanner, setStatusBanner] = useState(null);

  const content = {
    bikol: {
      reportBtn: 'Mag-report nin Problema sa System',
      eyebrow: 'MARTES, NOBYEMBRE 3, 2026',
      pageTitle: 'Lupon Tagapamayapa',
      pageSubtitle:
        'I-manage an access, availability, asin mediation assignments kan mga miyembro.',
      pendingHeading: 'Mga Naghahalat nin Pag-apruba',
      pendingSub:
        'I-verify muna bago tawan nin access sa confidential KP cases.',
      colFullName: 'FULL NAME',
      colMobile: 'MOBILE NUMBER',
      colZone: 'PUROK / ZONE',
      colDateReg: 'DATE REGISTERED',
      colRole: 'ASSIGNED ROLE',
      colActions: 'ACTIONS',
      approveBtn: 'Aprubahan',
      rejectBtn: 'Tanggihan',
      directoryHeading: 'Listahan kan mga Aktibong Miyembro',
      registeredCount: (count) => `${count} nakarehistrong Lupon members`,
      searchPlaceholder: 'Hanapon an pangaran, purok, o mobile...',
      filterAll: 'Lahat / All',
      filterActive: 'Aktibo / Active',
      filterInactive: 'Naka-leave / Inactive',
      colMember: 'MEMBER',
      colAddress: 'ADDRESS',
      colActiveCases: 'ACTIVE KP CASES',
      colStatus: 'STATUS',
      assignedCaseSingle: 'assigned case',
      assignedCasePlural: 'assigned cases',
      statusActive: 'Aktibo',
      statusInactive: 'Hindi Aktibo',
      emptySearch: 'Mayo nin nahanap na miyembro para sa piniling filter.',
      resetFilters: 'I-reset an filter',
      approvedNotice: (name) =>
        `Naaprubahan na si ${name} asin naidagdag sa aktibong lista.`,
      duplicateNotice: (name) =>
        `Nasa lista na kan mga miyembro si ${name}.`,
      rejectedNotice: (name) =>
        `Tinanggihan an aplikasyon ni ${name}.`,
      activeCasesWarning: (name, count) =>
        `Dai pwedeng i-deactivate si ${name} mantang igwa pa nin ${count} aktibong KP ${count === 1 ? 'kaso' : 'kaso'}. I-reassign muna an kaso.`,
      statusUpdatedNotice: (name, isNowActive) =>
        `Na-update an status ni ${name} sa ${isNowActive ? 'Aktibo' : 'Hindi Aktibo'}.`,
    },
    en: {
      reportBtn: 'Report a System Problem',
      eyebrow: 'TUESDAY, NOVEMBER 3, 2026',
      pageTitle: 'Lupon Tagapamayapa',
      pageSubtitle:
        'Manage member access, availability, and mediation assignments.',
      pendingHeading: 'Pending Approvals',
      pendingSub:
        'Verify identity before granting access to confidential KP cases.',
      colFullName: 'FULL NAME',
      colMobile: 'MOBILE NUMBER',
      colZone: 'PUROK / ZONE',
      colDateReg: 'DATE REGISTERED',
      colRole: 'ASSIGNED ROLE',
      colActions: 'ACTIONS',
      approveBtn: 'Approve',
      rejectBtn: 'Reject',
      directoryHeading: 'Active Members Directory',
      registeredCount: (count) => `${count} registered Lupon members`,
      searchPlaceholder: 'Search name, purok, or mobile...',
      filterAll: 'All',
      filterActive: 'Active',
      filterInactive: 'On Leave / Inactive',
      colMember: 'MEMBER',
      colAddress: 'ADDRESS',
      colActiveCases: 'ACTIVE KP CASES',
      colStatus: 'STATUS',
      assignedCaseSingle: 'assigned case',
      assignedCasePlural: 'assigned cases',
      statusActive: 'Active',
      statusInactive: 'Inactive',
      emptySearch: 'No Lupon members match the current search or filter.',
      resetFilters: 'Reset filters',
      approvedNotice: (name) =>
        `${name} has been approved and added to the active directory.`,
      duplicateNotice: (name) =>
        `${name} is already registered in the members directory.`,
      rejectedNotice: (name) =>
        `Registration request for ${name} has been declined.`,
      activeCasesWarning: (name, count) =>
        `Cannot set ${name} to Inactive while assigned to ${count} active KP ${count === 1 ? 'case' : 'cases'}. Reassign cases first.`,
      statusUpdatedNotice: (name, isNowActive) =>
        `Updated ${name}'s status to ${isNowActive ? 'Active' : 'Inactive'}.`,
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const showBanner = (type, text) => {
    setStatusBanner({ type, text });
    setTimeout(() => {
      setStatusBanner((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  };

  const handleApprove = (pendingItem) => {
    const alreadyExists = members.some(
      (m) => m.name.toLowerCase() === pendingItem.fullName.trim().toLowerCase()
    );

    setPendingMembers((prev) =>
      prev.filter((item) => item.id !== pendingItem.id)
    );

    if (alreadyExists) {
      showBanner('warning', t.duplicateNotice(pendingItem.fullName));
      return;
    }

    setMembers((prev) => [
      ...prev,
      {
        id: `approved-${pendingItem.id}`,
        name: pendingItem.fullName.trim(),
        role: pendingItem.role,
        address: pendingItem.zone,
        mobile: pendingItem.mobile,
        assignedCases: 0,
        isActive: true,
      },
    ]);
    showBanner('success', t.approvedNotice(pendingItem.fullName));
  };

  const handleReject = (pendingItem) => {
    setPendingMembers((prev) =>
      prev.filter((item) => item.id !== pendingItem.id)
    );
    showBanner('success', t.rejectedNotice(pendingItem.fullName));
  };

  const handleToggleStatus = (member) => {
    if (member.isActive && member.assignedCases > 0) {
      showBanner(
        'warning',
        t.activeCasesWarning(member.name, member.assignedCases)
      );
      return;
    }

    const nextActive = !member.isActive;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id ? { ...m, isActive: nextActive } : m
      )
    );
    showBanner('success', t.statusUpdatedNotice(member.name, nextActive));
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (statusFilter === 'active' && !member.isActive) return false;
      if (statusFilter === 'inactive' && member.isActive) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchName = member.name.toLowerCase().includes(q);
        const matchZone = member.address.toLowerCase().includes(q);
        const matchMobile = member.mobile.toLowerCase().includes(q);
        if (!matchName && !matchZone && !matchMobile) return false;
      }

      return true;
    });
  }, [members, statusFilter, searchQuery]);

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={t.reportBtn}
    >
      <div className="lupon-members-container">
        {/* Top Date & Page Heading */}
        <header className="lupon-members-header">
          <p className="lupon-members-eyebrow">{t.eyebrow}</p>
          <h1 className="lupon-members-title">{t.pageTitle}</h1>
          <p className="lupon-members-subtitle">{t.pageSubtitle}</p>
        </header>

        {/* Action / Validation Feedback Banner */}
        {statusBanner && (
          <div
            className={`members-feedback-banner is-${statusBanner.type}`}
            role="status"
            aria-live="polite"
          >
            {statusBanner.type === 'warning' ? (
              <AlertCircle size={15} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Check size={15} strokeWidth={2.4} aria-hidden="true" />
            )}
            <span>{statusBanner.text}</span>
          </div>
        )}

        {/* Top Pending Approvals Card */}
        {pendingMembers.length > 0 && (
          <section
            className="pending-approvals-card"
            aria-labelledby="pendingApprovalsHeading"
          >
            <div className="pending-approvals-banner">
              <div className="pending-banner-icon" aria-hidden="true">
                <Bell size={18} strokeWidth={2} />
              </div>
              <div>
                <div className="pending-banner-title-row">
                  <h2
                    id="pendingApprovalsHeading"
                    className="pending-banner-title"
                  >
                    {t.pendingHeading}
                  </h2>
                  <span className="pending-banner-count">
                    {pendingMembers.length}
                  </span>
                </div>
                <p className="pending-banner-sub">{t.pendingSub}</p>
              </div>
            </div>

            {/* Table Column Header */}
            <div className="pending-table-head">
              <span>{t.colFullName}</span>
              <span>{t.colMobile}</span>
              <span>{t.colZone}</span>
              <span>{t.colDateReg}</span>
              <span>{t.colRole}</span>
              <span>{t.colActions}</span>
            </div>

            {/* Pending Rows */}
            <div className="pending-table-body">
              {pendingMembers.map((item) => (
                <div key={item.id} className="pending-table-row">
                  <span className="pending-name-text">{item.fullName}</span>

                  <span className="member-mobile-cell">
                    <Phone size={13} strokeWidth={2} />
                    <span>{item.mobile}</span>
                  </span>

                  <span className="member-zone-text">{item.zone}</span>

                  <span className="pending-date-text">
                    {item.dateRegistered}
                  </span>

                  <div>
                    <span className="member-role-pill">{item.role}</span>
                  </div>

                  <div className="pending-actions-cell">
                    <button
                      type="button"
                      className="btn-approve-member"
                      onClick={() => handleApprove(item)}
                    >
                      <Check size={13} strokeWidth={2.5} />
                      <span>{t.approveBtn}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-reject-member"
                      onClick={() => handleReject(item)}
                    >
                      <X size={13} strokeWidth={2.3} />
                      <span>{t.rejectBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Active Members Directory Card */}
        <section
          className="active-members-card"
          aria-labelledby="activeMembersHeading"
        >
          <div className="active-members-top">
            <h2 id="activeMembersHeading" className="active-members-title">
              {t.directoryHeading}
            </h2>
            <p className="active-members-sub">
              {t.registeredCount(members.length)}
            </p>
          </div>

          {/* Search & Pill Filters */}
          <div className="active-members-toolbar">
            <div className="members-search-box">
              <Search
                size={14}
                strokeWidth={2}
                className="members-search-icon"
                aria-hidden="true"
              />
              <input
                type="text"
                maxLength={80}
                className="members-search-input"
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="members-filter-pills" role="group">
              <button
                type="button"
                className={`members-pill-btn ${
                  statusFilter === 'all' ? 'is-active' : ''
                }`}
                onClick={() => setStatusFilter('all')}
              >
                {t.filterAll}
              </button>
              <button
                type="button"
                className={`members-pill-btn ${
                  statusFilter === 'active' ? 'is-active' : ''
                }`}
                onClick={() => setStatusFilter('active')}
              >
                {t.filterActive}
              </button>
              <button
                type="button"
                className={`members-pill-btn ${
                  statusFilter === 'inactive' ? 'is-active' : ''
                }`}
                onClick={() => setStatusFilter('inactive')}
              >
                {t.filterInactive}
              </button>
            </div>
          </div>

          {/* Members Table Header */}
          <div className="members-table-head">
            <span>{t.colMember}</span>
            <span>{t.colAddress}</span>
            <span>{t.colMobile}</span>
            <span>{t.colActiveCases}</span>
            <span>{t.colStatus}</span>
          </div>

          {/* Members Rows */}
          <div className="members-table-body">
            {filteredMembers.length === 0 ? (
              <div className="members-empty-state">
                <p>{t.emptySearch}</p>
                <button
                  type="button"
                  className="members-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                >
                  {t.resetFilters}
                </button>
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div key={member.id} className="members-table-row">
                  <div>
                    <p className="member-name-text">{member.name}</p>
                    <p className="member-role-sub">{member.role}</p>
                  </div>

                  <span className="member-zone-text">{member.address}</span>

                  <span className="member-mobile-cell">
                    <Phone size={13} strokeWidth={2} />
                    <span>{member.mobile}</span>
                  </span>

                  <div className="member-cases-cell">
                    <span className="member-cases-badge">
                      {member.assignedCases}
                    </span>
                    <span className="member-cases-label">
                      {member.assignedCases === 1
                        ? t.assignedCaseSingle
                        : t.assignedCasePlural}
                    </span>
                  </div>

                  <div>
                    <button
                      type="button"
                      className={`member-status-pill ${
                        member.isActive ? 'is-active' : 'is-inactive'
                      }`}
                      onClick={() => handleToggleStatus(member)}
                    >
                      <span className="member-status-dot" aria-hidden="true" />
                      <span>
                        {member.isActive ? t.statusActive : t.statusInactive}
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </LuponLayout>
  );
}

export default LuponMembers;
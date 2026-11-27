import { useMemo, useState } from 'react';
import { Bell, Phone, Check, X, Search } from 'lucide-react';
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

  const handleApprove = (pendingItem) => {
    setPendingMembers((prev) =>
      prev.filter((item) => item.id !== pendingItem.id)
    );
    setMembers((prev) => [
      ...prev,
      {
        id: `approved-${pendingItem.id}`,
        name: pendingItem.fullName,
        role: pendingItem.role,
        address: pendingItem.zone,
        mobile: pendingItem.mobile,
        assignedCases: 0,
        isActive: true,
      },
    ]);
  };

  const handleReject = (id) => {
    setPendingMembers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleStatus = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (statusFilter === 'active' && !member.isActive) return false;
      if (statusFilter === 'inactive' && member.isActive) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = member.name.toLowerCase().includes(q);
        const matchZone = member.address.toLowerCase().includes(q);
        if (!matchName && !matchZone) return false;
      }

      return true;
    });
  }, [members, statusFilter, searchQuery]);

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={
        language === 'bikol'
          ? 'Mag-report nin Problema sa System'
          : 'Report a System Problem'
      }
    >
      <div className="lupon-members-container">
        {/* Top Date & Page Heading */}
        <header className="lupon-members-header">
          <p className="lupon-members-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
          <h1 className="lupon-members-title">Lupon Tagapamayapa</h1>
          <p className="lupon-members-subtitle">
            I-manage an access, availability, asin mediation assignments kan mga
            miyembro.
          </p>
        </header>

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
                    Mga Naghahalat nin Pag-apruba
                  </h2>
                  <span className="pending-banner-count">
                    {pendingMembers.length}
                  </span>
                </div>
                <p className="pending-banner-sub">
                  I-verify muna bago tawan nin access sa confidential KP cases.
                </p>
              </div>
            </div>

            {/* Table Column Header */}
            <div className="pending-table-head">
              <span>FULL NAME</span>
              <span>MOBILE NUMBER</span>
              <span>PUROK / ZONE</span>
              <span>DATE REGISTERED</span>
              <span>ASSIGNED ROLE</span>
              <span>ACTIONS</span>
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
                      <span>Aprubahan</span>
                    </button>
                    <button
                      type="button"
                      className="btn-reject-member"
                      onClick={() => handleReject(item.id)}
                    >
                      <X size={13} strokeWidth={2.3} />
                      <span>Tanggihan</span>
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
              Listahan kan mga Aktibong Miyembro
            </h2>
            <p className="active-members-sub">
              {members.length} registered Lupon members
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
                className="members-search-input"
                placeholder="Hanapon an pangaran o purok..."
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
                Lahat / All
              </button>
              <button
                type="button"
                className={`members-pill-btn ${
                  statusFilter === 'active' ? 'is-active' : ''
                }`}
                onClick={() => setStatusFilter('active')}
              >
                Aktibo / Active
              </button>
              <button
                type="button"
                className={`members-pill-btn ${
                  statusFilter === 'inactive' ? 'is-active' : ''
                }`}
                onClick={() => setStatusFilter('inactive')}
              >
                Naka-leave / Inactive
              </button>
            </div>
          </div>

          {/* Members Table Header */}
          <div className="members-table-head">
            <span>MEMBER</span>
            <span>ADDRESS</span>
            <span>MOBILE NUMBER</span>
            <span>ACTIVE KP CASES</span>
            <span>STATUS</span>
          </div>

          {/* Members Rows */}
          <div className="members-table-body">
            {filteredMembers.map((member) => (
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
                      ? 'assigned case'
                      : 'assigned cases'}
                  </span>
                </div>

                <div>
                  <button
                    type="button"
                    className={`member-status-pill ${
                      member.isActive ? 'is-active' : 'is-inactive'
                    }`}
                    onClick={() => handleToggleStatus(member.id)}
                  >
                    <span className="member-status-dot" aria-hidden="true" />
                    <span>
                      {member.isActive ? 'Aktibo' : 'Hindi Aktibo'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </LuponLayout>
  );
}

export default LuponMembers;
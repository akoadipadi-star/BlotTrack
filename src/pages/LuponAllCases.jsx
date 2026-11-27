import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  FileCheck2,
  Plus,
} from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import NewCaseModal from '../components/NewCaseModal';
import './LuponAllCases.css';

const INITIAL_CASES = [
  {
    id: '2026-001-001',
    parties: 'Juan Dela Cruz vs. Pedro Santos',
    type: 'KP CASE',
    typeKey: 'kp',
    nature: 'Collection Sum of Money',
    isWeekend: true,
    isPriority: true,
    submitted: 'Today, 8:42 AM',
    targetLabel: '2 days left',
    targetTone: 'peach',
    targetIcon: 'clock',
    canConvertToKp: false,
  },
  {
    id: '2026-010-001',
    parties: 'Mario Reyes',
    type: 'BLOTTER',
    typeKey: 'blotter',
    nature: 'Missing Item',
    isWeekend: true,
    isPriority: true,
    submitted: 'Today, 7:18 AM',
    targetLabel: 'For certification',
    targetTone: 'peach',
    targetIcon: 'doc',
    canConvertToKp: true,
  },
  {
    id: '2026-010-002',
    parties: 'Roberto Cruz vs. Daniel Go',
    type: 'KP CASE',
    typeKey: 'kp',
    nature: 'Property Boundary',
    isWeekend: false,
    isPriority: false,
    submitted: 'October 25, 4:32 PM',
    targetLabel: '4 days left',
    targetTone: 'green',
    targetIcon: 'clock',
    canConvertToKp: false,
  },
  {
    id: '2026-010-003',
    parties: 'Bless Roma',
    type: 'BLOTTER',
    typeKey: 'blotter',
    nature: 'Noise / Nuisance',
    isWeekend: false,
    isPriority: false,
    submitted: 'October 24, 2:15 PM',
    targetLabel: 'Verified',
    targetTone: 'green',
    targetIcon: 'docCheck',
    canConvertToKp: true,
  },
];

function LuponAllCases({ language = 'bikol', onLanguageChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases] = useState(INITIAL_CASES);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [natureFilter, setNatureFilter] = useState('all');
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  useEffect(() => {
    const incomingCase = location.state?.createdCase;
    if (!incomingCase) return;

    setCases((prev) => {
      if (prev.some((c) => c.id === incomingCase.id)) return prev;
      return [
        {
          id: incomingCase.id,
          parties: incomingCase.parties,
          type: 'KP CASE',
          typeKey: 'kp',
          nature: incomingCase.nature,
          isWeekend: false,
          isPriority: true,
          submitted: 'Just now',
          targetLabel: '15 days left',
          targetTone: 'green',
          targetIcon: 'clock',
          canConvertToKp: false,
        },
        ...prev,
      ];
    });
  }, [location.state]);

  const tabs = [
    { key: 'all', label: 'Lahat', count: cases.length + 8 },
    { key: 'blotter', label: 'Blotter' },
    { key: 'kp', label: 'KP Cases' },
    { key: 'priority', label: 'Priority' },
  ];

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      if (activeTab === 'blotter' && item.typeKey !== 'blotter') return false;
      if (activeTab === 'kp' && item.typeKey !== 'kp') return false;
      if (activeTab === 'priority' && !item.isPriority) return false;

      if (natureFilter !== 'all' && item.nature !== natureFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesParties = item.parties.toLowerCase().includes(q);
        if (!matchesId && !matchesParties) return false;
      }

      return true;
    });
  }, [cases, activeTab, natureFilter, searchQuery]);

  const handleCreateCase = (newRecord) => {
    setCases((prev) => [
      {
        id: newRecord.id,
        parties: newRecord.parties,
        type: 'KP CASE',
        typeKey: 'kp',
        nature: newRecord.nature,
        isWeekend: false,
        isPriority: true,
        submitted: 'Just now',
        targetLabel: '15 days left',
        targetTone: 'green',
        targetIcon: 'clock',
        canConvertToKp: false,
      },
      ...prev,
    ]);
  };

  const handleConvertToKp = (e, caseId) => {
    e.stopPropagation();
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              type: 'KP CASE',
              typeKey: 'kp',
              canConvertToKp: false,
            }
          : c
      )
    );
  };

  const renderTargetIcon = (iconType) => {
    if (iconType === 'doc') return <FileText size={13} strokeWidth={2} />;
    if (iconType === 'docCheck')
      return <FileCheck2 size={13} strokeWidth={2} />;
    return <Clock size={13} strokeWidth={2} />;
  };

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
      <div className="all-cases-container">
        {/* Top Date, Page Heading & Encode New Case CTA */}
        <header className="all-cases-header all-cases-header-row">
          <div>
            <p className="all-cases-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
            <h1 className="all-cases-title">Gabos na kaso</h1>
            <p className="all-cases-subtitle">Lista kan blotter asin KP case.</p>
          </div>

          <button
            type="button"
            className="all-cases-encode-btn"
            onClick={() => setIsNewCaseOpen(true)}
          >
            <Plus size={16} strokeWidth={2.4} />
            <span>
              {language === 'en'
                ? 'Encode New Case'
                : 'Mag-encode nin bagong kaso'}
            </span>
          </button>
        </header>

        {/* Weekend Priority Alert Banner */}
        <div className="weekend-priority-banner" role="status">
          <div className="weekend-banner-left">
            <Bell
              size={18}
              strokeWidth={2}
              className="weekend-banner-icon"
              aria-hidden="true"
            />
            <div>
              <p className="weekend-banner-title">
                3 weekend filings an kaipuhan nin priority review
              </p>
              <p className="weekend-banner-sub">
                Na-file Friday hanggang Sunday. Repasuhon muna an mga ini.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="weekend-banner-link"
            onClick={() => setActiveTab('priority')}
          >
            View priority cases
          </button>
        </div>

        {/* Main Table Card */}
        <section className="cases-card" aria-label="Cases table">
          {/* Tabs + Search / Nature Filter Bar */}
          <div className="cases-toolbar">
            <div className="cases-tabs" role="tablist">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`cases-tab-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="cases-tab-count">{tab.count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="cases-filters">
              <div className="cases-search-box">
                <Search
                  size={14}
                  strokeWidth={2}
                  className="cases-search-icon"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="cases-search-input"
                  placeholder="Pangalan o case number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="cases-nature-wrapper">
                <select
                  aria-label="Filter by nature"
                  className="cases-nature-select"
                  value={natureFilter}
                  onChange={(e) => setNatureFilter(e.target.value)}
                >
                  <option value="all">Nature</option>
                  <option value="Collection Sum of Money">
                    Collection Sum of Money
                  </option>
                  <option value="Missing Item">Missing Item</option>
                  <option value="Property Boundary">Property Boundary</option>
                  <option value="Noise / Nuisance">Noise / Nuisance</option>
                </select>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className="cases-nature-chevron"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Column Header Row */}
          <div className="cases-table-head">
            <span>CASE &amp; PARTIES</span>
            <span>TYPE</span>
            <span>SUBMITTED</span>
            <span>TARGET</span>
            <span aria-hidden="true" />
          </div>

          {/* Case Rows */}
          <div className="cases-table-body">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className="cases-table-row"
                onClick={() =>
                  navigate(`/lupon-cases/${item.id}`, { state: { caseItem: item } })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/lupon-cases/${item.id}`, {
                      state: { caseItem: item },
                    });
                  }
                }}
              >
                {/* Col 1: Case & Parties */}
                <div className="case-col-main">
                  <p className="case-id-text">{item.id}</p>
                  <p className="case-parties-text">{item.parties}</p>
                </div>

                {/* Col 2: Type Pill */}
                <div className="case-col-type">
                  <span
                    className={`case-type-pill ${
                      item.typeKey === 'kp' ? 'is-kp' : 'is-blotter'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Col 3: Submitted */}
                <div className="case-col-submitted">
                  {item.isWeekend && (
                    <span className="case-weekend-tag">WEEKEND</span>
                  )}
                  <p className="case-submitted-time">{item.submitted}</p>
                </div>

                {/* Col 4: Target Status Pill + Optional Convert to KP Button */}
                <div className="case-col-target">
                  <span
                    className={`case-target-pill is-${item.targetTone}`}
                  >
                    {renderTargetIcon(item.targetIcon)}
                    <span>{item.targetLabel}</span>
                  </span>

                  {item.canConvertToKp && (
                    <button
                      type="button"
                      className="convert-kp-btn"
                      onClick={(e) => handleConvertToKp(e, item.id)}
                    >
                      Convert to KP
                    </button>
                  )}
                </div>

                {/* Col 5: Chevron */}
                <div className="case-col-arrow">
                  <ChevronRight size={15} strokeWidth={2} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="cases-pagination-bar">
            <span className="cases-showing-text">
              Showing 1–{filteredCases.length} of {cases.length + 8} cases
            </span>

            <div className="cases-page-controls">
              <button type="button" className="cases-page-btn" disabled>
                Previous
              </button>
              <button type="button" className="cases-page-btn">
                Next
              </button>
            </div>
          </div>
        </section>
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

export default LuponAllCases;
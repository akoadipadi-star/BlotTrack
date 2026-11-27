import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Calendar, Eye } from 'lucide-react';
import LuponLayout from '../components/LuponLayout';
import './LuponArchive.css';

const ARCHIVED_RECORDS = [
  {
    id: '2025-006-018',
    nature: 'Collection Sum of Money',
    caseType: 'KP Case',
    parties: 'Lorna Reyes vs. Mila Cruz',
    dateClosed: 'December 18, 2025',
    monthKey: '2025-12',
    secretary: 'Maria Reyes',
    actionTaken: 'Mediated',
    actionTone: 'green',
  },
  {
    id: '2025-006-019',
    nature: 'Nawawalang Gamit',
    caseType: 'Blotter',
    parties: 'Rogelio Santos',
    dateClosed: 'November 7, 2025',
    monthKey: '2025-11',
    secretary: 'Maria Reyes',
    actionTaken: 'Certified',
    actionTone: 'blue',
  },
  {
    id: '2025-006-020',
    nature: 'Property Boundary',
    caseType: 'KP Case',
    parties: 'Alma Flores vs. Jose Lim',
    dateClosed: 'August 22, 2025',
    monthKey: '2025-08',
    secretary: 'Lourdes Garcia',
    actionTaken: 'Escalated to CFA',
    actionTone: 'peach',
  },
  {
    id: '2025-006-021',
    nature: 'Away-Kapitbahay',
    caseType: 'KP Case',
    parties: 'Teresa Ramos vs. Allan Go',
    dateClosed: 'June 14, 2025',
    monthKey: '2025-06',
    secretary: 'Lourdes Garcia',
    actionTaken: 'Mediated',
    actionTone: 'green',
  },
  {
    id: '2025-006-022',
    nature: 'Damage to Property',
    caseType: 'Blotter',
    parties: 'Nestor Diaz',
    dateClosed: 'October 3, 2025',
    monthKey: '2025-10',
    secretary: 'Ricardo Luna',
    actionTaken: 'Certified',
    actionTone: 'blue',
  },
];

function LuponArchive({ language = 'bikol', onLanguageChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('all');
  const [showDateMenu, setShowDateMenu] = useState(false);

  const content = {
    bikol: {
      reportBtn: 'Mag-report nin Problema sa System',
      eyebrow: 'MARTES, NOBYEMBRE 3, 2026',
      pageTitle: 'Mga Naka-arkibong Talaan',
      pageSubtitle:
        'Maghanap nin mga saradong rekord kan Blotter asin naresolberan na mga kaso.',
      cardTitle: 'Historical Records & Turnover',
      cardSub: 'Mga Nakaraang Talaan',
      searchPlaceholder: 'Case Number, Type, Status, o Partido',
      filterAll: 'All',
      filterBlotter: 'Blotter',
      filterKp: 'KP Case',
      dateRangeLabel: 'Date Range',
      allDatesOption: 'All Dates',
      yearOption: (yr) => `Taon ${yr}`,
      showingPrefix: 'Nagpapahiling nin',
      showingSuffix: 'naka-arkibong talaan',
      clearFilters: 'I-clear an gabos na filter',
      colCaseNo: 'CASE NO.',
      colCaseType: 'CASE TYPE',
      colParties: 'PARTIES INVOLVED',
      colDateClosed: 'DATE CLOSED / SETTLED',
      colSecretary: 'ENCODING SECRETARY',
      colActionTaken: 'ACTION TAKEN',
      colActions: 'ACTIONS',
      viewRecordBtn: 'View Record',
      emptySearch:
        'Mayo nin nahanap na naka-arkibong talaan para sa piniling filter.',
    },
    en: {
      reportBtn: 'Report a System Problem',
      eyebrow: 'TUESDAY, NOVEMBER 3, 2026',
      pageTitle: 'Archived Records',
      pageSubtitle:
        'Search closed Blotter entries and settled Katarungang Pambarangay cases.',
      cardTitle: 'Historical Records & Turnover',
      cardSub: 'Past Case Logs',
      searchPlaceholder: 'Case Number, Type, Status, or Party',
      filterAll: 'All',
      filterBlotter: 'Blotter',
      filterKp: 'KP Case',
      dateRangeLabel: 'Date Range',
      allDatesOption: 'All Dates',
      yearOption: (yr) => `Year ${yr}`,
      showingPrefix: 'Showing',
      showingSuffix: 'archived records',
      clearFilters: 'Clear all filters',
      colCaseNo: 'CASE NO.',
      colCaseType: 'CASE TYPE',
      colParties: 'PARTIES INVOLVED',
      colDateClosed: 'DATE CLOSED / SETTLED',
      colSecretary: 'ENCODING SECRETARY',
      colActionTaken: 'ACTION TAKEN',
      colActions: 'ACTIONS',
      viewRecordBtn: 'View Record',
      emptySearch:
        'No archived records match the current search or filter criteria.',
    },
  };

  const t = content[language === 'en' ? 'en' : 'bikol'];

  const typePills = [
    { key: 'All', label: t.filterAll },
    { key: 'Blotter', label: t.filterBlotter },
    { key: 'KP Case', label: t.filterKp },
  ];

  const filteredRecords = useMemo(() => {
    return ARCHIVED_RECORDS.filter((record) => {
      if (typeFilter !== 'All' && record.caseType !== typeFilter) {
        return false;
      }

      if (yearFilter !== 'all' && !record.dateClosed.includes(yearFilter)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchId = record.id.toLowerCase().includes(q);
        const matchNature = record.nature.toLowerCase().includes(q);
        const matchType = record.caseType.toLowerCase().includes(q);
        const matchParties = record.parties.toLowerCase().includes(q);
        const matchAction = record.actionTaken.toLowerCase().includes(q);
        const matchSecretary = record.secretary.toLowerCase().includes(q);
        if (
          !matchId &&
          !matchNature &&
          !matchType &&
          !matchParties &&
          !matchAction &&
          !matchSecretary
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, typeFilter, yearFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setYearFilter('all');
    setShowDateMenu(false);
  };

  return (
    <LuponLayout
      language={language}
      onLanguageChange={onLanguageChange}
      reportButtonLabel={t.reportBtn}
    >
      <div className="archive-page-container">
        {/* Top Date & Heading */}
        <header className="archive-page-header">
          <p className="archive-eyebrow">{t.eyebrow}</p>
          <h1 className="archive-title">{t.pageTitle}</h1>
          <p className="archive-subtitle">{t.pageSubtitle}</p>
        </header>

        {/* Historical Records & Turnover Card */}
        <section
          className="archive-card"
          aria-labelledby="historicalRecordsHeading"
        >
          {/* Card Section Header */}
          <div className="archive-card-header">
            <div className="archive-card-icon-box" aria-hidden="true">
              <FileText size={18} strokeWidth={2} />
            </div>
            <div>
              <h2
                id="historicalRecordsHeading"
                className="archive-card-title"
              >
                {t.cardTitle}
              </h2>
              <p className="archive-card-sub">{t.cardSub}</p>
            </div>
          </div>

          {/* Search Bar & Pill Filters */}
          <div className="archive-toolbar">
            <div className="archive-search-box">
              <Search
                size={15}
                strokeWidth={2}
                className="archive-search-icon"
                aria-hidden="true"
              />
              <input
                type="text"
                maxLength={80}
                className="archive-search-input"
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="archive-filter-group" role="group">
              {typePills.map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  className={`archive-pill-btn ${
                    typeFilter === pill.key ? 'is-active' : ''
                  }`}
                  onClick={() => setTypeFilter(pill.key)}
                >
                  {pill.label}
                </button>
              ))}

              <div className="archive-date-dropdown-wrap">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={showDateMenu}
                  className={`archive-pill-btn archive-pill-btn--date ${
                    yearFilter !== 'all' ? 'is-active' : ''
                  }`}
                  onClick={() => setShowDateMenu((prev) => !prev)}
                >
                  <Calendar size={14} strokeWidth={2} />
                  <span>
                    {yearFilter === 'all' ? t.dateRangeLabel : yearFilter}
                  </span>
                </button>

                {showDateMenu && (
                  <div className="archive-date-popover" role="listbox">
                    {['all', '2025', '2024'].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        role="option"
                        aria-selected={yearFilter === yr}
                        className={`archive-date-option ${
                          yearFilter === yr ? 'is-selected' : ''
                        }`}
                        onClick={() => {
                          setYearFilter(yr);
                          setShowDateMenu(false);
                        }}
                      >
                        {yr === 'all' ? t.allDatesOption : t.yearOption(yr)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Count + Clear all filters */}
          <div className="archive-meta-bar">
            <p className="archive-count-text">
              {t.showingPrefix} <strong>{filteredRecords.length}</strong>{' '}
              {t.showingSuffix}
            </p>
            <button
              type="button"
              className="archive-clear-link"
              onClick={handleClearFilters}
            >
              {t.clearFilters}
            </button>
          </div>

          {/* Table Column Header */}
          <div className="archive-table-head">
            <span>{t.colCaseNo}</span>
            <span>{t.colCaseType}</span>
            <span>{t.colParties}</span>
            <span>{t.colDateClosed}</span>
            <span>{t.colSecretary}</span>
            <span>{t.colActionTaken}</span>
            <span>{t.colActions}</span>
          </div>

          {/* Table Body Rows */}
          <div className="archive-table-body">
            {filteredRecords.length === 0 ? (
              <div className="archive-empty-state">
                <p>{t.emptySearch}</p>
                <button
                  type="button"
                  className="archive-reset-btn"
                  onClick={handleClearFilters}
                >
                  {t.clearFilters}
                </button>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <div key={record.id} className="archive-table-row">
                  <div>
                    <p className="archive-case-id">{record.id}</p>
                    <p className="archive-case-nature">{record.nature}</p>
                  </div>

                  <div>
                    <span
                      className={`archive-type-pill ${
                        record.caseType === 'KP Case' ? 'is-kp' : 'is-blotter'
                      }`}
                    >
                      {record.caseType}
                    </span>
                  </div>

                  <span className="archive-parties-text">{record.parties}</span>

                  <span className="archive-cell-text">{record.dateClosed}</span>

                  <span className="archive-cell-text">{record.secretary}</span>

                  <div>
                    <span
                      className={`archive-action-pill is-${record.actionTone}`}
                    >
                      {record.actionTaken}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/lupon-cases/${record.id}`}
                      state={{
                        caseItem: {
                          id: record.id,
                          parties: record.parties,
                          nature: record.nature,
                        },
                      }}
                      className="archive-view-btn"
                    >
                      <Eye size={13} strokeWidth={2} />
                      <span>{t.viewRecordBtn}</span>
                    </Link>
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

export default LuponArchive;
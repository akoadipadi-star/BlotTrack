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

  const filteredRecords = useMemo(() => {
    return ARCHIVED_RECORDS.filter((record) => {
      if (typeFilter !== 'All' && record.caseType !== typeFilter) {
        return false;
      }

      if (yearFilter !== 'all' && !record.dateClosed.includes(yearFilter)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = record.id.toLowerCase().includes(q);
        const matchNature = record.nature.toLowerCase().includes(q);
        const matchType = record.caseType.toLowerCase().includes(q);
        const matchParties = record.parties.toLowerCase().includes(q);
        const matchAction = record.actionTaken.toLowerCase().includes(q);
        if (
          !matchId &&
          !matchNature &&
          !matchType &&
          !matchParties &&
          !matchAction
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
      reportButtonLabel={
        language === 'bikol'
          ? 'Mag-report nin Problema sa System'
          : 'Report a System Problem'
      }
    >
      <div className="archive-page-container">
        {/* Top Date & Heading */}
        <header className="archive-page-header">
          <p className="archive-eyebrow">MARTES, NOBYEMBRE 3, 2026</p>
          <h1 className="archive-title">Mga Naka-arkibong Talaan</h1>
          <p className="archive-subtitle">
            Maghanap nin mga saradong rekord kan Blotter asin naresolberan na
            mga kaso.
          </p>
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
                Historical Records &amp; Turnover
              </h2>
              <p className="archive-card-sub">Mga Nakaraang Talaan</p>
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
                className="archive-search-input"
                placeholder="Case Number, Type, Status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="archive-filter-group" role="group">
              {['All', 'Blotter', 'KP Case'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`archive-pill-btn ${
                    typeFilter === type ? 'is-active' : ''
                  }`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </button>
              ))}

              <div className="archive-date-dropdown-wrap">
                <button
                  type="button"
                  className={`archive-pill-btn archive-pill-btn--date ${
                    yearFilter !== 'all' ? 'is-active' : ''
                  }`}
                  onClick={() => setShowDateMenu((prev) => !prev)}
                >
                  <Calendar size={14} strokeWidth={2} />
                  <span>
                    {yearFilter === 'all' ? 'Date Range' : yearFilter}
                  </span>
                </button>

                {showDateMenu && (
                  <div className="archive-date-popover">
                    {['all', '2025', '2024'].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        className={`archive-date-option ${
                          yearFilter === yr ? 'is-selected' : ''
                        }`}
                        onClick={() => {
                          setYearFilter(yr);
                          setShowDateMenu(false);
                        }}
                      >
                        {yr === 'all' ? 'All Dates' : `Year ${yr}`}
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
              Showing <strong>{filteredRecords.length}</strong> archived records
            </p>
            <button
              type="button"
              className="archive-clear-link"
              onClick={handleClearFilters}
            >
              Clear all filters
            </button>
          </div>

          {/* Table Column Header */}
          <div className="archive-table-head">
            <span>CASE NO.</span>
            <span>CASE TYPE</span>
            <span>PARTIES INVOLVED</span>
            <span>DATE CLOSED / SETTLED</span>
            <span>ENCODING SECRETARY</span>
            <span>ACTION TAKEN</span>
            <span>ACTIONS</span>
          </div>

          {/* Table Body Rows */}
          <div className="archive-table-body">
            {filteredRecords.map((record) => (
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
                    className="archive-view-btn"
                  >
                    <Eye size={13} strokeWidth={2} />
                    <span>View Record</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </LuponLayout>
  );
}

export default LuponArchive;
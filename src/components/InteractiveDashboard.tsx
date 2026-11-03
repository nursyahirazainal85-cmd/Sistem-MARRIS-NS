import React, { useState, useMemo } from 'react';
import { MarrisProject, UserProfile } from '../data/marrisTypes';
import rawProjectsData from '../data/projectsData.json';
import { 
  Download, RotateCcw, Search, Filter, CheckCircle2, AlertCircle, 
  Clock, FileSpreadsheet, Building2, MapPin, X, PlusCircle, ArrowLeft,
  ChevronLeft, ChevronRight, Edit3, DollarSign, TrendingUp
} from 'lucide-react';

interface InteractiveDashboardProps {
  currentUser: UserProfile | null;
  onBackToPortal: () => void;
  initialFilterAgency?: string;
  initialFilterSearch?: string;
}

export const InteractiveDashboard: React.FC<InteractiveDashboardProps> = ({
  currentUser,
  onBackToPortal,
  initialFilterAgency = '',
  initialFilterSearch = '',
}) => {
  // Master data in state so user can add/update in memory
  const [projects, setProjects] = useState<MarrisProject[]>(() => rawProjectsData as MarrisProject[]);

  // Filter States
  const [search, setSearch] = useState(initialFilterSearch);
  const [year, setYear] = useState('');
  const [scope, setScope] = useState('');
  const [dun, setDun] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');
  const [agency, setAgency] = useState(initialFilterAgency);
  const [sortPriority, setSortPriority] = useState('priority');

  // Quick filters inside Table panel
  const [scopeQuick, setScopeQuick] = useState('');
  const [statusQuick, setStatusQuick] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Modals
  const [detailProject, setDetailProject] = useState<MarrisProject | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Status Colors & Badges
  const statuses = ['SIAP', 'PEMBINAAN', 'PERANCANGAN', 'PEROLEHAN'];
  const statusColors: Record<string, string> = {
    SIAP: '#16835e',
    PEMBINAAN: '#1769aa',
    PERANCANGAN: '#9b6813',
    PEROLEHAN: '#bd5148',
  };

  const priorityRank: Record<string, number> = {
    PEMBINAAN: 0,
    PEROLEHAN: 1,
    PERANCANGAN: 2,
    SIAP: 3,
  };

  // Base list of unique filter options
  const yearsList = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.tahun && s.add(String(p.tahun)));
    return Array.from(s).sort((a, b) => Number(b) - Number(a));
  }, [projects]);

  const scopesList = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.skop && s.add(p.skop));
    return Array.from(s).sort((a, b) => a.localeCompare(b, 'ms'));
  }, [projects]);

  const dunsList = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.dun && s.add(p.dun));
    return Array.from(s).sort((a, b) => a.localeCompare(b, 'ms'));
  }, [projects]);

  const districtsList = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.daerah && s.add(p.daerah));
    return Array.from(s).sort((a, b) => a.localeCompare(b, 'ms'));
  }, [projects]);

  const agenciesList = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.agensi && s.add(p.agensi));
    return Array.from(s).sort((a, b) => a.localeCompare(b, 'ms'));
  }, [projects]);

  // Primary filtering (matching baseFiltered in HTML dashboard)
  const baseFiltered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter(x => {
      if (year && String(x.tahun) !== year) return false;
      if (scope && x.skop !== scope) return false;
      if (dun && x.dun !== dun) return false;
      if (district && x.daerah !== district) return false;
      if (status && x.status !== status) return false;
      if (agency && !String(x.agensi || '').toLowerCase().includes(agency.toLowerCase())) return false;
      if (q) {
        const combined = [x.tajuk, x.rujukan, x.kontraktor, x.agensi, x.daerah, x.dun, x.parlimen, x.skop]
          .join(' ')
          .toLowerCase();
        if (!combined.includes(q)) return false;
      }
      return true;
    });
  }, [projects, search, year, scope, dun, district, status, agency]);

  // Table secondary filtering (scopeQuick & statusQuick) and Sorting
  const tableFiltered = useMemo(() => {
    let list = baseFiltered.filter(x => {
      if (scopeQuick && x.skop !== scopeQuick) return false;
      if (statusQuick && x.status !== statusQuick) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortPriority === 'year-desc') return (Number(b.tahun) || 0) - (Number(a.tahun) || 0);
      if (sortPriority === 'spend-desc') return (Number(b.belanjaJumlah) || 0) - (Number(a.belanjaJumlah) || 0);
      if (sortPriority === 'contract-desc') return (Number(b.kontrak) || 0) - (Number(a.kontrak) || 0);
      if (sortPriority === 'name') return String(a.tajuk).localeCompare(String(b.tajuk), 'ms');
      return (
        (priorityRank[a.status] ?? 9) - (priorityRank[b.status] ?? 9) ||
        String(a.siap || '9999-12-31').localeCompare(String(b.siap || '9999-12-31')) ||
        (Number(a.tahun) || 0) - (Number(b.tahun) || 0)
      );
    });

    return list;
  }, [baseFiltered, scopeQuick, statusQuick, sortPriority]);

  // Calculations for KPI Cards & Financial Summary
  const kpiData = useMemo(() => {
    const totalProjects = baseFiltered.length;
    const totalContract = baseFiltered.reduce((sum, p) => sum + (Number(p.kontrak) || 0), 0);
    const totalSpend = baseFiltered.reduce((sum, p) => sum + (Number(p.belanjaJumlah) || 0), 0);
    const totalCeiling = baseFiltered.reduce((sum, p) => sum + (Number(p.siling) || 0), 0);
    const totalBalance = baseFiltered.reduce((sum, p) => sum + (Number(p.bakiKontrak) || 0), 0);
    const completedCount = baseFiltered.filter(p => p.status === 'SIAP').length;
    const completedPct = totalProjects > 0 ? ((completedCount / totalProjects) * 100).toFixed(1) : '0';
    const spendPct = totalContract > 0 ? ((totalSpend / totalContract) * 100).toFixed(1) : '0';

    return {
      totalProjects,
      totalContract,
      totalSpend,
      totalCeiling,
      totalBalance,
      completedCount,
      completedPct,
      spendPct,
    };
  }, [baseFiltered]);

  // District Breakdown for Bar Chart
  const districtChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    baseFiltered.forEach(p => {
      const d = p.daerah || 'PELBAGAI DAERAH';
      counts[d] = (counts[d] || 0) + 1;
    });
    const sorted = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    const max = Math.max(1, ...sorted.map(s => s.value));
    return { items: sorted.slice(0, 8), max };
  }, [baseFiltered]);

  // Scope Breakdown for Bar Chart
  const scopeChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    baseFiltered.forEach(p => {
      const sc = p.skop || 'LAIN-LAIN';
      counts[sc] = (counts[sc] || 0) + 1;
    });
    const sorted = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    const max = Math.max(1, ...sorted.map(s => s.value));
    return { items: sorted.slice(0, 7), max };
  }, [baseFiltered]);

  // Status Breakdown for Donut Chart
  const statusDonutData = useMemo(() => {
    const total = baseFiltered.length;
    const breakdown = statuses.map(s => {
      const count = baseFiltered.filter(p => p.status === s).length;
      const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0';
      return { status: s, count, pct: Number(pct), color: statusColors[s] };
    });

    // Create conic gradient stops
    let currentAngle = 0;
    const gradientStops: string[] = [];
    breakdown.forEach(b => {
      const angle = total > 0 ? (b.count / total) * 360 : 0;
      const endAngle = currentAngle + angle;
      gradientStops.push(`${b.color} ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    });

    const conicStyle = gradientStops.length > 0 && total > 0 
      ? `conic-gradient(${gradientStops.join(', ')})` 
      : '#e2e8f0';

    return { total, breakdown, conicStyle };
  }, [baseFiltered]);

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(tableFiltered.length / pageSize));
  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tableFiltered.slice(start, start + pageSize);
  }, [tableFiltered, page]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setYear('');
    setScope('');
    setDun('');
    setDistrict('');
    setStatus('');
    setAgency('');
    setSortPriority('priority');
    setScopeQuick('');
    setStatusQuick('');
    setPage(1);
  };

  // CSV Export
  const handleDownloadCSV = () => {
    const keys: (keyof MarrisProject)[] = [
      'bil', 'tajuk', 'rujukan', 'daerah', 'parlimen', 'dun', 'agensi', 'skop',
      'status', 'kontraktor', 'siling', 'kontrak', 'bakiSiling', 'belanja2425',
      'belanja2026', 'belanjaJumlah', 'bakiKontrak', 'mula', 'siap', 'fizSebenar', 'kewangan'
    ];
    const labels = [
      'BIL', 'TAJUK PROJEK', 'NO. RUJUKAN', 'DAERAH', 'PARLIMEN', 'DUN', 'AGENSI', 'SKOP',
      'STATUS', 'KONTRAKTOR', 'KELULUSAN SILING (RM)', 'HARGA KONTRAK (RM)', 'BAKI SILING (RM)',
      'BELANJA 2024/2025 (RM)', 'BELANJA 2026 (RM)', 'JUMLAH BELANJA (RM)', 'BAKI KONTRAK (RM)',
      'TARIKH MULA', 'TARIKH SIAP', 'FIZIKAL SEBENAR', 'KEWANGAN SEBENAR'
    ];

    const rows = tableFiltered.map(p =>
      keys.map(k => {
        const val = p[k];
        return `"${String(val ?? '').replace(/"/g, '""')}"`;
      }).join(',')
    );

    const csvContent = '\ufeff' + [labels.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MARRIS_NEGERI_SEMBILAN_DATA_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format Helper
  const rm = (val: number | string | undefined) => {
    const num = Number(val) || 0;
    return 'RM ' + num.toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const shortRM = (n: number) => {
    if (n >= 1e9) return 'RM ' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return 'RM ' + (n / 1e6).toFixed(2) + 'J';
    if (n >= 1e3) return 'RM ' + (n / 1e3).toFixed(1) + 'K';
    return rm(n);
  };

  // Handle Project Status / Payment Update
  const handleSaveProjectUpdate = (updated: MarrisProject) => {
    setProjects(prev => prev.map(p => p.bil === updated.bil ? updated : p));
    setDetailProject(updated);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#183247] pb-16 font-sans">
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={onBackToPortal}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Portal Rasmi</span>
                </button>
                <span className="text-[11px] font-extrabold tracking-wider text-blue-700 uppercase">
                  JABATAN KERJA RAYA · NEGERI SEMBILAN DARUL KHUSUS
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                DASHBOARD PEMANTAUAN PROJEK MARRIS
              </h1>
              <p className="text-xs text-slate-500">
                Ringkasan pelaksanaan fizikal dan kewangan projek jalan raya bagi semua agensi pelaksana
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="text-xs font-medium bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>DATA: OKTOBER 2026</span>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-yellow-400" />
                <span>Eksport CSV ({tableFiltered.length})</span>
              </button>

              {currentUser && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Daftar Projek Baharu</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Filters Section */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 items-end">
            {/* Search */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                CARI PROJEK / RUJUKAN / KONTRAKTOR
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Taip kata carian..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                TAHUN
              </label>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua tahun</option>
                {yearsList.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Skop Kerja */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                SKOP KERJA
              </label>
              <select
                value={scope}
                onChange={(e) => {
                  setScope(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua skop</option>
                {scopesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* DUN */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                DUN
              </label>
              <select
                value={dun}
                onChange={(e) => {
                  setDun(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua DUN</option>
                {dunsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Daerah */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                DAERAH
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua daerah</option>
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                STATUS
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua status</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Agensi */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                AGENSI
              </label>
              <select
                value={agency}
                onChange={(e) => {
                  setAgency(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="">Semua agensi</option>
                {agenciesList.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 text-[10px] uppercase">SUSUNAN KEUTAMAAN:</span>
              <select
                value={sortPriority}
                onChange={(e) => setSortPriority(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800"
              >
                <option value="priority">Keutamaan pemantauan (Pembinaan &gt; Siap)</option>
                <option value="year-desc">Tahun terkini</option>
                <option value="spend-desc">Perbelanjaan tertinggi</option>
                <option value="contract-desc">Harga kontrak tertinggi</option>
                <option value="name">Nama projek A–Z</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Set Semula Penapis</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>JUMLAH PROJEK</span>
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                ▤
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#102a43] tabular-nums">
              {kpiData.totalProjects.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Rekod projek dalam pilihan semasa</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>NILAI KONTRAK</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[11px]">
                RM
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 tabular-nums">
              {shortRM(kpiData.totalContract)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Jumlah harga kontrak fizikal</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>JUMLAH PERBELANJAAN</span>
              <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                ↗
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1769aa] tabular-nums">
              {shortRM(kpiData.totalSpend)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Perbelanjaan keseluruhan direkodkan</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>PROJEK SIAP</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1b9b75] tabular-nums">
              {kpiData.completedCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-semibold">
              {kpiData.completedPct}% daripada tapisan semasa
            </div>
          </div>
        </div>

        {/* Charts Grid: District breakdown & Status donut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Taburan Mengikut Daerah */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-[#102a43]">Taburan Projek Mengikut Daerah</h3>
                <p className="text-[11px] text-slate-400">Bilangan rekod projek ikut penapis aktif</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {districtChartData.items.map((item) => (
                <div key={item.label} className="grid grid-cols-12 items-center gap-2 text-xs">
                  <div className="col-span-4 sm:col-span-3 text-slate-600 font-semibold truncate" title={item.label}>
                    {item.label}
                  </div>
                  <div className="col-span-6 sm:col-span-7">
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1976b9] to-[#20bba9] rounded-full transition-all duration-500"
                        style={{ width: `${(item.value / districtChartData.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-bold text-slate-700 tabular-nums">
                    {item.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Pelaksanaan Donut Chart */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-sm font-extrabold text-[#102a43]">Status Pelaksanaan Projek</h3>
              <p className="text-[11px] text-slate-400">Komposisi status projek (SIAP, PEMBINAAN, PERANCANGAN, PEROLEHAN)</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center my-2">
              {/* Conic Donut Container */}
              <div
                className="w-32 h-32 rounded-full relative flex items-center justify-center shrink-0 shadow-inner"
                style={{ background: statusDonutData.conicStyle }}
              >
                <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="text-base font-extrabold text-slate-900 tabular-nums">
                    {statusDonutData.total.toLocaleString()}
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    PROJEK
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs w-full sm:w-auto">
                {statusDonutData.breakdown.map((b) => (
                  <div key={b.status} className="flex items-center gap-2 text-slate-700">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="font-semibold">{b.status}</span>
                    <strong className="ml-auto pl-3 font-bold text-slate-900 tabular-nums">
                      {b.count.toLocaleString()} ({b.pct}%)
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-100 text-center">
              Petunjuk status dikemaskini mengikut rekod perbelanjaan dan verifikasi JKR Negeri Sembilan.
            </div>
          </div>
        </div>

        {/* Lower Section: Ringkasan Kewangan & Skop Kerja Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Ringkasan Kewangan */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-[#102a43]">Ringkasan Kewangan MARRIS</h3>
              <p className="text-[11px] text-slate-400">Nilai bagi rekod projek yang ditapis</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Kelulusan Siling Peruntukan</span>
                <strong className="text-slate-900 font-bold tabular-nums">{rm(kpiData.totalCeiling)}</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Harga Kontrak / Sebutharga</span>
                <strong className="text-slate-900 font-bold tabular-nums">{rm(kpiData.totalContract)}</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Perbelanjaan Keseluruhan</span>
                <strong className="text-blue-700 font-bold tabular-nums">{rm(kpiData.totalSpend)}</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Baki Kontrak Semasa</span>
                <strong className="text-slate-700 font-bold tabular-nums">{rm(kpiData.totalBalance)}</strong>
              </div>
            </div>

            <div className="mt-3 pt-2">
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#16b8a6] to-[#1976b9] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Number(kpiData.spendPct), 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
                <span>Peratus perbelanjaan berbanding kontrak</span>
                <span className="font-bold text-slate-700">{kpiData.spendPct}%</span>
              </div>
            </div>
          </div>

          {/* Skop Kerja Utama */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-[#102a43]">Skop Kerja Utama Penyelenggaraan</h3>
              <p className="text-[11px] text-slate-400">Bilangan projek mengikut kategori skop fizikal</p>
            </div>

            <div className="space-y-2.5">
              {scopeChartData.items.map((item) => (
                <div key={item.label} className="grid grid-cols-12 items-center gap-2 text-xs">
                  <div className="col-span-4 sm:col-span-3 text-slate-600 font-semibold truncate" title={item.label}>
                    {item.label}
                  </div>
                  <div className="col-span-6 sm:col-span-7">
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${(item.value / scopeChartData.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-bold text-slate-700 tabular-nums">
                    {item.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Master Project Table Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-extrabold text-[#102a43]">SENARAI PROJEK MARRIS</h3>
              <p className="text-xs text-slate-500">
                Memaparkan <strong>{tableFiltered.length.toLocaleString()}</strong> rekod daripada {baseFiltered.length.toLocaleString()} rekod bertapis utama
              </p>
            </div>

            {/* Quick table filters matching original HTML dashboard */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div>
                <select
                  value={scopeQuick}
                  onChange={(e) => {
                    setScopeQuick(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
                >
                  <option value="">Semua skop kerja</option>
                  {scopesList.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={statusQuick}
                  onChange={(e) => {
                    setStatusQuick(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
                >
                  <option value="">Semua status</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <span className="text-[11px] text-slate-400 hidden sm:inline">Pilih baris untuk butiran</span>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto max-h-[560px] scrollbar-thin">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-50 z-10 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 w-12 text-center">BIL</th>
                  <th className="py-3 px-4 min-w-[280px]">TAJUK PROJEK / RUJUKAN</th>
                  <th className="py-3 px-3 min-w-[100px]">DAERAH</th>
                  <th className="py-3 px-3 min-w-[130px]">AGENSI</th>
                  <th className="py-3 px-3 min-w-[90px]">STATUS</th>
                  <th className="py-3 px-3 text-right min-w-[110px]">HARGA KONTRAK</th>
                  <th className="py-3 px-3 text-right min-w-[110px]">PERBELANJAAN</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">FIZIKAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Tiada rekod sepadan dengan tapisan semasa.
                    </td>
                  </tr>
                ) : (
                  paginatedProjects.map((p) => {
                    const isJKR = String(p.agensi || '').toUpperCase().includes('JKR');
                    const fizVal = p.fizSebenar !== '' && p.fizSebenar != null
                      ? (Number(p.fizSebenar) * 100).toFixed(1) + '%'
                      : '—';

                    return (
                      <tr
                        key={p.bil}
                        onClick={() => setDetailProject(p)}
                        className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-3 text-center text-slate-400 font-mono text-[11px]">
                          {p.bil}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 leading-snug line-clamp-2 max-w-[340px]">
                            {p.tajuk}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {p.rujukan || 'Rujukan: MARRIS/NS/2026'}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                          {p.daerah}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            isJKR ? 'bg-[#f4c928] text-slate-950 border border-amber-400' : 'text-slate-700 bg-slate-100'
                          }`}>
                            {p.agensi}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            p.status === 'SIAP' ? 'bg-[#e5f6ef] text-[#16835e]' :
                            p.status === 'PEMBINAAN' ? 'bg-[#e5f1fb] text-[#1769aa]' :
                            p.status === 'PERANCANGAN' ? 'bg-[#fff3dc] text-[#9b6813]' :
                            'bg-[#fbe9e7] text-[#bd5148]'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                          {rm(p.kontrak)}
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                          {rm(p.belanjaJumlah)}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-600 font-semibold tabular-nums">
                          {fizVal}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Paparan {tableFiltered.length > 0 ? (page - 1) * pageSize + 1 : 0} – {Math.min(page * pageSize, tableFiltered.length)} daripada {tableFiltered.length.toLocaleString()} rekod
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 font-semibold text-slate-700">
                Halaman {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-100/70 p-4 rounded-xl border border-slate-200">
          <strong>Nota Integriti Data:</strong> Papan pemuka ini berpandukan fail <em>MASTERLIST PROJEK MARRIS OKTOBER 2026</em> yang telah dibersihkan dan disahkan oleh Urusetia Jawatankuasa MARRIS Negeri Sembilan. Nilai kewangan dipaparkan berdasarkan medan asal kelulusan mesyuarat dan pekeliling edaran PKWNS. Sila sahkan sebarang variasi tuntutan interim melalui dokumen sumber perbendaharaan sebelum digunakan untuk kelulusan rasmi.
        </div>
      </div>

      {/* Detail Project Modal */}
      {detailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold tracking-wider text-blue-700 uppercase block">
                  BUTIRAN REKOD PROJEK MARRIS (BIL #{detailProject.bil})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
                  {detailProject.tajuk}
                </h3>
              </div>
              <button
                onClick={() => setDetailProject(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">NO. RUJUKAN</span>
                <strong className="text-slate-900 font-mono">{detailProject.rujukan || '—'}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">STATUS PELAKSANAAN</span>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                  detailProject.status === 'SIAP' ? 'bg-[#e5f6ef] text-[#16835e]' :
                  detailProject.status === 'PEMBINAAN' ? 'bg-[#e5f1fb] text-[#1769aa]' :
                  'bg-[#fff3dc] text-[#9b6813]'
                }`}>
                  {detailProject.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">DAERAH & KAWASAN</span>
                <strong className="text-slate-900">{detailProject.daerah} ({detailProject.dun || 'PELBAGAI DUN'})</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">AGENSI PELAKSANA</span>
                <strong className="text-blue-900">{detailProject.agensi}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">SKOP KERJA</span>
                <strong className="text-slate-900">{detailProject.skop}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">KAEDAH PEROLEHAN</span>
                <strong className="text-slate-900">{detailProject.kaedah}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">KONTRAKTOR / SYARIKAT</span>
                <strong className="text-slate-900 text-sm">{detailProject.kontraktor || 'Belum Dilantik / Dalam Tindakan Perolehan'}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">KELULUSAN SILING</span>
                <strong className="text-slate-900 tabular-nums">{rm(detailProject.siling)}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">HARGA KONTRAK</span>
                <strong className="text-emerald-700 tabular-nums">{rm(detailProject.kontrak)}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">JUMLAH PERBELANJAAN (BAYARAN)</span>
                <strong className="text-blue-700 tabular-nums">{rm(detailProject.belanjaJumlah)}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">BAKI KONTRAK</span>
                <strong className="text-slate-700 tabular-nums">{rm(detailProject.bakiKontrak)}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">TARIKH MULA</span>
                <strong className="text-slate-900">{detailProject.mula || '—'}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">TARIKH SIAP</span>
                <strong className="text-slate-900">{detailProject.siap || '—'}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">KEMAJUAN FIZIKAL SEBENAR</span>
                <strong className="text-slate-900">
                  {detailProject.fizSebenar !== '' && detailProject.fizSebenar != null 
                    ? (Number(detailProject.fizSebenar) * 100).toFixed(1) + '%' 
                    : 'Tidak direkodkan'}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">KEMAJUAN KEWANGAN</span>
                <strong className="text-slate-900">
                  {detailProject.kewangan !== '' && detailProject.kewangan != null 
                    ? (Number(detailProject.kewangan) * 100).toFixed(1) + '%' 
                    : 'Tidak direkodkan'}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">JENIS & RUJUKAN KELULUSAN</span>
                <strong className="text-slate-900">
                  {detailProject.jenisKelulusan} {detailProject.rujukanKelulusan ? `(${detailProject.rujukanKelulusan})` : ''}
                </strong>
              </div>

              {detailProject.catatan && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 sm:col-span-2 text-amber-900">
                  <span className="text-[10px] text-amber-700 font-bold block mb-0.5">CATATAN KHAS / STATUS BAYARAN</span>
                  <strong>{detailProject.catatan}</strong>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {currentUser && (
                <button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Kemaskini Kemajuan / Bayaran Interim</span>
                </button>
              )}

              <button
                onClick={() => setDetailProject(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl ml-auto"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Project Modal (Role Authenticated) */}
      {isUpdateModalOpen && detailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Kemaskini Rekod Projek (Bil #{detailProject.bil})
              </h3>
              <button onClick={() => setIsUpdateModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const newStatus = (form.elements.namedItem('status') as HTMLSelectElement).value;
                const newBelanja = Number((form.elements.namedItem('belanja') as HTMLInputElement).value) || detailProject.belanjaJumlah;
                const newFizikal = Number((form.elements.namedItem('fizikal') as HTMLInputElement).value) / 100;
                const newCatatan = (form.elements.namedItem('catatan') as HTMLInputElement).value;

                handleSaveProjectUpdate({
                  ...detailProject,
                  status: newStatus,
                  belanjaJumlah: newBelanja,
                  bakiKontrak: Math.max(0, detailProject.kontrak - newBelanja),
                  fizSebenar: isNaN(newFizikal) ? detailProject.fizSebenar : newFizikal,
                  catatan: newCatatan,
                });
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Projek</label>
                <select
                  name="status"
                  defaultValue={detailProject.status}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Perbelanjaan Terkini (RM)</label>
                <input
                  type="number"
                  name="belanja"
                  defaultValue={detailProject.belanjaJumlah}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peratus Kemajuan Fizikal Sebenar (%)</label>
                <input
                  type="number"
                  step="0.1"
                  max="100"
                  min="0"
                  name="fizikal"
                  defaultValue={detailProject.fizSebenar !== '' ? (Number(detailProject.fizSebenar) * 100).toFixed(1) : ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Terkini / Bayaran Interim</label>
                <input
                  type="text"
                  name="catatan"
                  defaultValue={detailProject.catatan}
                  placeholder="cth: BAYARAN INTERIM 11 / SIAP SEPENUHNYA"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase block">PERMOHONAN AGENSI</span>
                <h3 className="font-bold text-slate-900 text-base">Daftar Rekod Projek MARRIS Baharu</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const tajuk = (form.elements.namedItem('tajuk') as HTMLInputElement).value;
                const agensi = (form.elements.namedItem('agensi') as HTMLSelectElement).value;
                const daerah = (form.elements.namedItem('daerah') as HTMLSelectElement).value;
                const dun = (form.elements.namedItem('dun') as HTMLInputElement).value;
                const skop = (form.elements.namedItem('skop') as HTMLSelectElement).value;
                const siling = Number((form.elements.namedItem('siling') as HTMLInputElement).value) || 100000;
                const kontrak = Number((form.elements.namedItem('kontrak') as HTMLInputElement).value) || siling;

                const newBil = projects.length + 1;
                const newProject: MarrisProject = {
                  bil: newBil,
                  tajuk,
                  agensi,
                  daerah,
                  dun: dun || 'PELBAGAI DUN',
                  parlimen: 'SEREMBAN',
                  skop,
                  kaedah: 'SEBUTHARGA',
                  status: 'PERANCANGAN',
                  siling,
                  kontrak,
                  bakiSiling: Math.max(0, siling - kontrak),
                  iklan: '',
                  sst: '',
                  mula: '',
                  siap: '',
                  kontraktor: '',
                  belanja2425: '',
                  belanja2026: 0,
                  belanjaJumlah: 0,
                  bakiKontrak: kontrak,
                  sasaran2026: kontrak,
                  sasaran2027: '',
                  fizJadual: '',
                  fizSebenar: '',
                  kewangan: 0,
                  catatan: 'Permohonan baharu didaftarkan melalui Portal MARRIS',
                  rujukan: `MARRIS/NS/2026/${newBil}`,
                  tahun: 2026,
                  kuantiti: '',
                  unit: 'KM',
                  jenisKelulusan: 'MESYUARAT JK MARRIS',
                  rujukanKelulusan: 'BIL 3/2026',
                };

                setProjects(prev => [newProject, ...prev]);
                setIsAddModalOpen(false);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tajuk Penuh Projek</label>
                <textarea
                  name="tajuk"
                  required
                  rows={2}
                  placeholder="cth: KERJA-KERJA PENYELENGGARAAN JALAN DAN LONGKANG DI..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Agensi Pelaksana</label>
                  <select
                    name="agensi"
                    defaultValue={currentUser?.agencyShort || 'JKR SEREMBAN'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                  >
                    {agenciesList.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Daerah</label>
                  <select
                    name="daerah"
                    defaultValue="SEREMBAN"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                  >
                    {districtsList.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Skop Kerja</label>
                  <select
                    name="skop"
                    defaultValue="JALAN"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                  >
                    {scopesList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kawasan DUN</label>
                  <input
                    type="text"
                    name="dun"
                    placeholder="cth: AMPANGAN / CHENNAH"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Anggaran Siling (RM)</label>
                  <input
                    type="number"
                    name="siling"
                    defaultValue={100000}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Harga Kontrak / Anggaran (RM)</label>
                  <input
                    type="number"
                    name="kontrak"
                    defaultValue={100000}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-xs"
                >
                  Daftar Projek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onOpenDashboard: () => void;
  onOpenComplaint: () => void;
  totalProjects: number;
  totalContract: number;
  totalCompleted: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenDashboard,
  onOpenComplaint,
  totalProjects,
  totalContract,
  totalCompleted,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onOpenDashboard();
    }
  };

  const handleChipClick = (keyword: string) => {
    setSearchInput(keyword);
    onSearch(keyword);
    onOpenDashboard();
  };

  const fmtCurrency = (n: number) => {
    if (n >= 1e9) return 'RM ' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return 'RM ' + (n / 1e6).toFixed(1) + ' Juta';
    return 'RM ' + n.toLocaleString();
  };

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Controlled Darkness Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_negeri_sembilan_road_1793670299753.jpg"
          alt="Jalan Negeri Sembilan MARRIS"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        {/* State Motto Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-semibold mb-6 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Negeri Sembilan Darul Khusus · Bersih, Muafakat, Sejahtera</span>
        </div>

        {/* Main Header from slide */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Apa yang boleh kami bantu?
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal">
          Pusat maklumat bersepadu peruntukan, kemajuan fizikal dan penyelenggaraan jalan negeri MARRIS merentasi PBT, JKR, PDT dan JPS Negeri Sembilan.
        </p>

        {/* Interactive Hero Search Form */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
            <div className="flex-1 flex items-center pl-3 gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari jalan (cth: N16, N32), daerah, kontraktor, atau no rujukan..."
                className="w-full py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Cari Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Search Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
          <span className="text-slate-400">Carian popular:</span>
          {['Laluan N16', 'Jalan N32 Genting Peras', 'Penyelenggaraan Rutin', 'Cerun Runtuh', 'Seremban', 'Port Dickson', 'Jelebu'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleChipClick(tag)}
              className="hover:text-amber-300 underline underline-offset-4 cursor-pointer text-slate-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Fast Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <span>Buka Papan Pemuka Penuh ({totalProjects.toLocaleString()} Projek)</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>
          <button
            onClick={onOpenComplaint}
            className="px-5 py-2.5 bg-red-600/90 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <span>Sistem Aduan Jalan Negeri</span>
          </button>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="bg-slate-900/60 backdrop-blur-xs p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Jumlah Projek</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
              {totalProjects.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">Rekod aktif MARRIS 2026</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xs p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nilai Kontrak</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
              {fmtCurrency(totalContract)}
            </div>
            <div className="text-[10px] text-slate-400">Penyelenggaraan negeri</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xs p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Projek Siap</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 tabular-nums">
              {totalCompleted.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">{((totalCompleted / (totalProjects || 1)) * 100).toFixed(1)}% kejayaan fizikal</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xs p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span>Liputan Agensi</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              8 Daerah
            </div>
            <div className="text-[10px] text-slate-400">36 DUN Negeri Sembilan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

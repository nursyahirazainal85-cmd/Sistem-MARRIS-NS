import React from 'react';
import { JataNegeriSembilan, LogoJKR } from './Logos';

interface FooterProps {
  onOpenDashboard: () => void;
  onOpenComplaint: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDashboard, onOpenComplaint }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t-4 border-[#f4c928]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <JataNegeriSembilan className="w-10 h-10 shrink-0" />
              <LogoJKR className="w-10 h-10 shrink-0" />
              <div>
                <span className="font-extrabold text-amber-400 text-xs block tracking-wider">
                  KERAJAAN NEGERI SEMBILAN
                </span>
                <span className="font-black text-white text-sm sm:text-base tracking-tight block">
                  PORTAL MARRIS NEGERI SEMBILAN
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sistem Maklumat Rekod-Rekod Jalan Raya Malaysia (MARRIS) Negeri Sembilan Darul Khusus. Penyelarasan bersepadu bersama JKR, PBT, PDT, JPS dan Pejabat Kewangan Negeri Sembilan.
            </p>
            <div className="text-[11px] text-slate-400">
              Wisma Negeri, Jalan Dato' Abdul Malek, 70503 Seremban, Negeri Sembilan Darul Khusus.
            </div>
          </div>

          {/* Kolum 1: Pautan Pantas */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Pautan Pantas
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenDashboard} className="hover:text-amber-400 text-left transition-colors">
                  Papan Pemuka Projek
                </button>
              </li>
              <li>
                <button onClick={onOpenComplaint} className="hover:text-amber-400 text-left transition-colors">
                  Sistem Aduan Jalan
                </button>
              </li>
              <li>
                <a href="#kategori-pengguna" className="hover:text-amber-400 transition-colors">
                  Direktori Agensi Pelaksana
                </a>
              </li>
              <li>
                <a href="#profil-ketelusan" className="hover:text-amber-400 transition-colors">
                  Piagam Pelanggan
                </a>
              </li>
            </ul>
          </div>

          {/* Kolum 2: Agensi MARRIS */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Agensi MARRIS NS
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Jabatan Kerja Raya (JKR)</li>
              <li>Majlis Bandaraya Seremban (MBS)</li>
              <li>Majlis Perbandaran Port Dickson</li>
              <li>Majlis Perbandaran Jempol</li>
              <li>Majlis Daerah Jelebu, Tampin & KP</li>
              <li>Pejabat Daerah & Tanah (PDT)</li>
              <li>Jabatan Pengairan & Saliran (JPS)</li>
            </ul>
          </div>

          {/* Kolum 3: Pemantau Kewangan */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Pihak Berkuasa
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Pejabat Kewangan Negeri Sembilan (PKWNS)</li>
              <li>Urusetia Jawatankuasa MARRIS Negeri</li>
              <li>Kementerian Kerja Raya Malaysia</li>
              <li>Kementerian Kewangan Malaysia (MOF)</li>
              <li>Perbendaharaan Negeri Sembilan</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Kerajaan Negeri Sembilan Darul Khusus · Hak Cipta Terpelihara.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Dasar Privasi</span>
            <span>·</span>
            <span className="hover:text-slate-300">Dasar Keselamatan</span>
            <span>·</span>
            <span className="hover:text-slate-300">Penafian & Hakcipta</span>
            <span>·</span>
            <span className="text-amber-400/90 font-medium">Versi Masterlist 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

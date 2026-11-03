import React from 'react';
import { LayoutDashboard, FileSpreadsheet, AlertTriangle, BookOpen, ArrowUpRight } from 'lucide-react';

interface QuickAccessProps {
  onOpenDashboard: () => void;
  onOpenComplaint: () => void;
  onOpenGuidelines: () => void;
  onOpenFinanceSummary: () => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({
  onOpenDashboard,
  onOpenComplaint,
  onOpenGuidelines,
  onOpenFinanceSummary,
}) => {
  const items = [
    {
      id: 'dashboard',
      title: 'Papan Pemuka MARRIS',
      subtitle: 'Semak Status & Prestasi Projek',
      desc: 'Pantau kemajuan fizikal, status siap, dan perbelanjaan 2,422 projek jalan negeri terkini.',
      icon: LayoutDashboard,
      color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-100',
      badge: 'Interaktif',
      badgeColor: 'bg-amber-100 text-amber-800',
      action: onOpenDashboard,
    },
    {
      id: 'aduan',
      title: 'Buat Aduan Jalan',
      subtitle: 'Sistem Aduan Kerosakan Jalan',
      desc: 'Lapor kerosakan jalan berlubang (pothole), cerun runtuh, lampu jalan padam, atau longkang tersumbat.',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-700 border-red-200 group-hover:bg-red-100',
      badge: 'Saluran Rasmi',
      badgeColor: 'bg-red-100 text-red-800',
      action: onOpenComplaint,
    },
    {
      id: 'kewangan',
      title: 'Kelulusan Siling & Baucar',
      subtitle: 'Pengurusan Kewangan PKWNS',
      desc: 'Semak peruntukan siling negeri, baki kontrak, dan jadual tuntutan bayaran interim agensi pelaksana.',
      icon: FileSpreadsheet,
      color: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-100',
      badge: 'Kewangan',
      badgeColor: 'bg-blue-100 text-blue-800',
      action: onOpenFinanceSummary,
    },
    {
      id: 'panduan',
      title: 'Panduan & Tatacara MARRIS',
      subtitle: 'Garis Panduan & Pekeliling',
      desc: 'Tatacara pengurusan peruntukan pemberian jalan negeri mengikut Akta & Perlembagaan Persekutuan.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100',
      badge: 'Rujukan Rasmi',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      action: onOpenGuidelines,
    },
  ];

  return (
    <section id="akses-pantas" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
              3. AKSES PANTAS
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Urusan Utama & Perkhidmatan MARRIS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Pautan pantas ke modul pemantauan, pelaporan kerosakan, dan dokumen rujukan agensi serta orang awam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="group text-left p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 bg-white hover:bg-slate-50/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${item.color} transition-colors`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-base flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-2">{item.subtitle}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

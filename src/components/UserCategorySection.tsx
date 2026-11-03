import React, { useState } from 'react';
import { Building2, Landmark, Compass, Droplet, ShieldCheck, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRoleCategory, PRESET_USERS, UserProfile } from '../data/marrisTypes';

interface UserCategorySectionProps {
  onSelectRole: (role: UserRoleCategory) => void;
  onFilterByAgencyGroup: (groupPrefix: string) => void;
  onQuickLogin: (user: UserProfile) => void;
}

export const UserCategorySection: React.FC<UserCategorySectionProps> = ({
  onSelectRole,
  onFilterByAgencyGroup,
  onQuickLogin,
}) => {
  const [selectedTab, setSelectedTab] = useState<UserRoleCategory>('PBT');

  const categories = [
    {
      id: 'PBT' as UserRoleCategory,
      title: 'PBT (Pihak Berkuasa Tempatan)',
      sub: 'MBS, MPPD, MPJP, MDJ, MDT, MDKP',
      icon: Building2,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Bertanggungjawab ke atas penyelenggaraan jalan bandaran, penurapan semula taman perumahan, pembaikan longkang monsun, perabot jalan, dan lampu jalan perbandaran.',
      agencies: [
        'Majlis Bandaraya Seremban (MBS)',
        'MBS Cawangan Nilai',
        'Majlis Perbandaran Port Dickson (MPPD)',
        'Majlis Perbandaran Jempol (MPJP)',
        'Majlis Daerah Jelebu (MDJ)',
        'Majlis Daerah Tampin (MDT)',
        'Majlis Daerah Kuala Pilah (MDKP)'
      ],
      filterQuery: 'MAJLIS',
      demoUser: PRESET_USERS.find(u => u.roleCategory === 'PBT')
    },
    {
      id: 'JKR' as UserRoleCategory,
      title: 'JKR (Jabatan Kerja Raya)',
      sub: 'Ibu Pejabat, Daerah & Elektrik',
      icon: Landmark,
      color: 'bg-yellow-500 text-slate-900',
      lightColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Menguruskan rangkaian jalan negeri utama, kerja-kerja pembaikan cerun berisiko tinggi, laluan protokol, pemasangan lampu isyarat, dan pembaikan jambatan utama.',
      agencies: [
        'JKR Ibu Pejabat Negeri Sembilan',
        'JKR Daerah Seremban',
        'JKR Daerah Port Dickson',
        'JKR Daerah Jelebu',
        'JKR Daerah Jempol',
        'JKR Daerah Kuala Pilah',
        'JKR Daerah Tampin',
        'JKR Daerah Rembau',
        'JKR Cawangan Elektrik NS'
      ],
      filterQuery: 'JKR',
      demoUser: PRESET_USERS.find(u => u.roleCategory === 'JKR')
    },
    {
      id: 'PDT' as UserRoleCategory,
      title: 'PDT (Pejabat Daerah dan Tanah)',
      sub: '7 Daerah & PDK Gemas',
      icon: Compass,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Menyelenggara jalan-jalan kampung, memotong rumput berjadual, pembersihan longkang kampung, penggantian papan tanda nama kampung, dan kerja kecemasan setempat.',
      agencies: [
        'Pejabat Daerah Seremban',
        'Pejabat Daerah Port Dickson',
        'Pejabat Daerah Jelebu',
        'Pejabat Daerah Jempol',
        'Pejabat Daerah Kuala Pilah',
        'Pejabat Daerah Rembau',
        'Pejabat Daerah Tampin',
        'Pejabat Daerah Kecil Gemas'
      ],
      filterQuery: 'PEJABAT DAERAH',
      demoUser: PRESET_USERS.find(u => u.roleCategory === 'PDT')
    },
    {
      id: 'JPS' as UserRoleCategory,
      title: 'JPS (Jabatan Pengairan & Saliran)',
      sub: 'Pengairan & Saliran Daerah',
      icon: Droplet,
      color: 'bg-cyan-700',
      lightColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      description: 'Menguruskan jalan pertanian, jalan ban sungai, pengukuhan tebing runtuh, sistem saliran pengairan padi, dan jambatan konkrit pertanian di seluruh daerah.',
      agencies: [
        'JPS Daerah Seremban',
        'JPS Daerah Port Dickson',
        'JPS Daerah Jelebu',
        'JPS Daerah Jempol',
        'JPS Daerah Kuala Pilah',
        'JPS Daerah Rembau',
        'JPS Daerah Tampin'
      ],
      filterQuery: 'JPS',
      demoUser: PRESET_USERS.find(u => u.roleCategory === 'JPS')
    },
    {
      id: 'PKWNS' as UserRoleCategory,
      title: 'Pemantau & Urusetia Negeri',
      sub: 'PKWNS & Urusetia MARRIS NS',
      icon: ShieldCheck,
      color: 'bg-amber-700',
      lightColor: 'bg-amber-50 text-amber-900 border-amber-300',
      description: 'Peringkat kawalan dan kelulusan tertinggi: Pejabat Kewangan Negeri Sembilan mengawal peruntukan siling & baucar, manakala Urusetia MARRIS menyelaras mesyuarat dan laporan fizikal.',
      agencies: [
        'Pejabat Kewangan Negeri Sembilan (Bahagian Belanjawan & MARRIS)',
        'Urusetia Jawatankuasa MARRIS Negeri Sembilan',
        'Jawatankuasa Tindakan Pembangunan Negeri (JTPN)'
      ],
      filterQuery: '',
      demoUser: PRESET_USERS.find(u => u.roleCategory === 'PKWNS')
    },
  ];

  const currentCategory = categories.find(c => c.id === selectedTab) || categories[0];

  return (
    <section id="kategori-pengguna" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
            4. KATEGORI PENGGUNA
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pengguna & Pemantau MARRIS Negeri Sembilan
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ekosistem berpusat melibatkan agensi pelaksana fizikal (PBT, JKR, PDT, JPS) dan pihak pemantau pentadbiran (Urusetia MARRIS & Pejabat Kewangan Negeri Sembilan).
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.id}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl ${currentCategory.lightColor}`}>
                  <currentCategory.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{currentCategory.title}</h3>
                  <div className="text-xs font-medium text-slate-500">{currentCategory.sub}</div>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {currentCategory.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onFilterByAgencyGroup(currentCategory.filterQuery)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Papar Projek {currentCategory.id} di Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {currentCategory.demoUser && (
                  <button
                    onClick={() => onQuickLogin(currentCategory.demoUser!)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Log Masuk Demo ({currentCategory.demoUser.agencyShort})</span>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Agensi di bawah kategori ini:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {currentCategory.agencies.map((agency, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{agency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

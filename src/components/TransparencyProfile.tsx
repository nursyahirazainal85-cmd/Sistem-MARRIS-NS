import React, { useState } from 'react';
import { ShieldCheck, FileText, Scale, Award, Layers, CheckCircle } from 'lucide-react';

export const TransparencyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'charter' | 'procurement' | 'statute'>('charter');

  return (
    <section id="profil-ketelusan" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
            7. PROFIL & KETELUSAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tadbir Urus & Dasar Perolehan MARRIS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Komitmen Kerajaan Negeri Sembilan terhadap integriti, akauntabiliti, dan standard kualiti jalan raya negeri.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('charter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'charter'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Piagam Pelanggan
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'procurement'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Kaedah Perolehan Projek
          </button>
          <button
            onClick={() => setActiveTab('statute')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'statute'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Dasar & Punca Kuasa MARRIS
          </button>
        </div>

        {/* Tab 1: Piagam Pelanggan */}
        {activeTab === 'charter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm mb-3">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Respon Aduan 24 Jam</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap aduan kerosakan jalan raya yang diterima melalui sistem aduan akan disahkan dan diagihkan kepada jurutera daerah dalam tempoh 24 jam.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-sm mb-3">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Pembaikan Pothole 1–3 Hari</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tampalan kecemasan jalan berlubang (coldmix/hotmix/jetpatcher) dilaksanakan dalam tempoh 1 hingga 3 hari bekerja demi keselamatan pengguna.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm mb-3">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Bayaran Interim 14 Hari</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pejabat Kewangan Negeri Sembilan memproses tuntutan interim agensi pelaksana yang lengkap dalam tempoh 14 hari bekerja selepas pengesahan teknikal JKR.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm mb-3">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Ketelusan Data & Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyelarasan laporan fizikal dan perbelanjaan kewangan dikemaskini secara bulanan bagi mesyuarat jawatankuasa MARRIS Negeri Sembilan.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Kaedah Perolehan */}
        {activeTab === 'procurement' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <span>Kaedah Pelaksanaan & Perolehan Projek MARRIS Negeri Sembilan</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">Sebutharga Terbuka</span>
                <p className="text-slate-600 leading-relaxed">
                  Bagi projek bernilai antara RM50,000 hingga RM500,000. Dikeluarkan secara telus kepada kontraktor berdaftar CIDB Negeri Sembilan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">Cabutan Undi (Fasa 1, 2 & 3)</span>
                <p className="text-slate-600 leading-relaxed">
                  Peruntukan kerja-kerja penyelenggaraan kecil bawah RM100,000 bagi memberi peluang adil kepada kontraktor Bumiputera G1 di setiap daerah.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">Tender Terbuka Negeri</span>
                <p className="text-slate-600 leading-relaxed">
                  Bagi pakej kerja besar melebihi RM500,000 melibatkan pengukuhan cerun berskala besar, penurapan kaedah CIPR dan pembinaan jambatan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">Rundingan Terus / GLC Negeri</span>
                <p className="text-slate-600 leading-relaxed">
                  Khusus untuk pembaikan kritikal atau reka & bina melalui syarikat berkaitan kerajaan negeri (GLC seperti Negeri Roadstone Sdn Bhd & Gemencheh Granite Sdn Bhd).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dasar & Punca Kuasa */}
        {activeTab === 'statute' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              <span>Punca Kuasa & Garis Panduan MARRIS</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              Pemberian Jalan Negeri (MARRIS - Malaysian Road Records Information System) diperuntukkan di bawah <strong>Perkara 109(1)(b) Perlembagaan Persekutuan</strong> dan <strong>Bahagian II Jadual Kesepuluh</strong>. Kumpulan wang ini diwujudkan khas bagi tujuan pembiayaan kerja-kerja penyelenggaraan jalan raya berdaftar di dalam Daftar Jalan Negeri.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-0.5">Jalan Negeri Berdaftar</span>
                <span className="text-slate-500">Penyelenggaraan rutin, tampalan, pemotongan rumput dan garisan jalan.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-0.5">Jalan Pertanian & Ladang</span>
                <span className="text-slate-500">Laluan ladang, saliran parit dan jambatan konkrit di bawah seliaan JPS.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-0.5">Jalan Kampung & PBT</span>
                <span className="text-slate-500">Jalan perkampungan di bawah PDT dan jalan taman perumahan di bawah PBT.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

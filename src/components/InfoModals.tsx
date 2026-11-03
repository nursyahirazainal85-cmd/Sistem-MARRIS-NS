import React from 'react';
import { X, BookOpen, FileCheck, Download, Scale, DollarSign, Building } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Panduan & Tatacara MARRIS Negeri Sembilan</h3>
              <p className="text-xs text-slate-500">Garis Panduan Pengurusan Peruntukan Jalan Negeri</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Takrifan & Skop Kerja Dibenarkan</h4>
            <p className="leading-relaxed">
              Peruntukan Kumpulan Wang Rizab Jalan Negeri (MARRIS) hanya boleh dibelanjakan bagi maksud penyenggaraan jalan yang telah didaftarkan dalam Daftar Jalan Negeri mengikut syarat-syarat Perbendaharaan Malaysia dan Surat Pekeliling Kewangan Negeri Sembilan.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-slate-600">
              <li>Penyenggaraan Rutin: Memotong rumput, mencuci longkang, menampal lubang (pothole).</li>
              <li>Penyenggaraan Berkala: Penurapan semula permukaan (overlay/mill and pave), pembaharuan garisan jalan.</li>
              <li>Penyenggaraan Khusus / Jambatan & Cerun: Membaiki runtuhan cerun, membaiki struktur jambatan dan culvert konkrit.</li>
              <li>Perabot Jalan: Membaiki guardrail, papan tanda keselamatan dan lampu isyarat/lampu jalan.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Peranan Agensi Pelaksana</h4>
            <p className="leading-relaxed">
              Semua agensi pelaksana (PBT, JKR, PDT, JPS) hendaklah mengemukakan permohonan senarai projek untuk kelulusan Mesyuarat Jawatankuasa MARRIS yang dipengerusikan oleh Setiausaha Kerajaan Negeri Sembilan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Tatacara Bayaran Interim & Penutupan Akaun</h4>
            <p className="leading-relaxed">
              Tuntutan bayaran interim hendaklah disokong dengan Perakuan Bayaran Interim (IPC) yang ditandatangani oleh Pegawai Penguasa/Jurutera Daerah berserta bukti laporan kemajuan fizikal dan ujian kualiti premix.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={() => alert('Memuat turun fail Panduan_MARRIS_Negeri_Sembilan_Edisi_2026.pdf')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Muat Turun PDF (Edisi 2026)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCeiling: number;
  totalContract: number;
  totalSpend: number;
  totalBalance: number;
}

export const FinanceModal: React.FC<FinanceModalProps> = ({
  isOpen,
  onClose,
  totalCeiling,
  totalContract,
  totalSpend,
  totalBalance,
}) => {
  if (!isOpen) return null;

  const rm = (n: number) =>
    'RM ' + n.toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Ringkasan Siling & Peruntukan MARRIS</h3>
              <p className="text-xs text-slate-500">Pejabat Kewangan Negeri Sembilan (PKWNS)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Kelulusan Siling Keseluruhan:</span>
              <strong className="text-slate-900 text-sm font-bold">{rm(totalCeiling)}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Komitmen Harga Kontrak Diikat:</span>
              <strong className="text-emerald-700 text-sm font-bold">{rm(totalContract)}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Perbelanjaan (Baucar Dibayar):</span>
              <strong className="text-blue-700 text-sm font-bold">{rm(totalSpend)}</strong>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-700 font-bold">Baki Kontrak Belum Dibayar:</span>
              <strong className="text-slate-900 text-sm font-black">{rm(totalBalance)}</strong>
            </div>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 text-amber-900 text-xs space-y-1">
            <div className="font-bold">Agihan Siling Utama Mengikut Mesyuarat:</div>
            <div>• Mesyuarat JK MARRIS Bil. 3/2024 & Bil 3/2025: RM 154,200,000</div>
            <div>• Kelulusan Secara Edaran PKWNS (Projek Cerun & Jambatan Kecemasan): RM 45,800,000</div>
            <div>• Cabutan Undi Kontraktor G1 (Fasa 1, 2 & 3): RM 18,200,000</div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

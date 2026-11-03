import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink, HelpCircle, FileCheck } from 'lucide-react';

interface HelpContactProps {
  onOpenComplaint: () => void;
}

export const HelpContact: React.FC<HelpContactProps> = ({ onOpenComplaint }) => {
  const districtOffices = [
    { district: 'Ibu Pejabat JKR Negeri Sembilan', tel: '06-765 9000', email: 'jkrns@jkr.gov.my', addr: 'Tingkat 2, Blok B, Wisma Negeri, 70503 Seremban' },
    { district: 'Pejabat Kewangan Negeri Sembilan', tel: '06-765 9200', email: 'pkwns@ns.gov.my', addr: 'Tingkat 3, Blok A, Wisma Negeri, 70503 Seremban' },
    { district: 'JKR Daerah Seremban', tel: '06-762 4040', email: 'jkr.seremban@jkr.gov.my', addr: 'Jalan Labu Lama, 70200 Seremban' },
    { district: 'JKR Daerah Port Dickson', tel: '06-647 1313', email: 'jkr.pd@jkr.gov.my', addr: 'KM 1, Jalan Seremban, 71000 Port Dickson' },
    { district: 'JKR Daerah Kuala Pilah', tel: '06-481 1040', email: 'jkr.kp@jkr.gov.my', addr: 'Jalan Tampin, 72000 Kuala Pilah' },
    { district: 'JKR Daerah Jempol', tel: '06-458 1040', email: 'jkr.jempol@jkr.gov.my', addr: 'Bandar Seri Jempol, 72120 Jempol' },
    { district: 'JKR Daerah Jelebu', tel: '06-613 6240', email: 'jkr.jelebu@jkr.gov.my', addr: '71600 Kuala Klawang, Jelebu' },
    { district: 'JKR Daerah Rembau', tel: '06-685 1240', email: 'jkr.rembau@jkr.gov.my', addr: 'Jalan Hospital, 71300 Rembau' },
    { district: 'JKR Daerah Tampin', tel: '06-441 1240', email: 'jkr.tampin@jkr.gov.my', addr: 'Jalan Bunga Tanjung, 73000 Tampin' },
  ];

  return (
    <section id="bantuan-hubungan" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
              8. BANTUAN & HUBUNGAN
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Direktori & Khidmat Bantuan MARRIS
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenComplaint}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talian Kecemasan Kerosakan Jalan</span>
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {districtOffices.map((off, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">{off.district}</h3>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-mono">{off.tel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{off.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-snug">{off.addr}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Operating hours disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span><strong>Waktu Operasi Kaunter & Meja Bantuan:</strong> Isnin – Jumaat (8.00 pagi – 5.00 petang), Rehat: 1.00 petang – 2.00 petang (Jumaat: 12.15 tengah hari – 2.45 petang)</span>
          </div>
          <span className="text-slate-600 text-[11px]">Tutup pada Sabtu, Ahad & Cuti Kelepasan Am</span>
        </div>
      </div>
    </section>
  );
};

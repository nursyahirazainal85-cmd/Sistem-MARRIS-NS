import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle2, Search, MapPin } from 'lucide-react';
import { ComplaintData } from '../data/marrisTypes';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: ComplaintData[];
  onAddComplaint: (c: ComplaintData) => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isOpen,
  onClose,
  complaints,
  onAddComplaint,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');
  const [searchTracking, setSearchTracking] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);

  // Form states
  const [nama, setNama] = useState('');
  const [noTel, setNoTel] = useState('');
  const [daerah, setDaerah] = useState('Seremban');
  const [agensi, setAgensi] = useState('JKR Seremban');
  const [lokasi, setLokasi] = useState('');
  const [jenisKerosakan, setJenisKerosakan] = useState<ComplaintData['jenisKerosakan']>('Jalan Berlubang (Pothole)');
  const [keterangan, setKeterangan] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !noTel || !lokasi) return;

    const newId = `ADUAN-NS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newComplaint: ComplaintData = {
      id: newId,
      nama,
      noTel,
      agensi,
      daerah,
      lokasi,
      jenisKerosakan,
      keterangan,
      tarikhAduan: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Diterima',
    };

    onAddComplaint(newComplaint);
    setSuccessId(newId);
    // Reset form
    setNama('');
    setNoTel('');
    setLokasi('');
    setKeterangan('');
  };

  const filteredComplaints = complaints.filter(
    c => !searchTracking || c.id.toLowerCase().includes(searchTracking.toLowerCase()) || c.lokasi.toLowerCase().includes(searchTracking.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-red-700 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Sistem Aduan Kerosakan Jalan Negeri</h3>
              <p className="text-xs text-slate-500">Saluran aduan jalan berlubang, cerun, lampu jalan & perparitan MARRIS</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSuccessId(null);
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 mt-4 mb-4">
          <button
            onClick={() => {
              setActiveTab('form');
              setSuccessId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'form' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Borang Aduan Baharu
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'status' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semak Status Aduan ({complaints.length})
          </button>
        </div>

        {/* Success Alert */}
        {successId && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">Aduan Berjaya Dihantar!</span>
              <span>Nombor rujukan anda adalah <strong>{successId}</strong>. Agensi pelaksana daerah akan menjalankan siasatan mengikut Piagam Pelanggan.</span>
            </div>
          </div>
        )}

        {/* Form Tab */}
        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Pengadu / Penduduk</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="cth: Muhammad Danial"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombor Telefon</label>
                <input
                  type="tel"
                  required
                  value={noTel}
                  onChange={(e) => setNoTel(e.target.value)}
                  placeholder="cth: 019-1234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Daerah</label>
                <select
                  value={daerah}
                  onChange={(e) => setDaerah(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
                >
                  <option value="Seremban">Seremban</option>
                  <option value="Port Dickson">Port Dickson</option>
                  <option value="Jempol">Jempol</option>
                  <option value="Jelebu">Jelebu</option>
                  <option value="Kuala Pilah">Kuala Pilah</option>
                  <option value="Rembau">Rembau</option>
                  <option value="Tampin">Tampin</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Agensi Sasaran</label>
                <select
                  value={agensi}
                  onChange={(e) => setAgensi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
                >
                  <option value="JKR Seremban">JKR Negeri Sembilan / Daerah</option>
                  <option value="Majlis Bandaraya Seremban">PBT (Majlis Perbandaran/Daerah)</option>
                  <option value="Pejabat Daerah Seremban">PDT (Pejabat Daerah Jalan Kampung)</option>
                  <option value="JPS Seremban">JPS (Saliran & Jalan Pertanian)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis Kerosakan</label>
                <select
                  value={jenisKerosakan}
                  onChange={(e) => setJenisKerosakan(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
                >
                  <option value="Jalan Berlubang (Pothole)">Jalan Berlubang (Pothole)</option>
                  <option value="Cerun Runtuh">Cerun Runtuh</option>
                  <option value="Lampu Jalan Padam">Lampu Jalan Padam</option>
                  <option value="Longkang Tersumbat / Runtuh">Longkang Tersumbat / Runtuh</option>
                  <option value="Papan Tanda Rosak">Papan Tanda / Guardrail Rosak</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Lokasi Kerosakan / Nama Jalan / Landmark</label>
              <input
                type="text"
                required
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="cth: KM 4.5 Jalan Kuala Klawang - Genting Peras (N32) berdekatan Simpang Chennah"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Keterangan Lanjut</label>
              <textarea
                rows={3}
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Huraikan saiz lubang, bahaya kepada kenderaan, atau masa kejadian..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-amber-500 font-medium resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hantar Aduan</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs">
            {/* Search box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                placeholder="Cari no rujukan (cth: ADUAN-NS-...) atau lokasi..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="space-y-3">
              {filteredComplaints.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Tiada rekod aduan dijumpai.</div>
              ) : (
                filteredComplaints.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-amber-700">{c.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'Tindakan Pembaikan'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 text-sm">{c.jenisKerosakan}</div>
                    <div className="text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{c.lokasi} ({c.daerah})</span>
                    </div>
                    {c.keterangan && <p className="mt-1 text-slate-500 italic">"{c.keterangan}"</p>}
                    <div className="mt-2 text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span>Pengadu: {c.nama}</span>
                      <span>Tarikh: {c.tarikhAduan}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

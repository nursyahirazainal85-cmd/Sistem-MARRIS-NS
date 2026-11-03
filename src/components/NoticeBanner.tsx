import React, { useState } from 'react';
import { Megaphone, AlertCircle, ChevronRight, X, Calendar } from 'lucide-react';
import { NOTICES, NoticeItem } from '../data/marrisTypes';

export const NoticeBanner: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  return (
    <>
      {/* 5. NOTIS PENTING STRIP */}
      <div className="bg-amber-500 text-slate-950 border-y border-amber-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-950 text-amber-300 font-extrabold rounded-md text-[10px] uppercase tracking-wider shrink-0">
                <Megaphone className="w-3 h-3 text-amber-400" />
                Notis Penting
              </span>
              <p className="font-semibold truncate max-w-xl sm:max-w-3xl">
                {NOTICES[0].title}
              </p>
            </div>
            <button
              onClick={() => setSelectedNotice(NOTICES[0])}
              className="text-[11px] font-bold text-slate-950 underline hover:text-black flex items-center gap-0.5 shrink-0 ml-auto sm:ml-0"
            >
              <span>Lihat Semua Notis</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Notice Details Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Senarai Notis & Hebahan MARRIS</h3>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {NOTICES.map((n) => (
                <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-semibold">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      {n.date}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                      {n.type}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    {n.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

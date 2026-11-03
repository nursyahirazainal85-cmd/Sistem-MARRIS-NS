import React, { useState } from 'react';
import { NEWS_ITEMS, NewsArticle } from '../data/marrisTypes';
import { Calendar, MapPin, ArrowRight, X } from 'lucide-react';

export const NewsActivities: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="berita-aktiviti" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
              6. BERITA & AKTIVITI
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Program & Perkembangan Projek Semasa
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Liputan perkembangan pembaikan jalan raya, pengukuhan cerun dan pemantauan berkala MARRIS Negeri Sembilan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_ITEMS.map((item, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => setActiveArticle(item)}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer bg-white"
              >
                {/* Image header */}
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={isFirst ? '/src/assets/images/istana_seri_menanti_ns_1793670319278.jpg' : '/src/assets/images/hero_negeri_sembilan_road_1793670299753.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-amber-700 font-bold">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {item.district}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>Baca Laporan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-2 font-semibold">
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span className="text-amber-700 font-bold">{activeArticle.district}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {activeArticle.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeArticle.summary}
              </p>
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">Maklumat Pelaksanaan:</div>
                <div>Peruntukan: Kumpulan Wang Rizab Jalan Negeri (MARRIS) Negeri Sembilan</div>
                <div>Penyeliaan: JKR Negeri Sembilan / Urusetia MARRIS</div>
                <div>Status: Disahkan melalui Mesyuarat Jawatankuasa MARRIS Negeri Sembilan</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

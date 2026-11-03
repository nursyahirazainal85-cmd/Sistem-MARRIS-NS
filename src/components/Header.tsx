import React, { useState } from 'react';
import { JataNegeriSembilan, LogoJKR } from './Logos';
import { UserProfile } from '../data/marrisTypes';
import { LogIn, LogOut, User, Globe, ChevronDown, LayoutDashboard, FileText, Phone, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  activeView: 'portal' | 'dashboard';
  setActiveView: (view: 'portal' | 'dashboard') => void;
  onOpenComplaint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenLogin,
  onLogout,
  activeView,
  setActiveView,
  onOpenComplaint,
}) => {
  const [lang, setLang] = useState<'BM' | 'EN'>('BM');
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Royal State Flag Ribbon (Negeri Sembilan Trim: Yellow, Red, Black) */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/2 bg-[#f4c928]" title="Kuning Diraja Negeri Sembilan"></div>
        <div className="w-1/4 bg-[#dc2626]" title="Merah Rakyat"></div>
        <div className="w-1/4 bg-[#0f172a]" title="Hitam Undang"></div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Zone: Jata NS + JKR Emblem + Text */}
          <div 
            onClick={() => setActiveView('portal')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="flex items-center gap-2 shrink-0">
              <JataNegeriSembilan className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs transition-transform group-hover:scale-105" />
              <LogoJKR className="w-10 h-10 sm:w-11 sm:h-11 transition-transform group-hover:scale-105" />
            </div>
            <div className="leading-tight">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-amber-700 uppercase block">
                KERAJAAN NEGERI SEMBILAN DARUL KHUSUS
              </span>
              <h1 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                PORTAL MARRIS NEGERI SEMBILAN
              </h1>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Penyelenggaraan Jalan Negeri · JKR, PBT, PDT, JPS & PKWNS
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => setActiveView('portal')}
              className={`hover:text-amber-700 transition-colors whitespace-nowrap py-1 ${
                activeView === 'portal' ? 'text-amber-700 border-b-2 border-amber-500 font-bold' : ''
              }`}
            >
              Laman Utama
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-1.5 hover:text-amber-700 transition-colors whitespace-nowrap py-1 ${
                activeView === 'dashboard' ? 'text-amber-700 border-b-2 border-amber-500 font-bold' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-600" />
              Papan Pemuka MARRIS
            </button>
            <a
              href="#akses-pantas"
              onClick={() => activeView !== 'portal' && setActiveView('portal')}
              className="hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              Akses Pantas
            </a>
            <a
              href="#kategori-pengguna"
              onClick={() => activeView !== 'portal' && setActiveView('portal')}
              className="hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              Agensi Pelaksana
            </a>
            <button
              onClick={onOpenComplaint}
              className="flex items-center gap-1 hover:text-red-700 text-slate-700 transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-red-600" />
              Aduan Jalan
            </button>
            <a
              href="#bantuan-hubungan"
              onClick={() => activeView !== 'portal' && setActiveView('portal')}
              className="hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              Hubungi
            </a>
          </nav>

          {/* Right Controls: Language & Login */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setLang('BM')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  lang === 'BM' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                BM
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  lang === 'EN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* User Logged in State vs Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${currentUser.roleCategory === 'PKWNS' ? 'bg-amber-500' : currentUser.roleCategory === 'JKR' ? 'bg-yellow-500' : 'bg-blue-600'}`}></span>
                  <span className="max-w-[120px] sm:max-w-[160px] truncate">{currentUser.agencyShort}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                    <div className="border-b border-slate-100 pb-2.5 mb-2.5">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Log Masuk Sebagai</div>
                      <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                      <div className="text-slate-600 font-medium text-[11px]">{currentUser.designation}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.badgeColor}`}>
                        {currentUser.agencyShort} · {currentUser.accessLevel}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setActiveView('dashboard');
                          setUserDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" />
                        Papan Pemuka MARRIS
                      </button>
                      <button
                        onClick={() => {
                          onOpenComplaint();
                          setUserDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        Semak / Hantar Aduan
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 font-medium text-red-600 flex items-center gap-2 border-t border-slate-100 mt-1.5 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-yellow-400" />
                <span>Log Masuk Agensi</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PRESET_USERS, UserProfile, UserRoleCategory } from '../data/marrisTypes';
import { JataNegeriSembilan, LogoJKR } from './Logos';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRoleCategory>('PKWNS');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  const handlePresetSelect = (user: UserProfile) => {
    onLogin(user);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = PRESET_USERS.find(u => u.roleCategory === selectedRole) || PRESET_USERS[0];
    const customUser: UserProfile = {
      ...existing,
      email: emailInput || existing.email,
      name: emailInput ? emailInput.split('@')[0].toUpperCase() : existing.name,
    };
    onLogin(customUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <JataNegeriSembilan className="w-10 h-10" />
            <LogoJKR className="w-10 h-10" />
            <div>
              <span className="text-[10px] font-extrabold tracking-wider text-amber-700 uppercase block">
                LOG MASUK SISTEM MARRIS
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Penyelenggaraan Jalan Negeri Sembilan
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Role Selection Grid */}
        <div className="mt-5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Pilih Profil Peranan (Satu Klik untuk Masuk Demo):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {PRESET_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handlePresetSelect(user)}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${user.badgeColor}`}>
                      {user.roleCategory}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{user.accessLevel}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs group-hover:text-amber-800 transition-colors">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{user.agencyName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Or Manual Form */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Agensi</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRoleCategory)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="PKWNS">Pejabat Kewangan Negeri Sembilan (PKWNS)</option>
                  <option value="URUS_SETIA">Urusetia MARRIS Negeri Sembilan</option>
                  <option value="JKR">Jabatan Kerja Raya (JKR)</option>
                  <option value="PBT">Pihak Berkuasa Tempatan (PBT)</option>
                  <option value="PDT">Pejabat Daerah dan Tanah (PDT)</option>
                  <option value="JPS">Jabatan Pengairan dan Saliran (JPS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ID Pengguna / Emel</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="nama@ns.gov.my"
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kata Laluan</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Pilih profil di atas atau tekan log masuk untuk mod rasmi.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
              >
                Log Masuk Portal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

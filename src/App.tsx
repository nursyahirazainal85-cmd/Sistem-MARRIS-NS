/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import rawProjectsData from './data/projectsData.json';
import { MarrisProject, UserProfile, PRESET_USERS, ComplaintData } from './data/marrisTypes';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuickAccess } from './components/QuickAccess';
import { UserCategorySection } from './components/UserCategorySection';
import { NoticeBanner } from './components/NoticeBanner';
import { NewsActivities } from './components/NewsActivities';
import { TransparencyProfile } from './components/TransparencyProfile';
import { HelpContact } from './components/HelpContact';
import { Footer } from './components/Footer';
import { InteractiveDashboard } from './components/InteractiveDashboard';
import { LoginModal } from './components/LoginModal';
import { ComplaintModal } from './components/ComplaintModal';
import { GuidelinesModal, FinanceModal } from './components/InfoModals';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => PRESET_USERS[0]); // default logged in as PKWNS for rich preview
  const [activeView, setActiveView] = useState<'portal' | 'dashboard'>('portal');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);

  // Filter transfer from hero search or agency click into dashboard
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
  const [dashboardAgencyQuery, setDashboardAgencyQuery] = useState('');

  // Initial complaints list
  const [complaints, setComplaints] = useState<ComplaintData[]>([
    {
      id: 'ADUAN-NS-948201',
      nama: 'En. Razak Bin Kassim',
      noTel: '012-3456789',
      agensi: 'JKR Daerah Jelebu',
      daerah: 'Jelebu',
      lokasi: 'KM 14.2 Jalan Kuala Klawang - Genting Peras (N32)',
      jenisKerosakan: 'Jalan Berlubang (Pothole)',
      keterangan: 'Lubang sedalam 4 inci di lorong kiri menuju ke Genting Peras, merbahaya untuk motosikal.',
      tarikhAduan: '01 Nov 2026',
      status: 'Tindakan Pembaikan',
    },
    {
      id: 'ADUAN-NS-839102',
      nama: 'Puan Siti Aminah',
      noTel: '013-8910293',
      agensi: 'Majlis Bandaraya Seremban',
      daerah: 'Seremban',
      lokasi: 'Persiaran S2/F Seremban 2 berhampiran simpang sekolah',
      jenisKerosakan: 'Lampu Jalan Padam',
      keterangan: 'Dua tiang lampu jalan padam sejak semalam.',
      tarikhAduan: '30 Okt 2026',
      status: 'Selesai',
    },
    {
      id: 'ADUAN-NS-728194',
      nama: 'En. Tan Chee Keong',
      noTel: '016-9281940',
      agensi: 'JKR Daerah Port Dickson',
      daerah: 'Port Dickson',
      lokasi: 'Jalan Tanah Merah (Site C) - Chuah (N4)',
      jenisKerosakan: 'Longkang Tersumbat / Runtuh',
      keterangan: 'Tebing parit tepi jalan mendap selepas hujan lebat.',
      tarikhAduan: '26 Okt 2026',
      status: 'Dalam Siasatan',
    },
  ]);

  const projects = rawProjectsData as MarrisProject[];

  // High-level aggregates
  const totalProjects = projects.length;
  const totalContract = useMemo(() => projects.reduce((s, p) => s + (Number(p.kontrak) || 0), 0), [projects]);
  const totalSpend = useMemo(() => projects.reduce((s, p) => s + (Number(p.belanjaJumlah) || 0), 0), [projects]);
  const totalCeiling = useMemo(() => projects.reduce((s, p) => s + (Number(p.siling) || 0), 0), [projects]);
  const totalBalance = useMemo(() => projects.reduce((s, p) => s + (Number(p.bakiKontrak) || 0), 0), [projects]);
  const totalCompleted = useMemo(() => projects.filter(p => p.status === 'SIAP').length, [projects]);

  // Quick actions
  const handleHeroSearch = (query: string) => {
    setDashboardSearchQuery(query);
    setDashboardAgencyQuery('');
    setActiveView('dashboard');
  };

  const handleFilterByAgencyGroup = (groupPrefix: string) => {
    setDashboardAgencyQuery(groupPrefix);
    setDashboardSearchQuery('');
    setActiveView('dashboard');
  };

  const handleQuickLogin = (user: UserProfile) => {
    setCurrentUser(user);
    // Optionally open dashboard with agency filter
    if (user.roleCategory === 'JKR' || user.roleCategory === 'PBT' || user.roleCategory === 'PDT' || user.roleCategory === 'JPS') {
      setDashboardAgencyQuery(user.agencyShort);
      setActiveView('dashboard');
    }
  };

  const handleAddComplaint = (c: ComplaintData) => {
    setComplaints(prev => [c, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* 1. HEADER (Logo, menu dan pilihan bahasa, role indicator) */}
      <Header
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenComplaint={() => setIsComplaintModalOpen(true)}
      />

      {/* Main View Router */}
      {activeView === 'dashboard' ? (
        <InteractiveDashboard
          currentUser={currentUser}
          onBackToPortal={() => setActiveView('portal')}
          initialFilterAgency={dashboardAgencyQuery}
          initialFilterSearch={dashboardSearchQuery}
        />
      ) : (
        <main className="flex-1">
          {/* 5. NOTIS PENTING (Marquee/Notice strip below header for high visibility) */}
          <NoticeBanner />

          {/* 2. HERO & CARIAN (Apa yang boleh kami bantu?) */}
          <HeroSection
            onSearch={handleHeroSearch}
            onOpenDashboard={() => {
              setDashboardSearchQuery('');
              setDashboardAgencyQuery('');
              setActiveView('dashboard');
            }}
            onOpenComplaint={() => setIsComplaintModalOpen(true)}
            totalProjects={totalProjects}
            totalContract={totalContract}
            totalCompleted={totalCompleted}
          />

          {/* 3. AKSES PANTAS */}
          <QuickAccess
            onOpenDashboard={() => {
              setDashboardSearchQuery('');
              setDashboardAgencyQuery('');
              setActiveView('dashboard');
            }}
            onOpenComplaint={() => setIsComplaintModalOpen(true)}
            onOpenGuidelines={() => setIsGuidelinesModalOpen(true)}
            onOpenFinanceSummary={() => setIsFinanceModalOpen(true)}
          />

          {/* 4. KATEGORI PENGGUNA (PBT, JKR, PDT, JPS, Urusetia MARRIS & PKWNS) */}
          <UserCategorySection
            onSelectRole={(role) => {
              const demo = PRESET_USERS.find(u => u.roleCategory === role);
              if (demo) handleQuickLogin(demo);
            }}
            onFilterByAgencyGroup={handleFilterByAgencyGroup}
            onQuickLogin={handleQuickLogin}
          />

          {/* 6. BERITA & AKTIVITI */}
          <NewsActivities />

          {/* 7. PROFIL & KETELUSAN */}
          <TransparencyProfile />

          {/* 8. BANTUAN & HUBUNGAN */}
          <HelpContact onOpenComplaint={() => setIsComplaintModalOpen(true)} />
        </main>
      )}

      {/* 9. FOOTER */}
      <Footer
        onOpenDashboard={() => {
          setDashboardSearchQuery('');
          setDashboardAgencyQuery('');
          setActiveView('dashboard');
        }}
        onOpenComplaint={() => setIsComplaintModalOpen(true)}
      />

      {/* Interactive Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(user) => setCurrentUser(user)}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        complaints={complaints}
        onAddComplaint={handleAddComplaint}
      />

      <GuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      <FinanceModal
        isOpen={isFinanceModalOpen}
        onClose={() => setIsFinanceModalOpen(false)}
        totalCeiling={totalCeiling}
        totalContract={totalContract}
        totalSpend={totalSpend}
        totalBalance={totalBalance}
      />
    </div>
  );
}

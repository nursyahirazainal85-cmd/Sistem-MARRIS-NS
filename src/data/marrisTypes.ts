export interface MarrisProject {
  bil: number;
  agensi: string;
  tajuk: string;
  skop: string;
  kaedah: string;
  status: 'SIAP' | 'PEMBINAAN' | 'PERANCANGAN' | 'PEROLEHAN' | string;
  siling: number;
  kontrak: number;
  bakiSiling: number;
  iklan: string;
  sst: string;
  mula: string;
  siap: string;
  kontraktor: string;
  belanja2425: number | string;
  belanja2026: number | string;
  belanjaJumlah: number;
  bakiKontrak: number;
  sasaran2026: number | string;
  sasaran2027: number | string;
  fizJadual: number | string;
  fizSebenar: number | string;
  kewangan: number | string;
  catatan: string;
  rujukan: string;
  tahun: number;
  parlimen: string;
  dun: string;
  daerah: string;
  kuantiti: number | string;
  unit: string;
  jenisKelulusan: string;
  rujukanKelulusan: string;
}

export type UserRoleCategory = 'PBT' | 'JKR' | 'PDT' | 'JPS' | 'URUS_SETIA' | 'PKWNS' | 'AWAM';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roleCategory: UserRoleCategory;
  agencyName: string;
  agencyShort: string;
  district: string;
  badgeColor: string;
  designation: string;
  accessLevel: 'Pentadbir Negeri' | 'Pemantau Kewangan' | 'Agensi Pelaksana' | 'Pengguna Awam';
}

export const PRESET_USERS: UserProfile[] = [
  {
    id: 'pkwns-1',
    name: 'Dato\' Pegawai Kewangan Negeri',
    email: 'kewangan@ns.gov.my',
    roleCategory: 'PKWNS',
    agencyName: 'Pejabat Kewangan Negeri Sembilan (PKWNS)',
    agencyShort: 'PKWNS',
    district: 'Seremban',
    badgeColor: 'bg-amber-600 text-white',
    designation: 'Pegawai Kewangan Negeri / Pengawal Peruntukan MARRIS',
    accessLevel: 'Pemantau Kewangan'
  },
  {
    id: 'urusetia-1',
    name: 'Ketua Penolong Pengarah (Jalan Negeri)',
    email: 'urusetia.marris@ns.gov.my',
    roleCategory: 'URUS_SETIA',
    agencyName: 'Urusetia Jawatankuasa MARRIS Negeri Sembilan',
    agencyShort: 'Urusetia MARRIS',
    district: 'Negeri Sembilan',
    badgeColor: 'bg-red-700 text-white',
    designation: 'Penyelaras Utama Pemantauan Fizikal & Teknikal',
    accessLevel: 'Pentadbir Negeri'
  },
  {
    id: 'jkr-s-1',
    name: 'Ir. Ahmad Zulkifli (Jurutera Daerah)',
    email: 'jkr.seremban@jkr.gov.my',
    roleCategory: 'JKR',
    agencyName: 'JKR Daerah Seremban',
    agencyShort: 'JKR SEREMBAN',
    district: 'SEREMBAN',
    badgeColor: 'bg-yellow-500 text-slate-900',
    designation: 'Jurutera Daerah JKR Seremban',
    accessLevel: 'Agensi Pelaksana'
  },
  {
    id: 'pbt-mbs-1',
    name: 'Ir. Hajah Norlia (Pengarah Kejuruteraan)',
    email: 'kejuruteraan@mbs.gov.my',
    roleCategory: 'PBT',
    agencyName: 'Majlis Bandaraya Seremban (MBS)',
    agencyShort: 'MAJLIS BANDARAYA SEREMBAN',
    district: 'SEREMBAN',
    badgeColor: 'bg-blue-600 text-white',
    designation: 'Pengarah Jabatan Kejuruteraan MBS',
    accessLevel: 'Agensi Pelaksana'
  },
  {
    id: 'pdt-jp-1',
    name: 'En. Khairul Azizi (Pegawai Teknikal PDT)',
    email: 'pdt.jempol@ns.gov.my',
    roleCategory: 'PDT',
    agencyName: 'Pejabat Daerah dan Tanah Jempol',
    agencyShort: 'PEJABAT DAERAH JEMPOL',
    district: 'JEMPOL',
    badgeColor: 'bg-emerald-600 text-white',
    designation: 'Pegawai Penyelaras Jalan Kampung PDT Jempol',
    accessLevel: 'Agensi Pelaksana'
  },
  {
    id: 'jps-pd-1',
    name: 'Ts. Mohd Nizam (Jurutera Parit & Saliran)',
    email: 'jps.portdickson@jps.gov.my',
    roleCategory: 'JPS',
    agencyName: 'JPS Daerah Port Dickson',
    agencyShort: 'JPS DAERAH PORT DICKSON',
    district: 'PORT DICKSON',
    badgeColor: 'bg-cyan-700 text-white',
    designation: 'Jurutera Daerah JPS Port Dickson',
    accessLevel: 'Agensi Pelaksana'
  }
];

export interface NoticeItem {
  id: string;
  date: string;
  type: 'Mesyuarat' | 'Kelulusan' | 'Kewangan' | 'Pemberitahuan';
  title: string;
  urgency: 'high' | 'normal';
}

export const NOTICES: NoticeItem[] = [
  {
    id: 'notis-1',
    date: '02 Nov 2026',
    type: 'Mesyuarat',
    title: 'Mesyuarat Jawatankuasa MARRIS Negeri Sembilan Bil 3/2026 dijadualkan pada 12 November 2026 di Wisma Negeri, Seremban.',
    urgency: 'high'
  },
  {
    id: 'notis-2',
    date: '28 Okt 2026',
    type: 'Kewangan',
    title: 'Peringatan Penghantaran Baucar & Tuntutan Bayaran Interim Akhir Tahun 2026 sebelum 15 Disember 2026 ke Pejabat Kewangan Negeri.',
    urgency: 'high'
  },
  {
    id: 'notis-3',
    date: '20 Okt 2026',
    type: 'Kelulusan',
    title: 'Kelulusan Pindaan Siling Projek Penyelenggaraan Rutin Jalan Kampung Fasa 3 telah disahkan melalui Pekeliling PKWNS.400-3/1/3.',
    urgency: 'normal'
  },
  {
    id: 'notis-4',
    date: '15 Okt 2026',
    type: 'Pemberitahuan',
    title: 'Sistem Kemaskini Laporan Fizikal dan Laporan Prestasi Kontraktor kini dibuka bagi suku tahun keempat 2026.',
    urgency: 'normal'
  }
];

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  date: string;
  district: string;
  summary: string;
  imageAlt: string;
}

export const NEWS_ITEMS: NewsArticle[] = [
  {
    id: 'berita-1',
    category: 'Penyelenggaraan Berkala',
    title: 'Kerja Penurapan Semula Jalan Protokol N29 Seri Menanti - Tanjung Ipoh Selesai Mengikut Jadual',
    date: '28 Oktober 2026',
    district: 'Kuala Pilah',
    summary: 'Projek sepanjang 16KM di laluan utama diraja telah berjaya disiapkan dengan standard kualiti asfalt terkini dan pembaikan perabot jalan.',
    imageAlt: 'Kerja penurapan jalan Seri Menanti'
  },
  {
    id: 'berita-2',
    category: 'Mitigasi Bencana & Cerun',
    title: 'Projek Reka & Bina Pengukuhan Cerun Bahaya Seksyen 32.8 Jalan Genting Peras (N32) Jelebu Beroperasi Lancar',
    date: '24 Oktober 2026',
    district: 'Jelebu',
    summary: 'Tindakan proaktif JKR dan JPS menangani hakisan lereng bukit bagi memastikan keselamatan pengguna laluan pergunungan sempadan Selangor-Negeri Sembilan.',
    imageAlt: 'Pengukuhan cerun jalan Jelebu'
  },
  {
    id: 'berita-3',
    category: 'Keselamatan Komuniti',
    title: 'Pemasangan Lampu Jalan Solar dan Pembaharuan Garisan Jalan di 44 DUN Negeri Sembilan',
    date: '19 Oktober 2026',
    district: 'Seluruh Negeri Sembilan',
    summary: 'Inisiatif MARRIS negeri tahun 2026 memperkukuh pencahayaan jalan malam di kawasan perkampungan, simpang berbahaya dan zon sekolah.',
    imageAlt: 'Pemasangan lampu jalan solar MARRIS'
  },
  {
    id: 'berita-4',
    category: 'Infrastruktur Bandar',
    title: 'MBS & MPPD Tingkatkan Penyelenggaraan Longkang Monsun dan Parit Utama Menjelang Monsun Timur Laut',
    date: '12 Oktober 2026',
    district: 'Seremban & Port Dickson',
    summary: 'Kerja-kerja pengorekan, naik taraf culvert konkrit dan penyelenggaraan tebing saliran bandar bagi mengelak risiko banjir kilat.',
    imageAlt: 'Penyelenggaraan longkang bandar'
  }
];

export interface ComplaintData {
  id: string;
  nama: string;
  noTel: string;
  agensi: string;
  daerah: string;
  lokasi: string;
  jenisKerosakan: 'Jalan Berlubang (Pothole)' | 'Cerun Runtuh' | 'Lampu Jalan Padam' | 'Longkang Tersumbat / Runtuh' | 'Papan Tanda Rosak' | 'Lain-lain';
  keterangan: string;
  tarikhAduan: string;
  status: 'Diterima' | 'Dalam Siasatan' | 'Tindakan Pembaikan' | 'Selesai';
}

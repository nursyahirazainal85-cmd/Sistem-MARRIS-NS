import React from 'react';

// Jata Negeri Sembilan Darul Khusus
export const JataNegeriSembilan: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jata Negeri Sembilan">
      {/* Background soft shield outline */}
      <defs>
        <linearGradient id="jataGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="jataRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>

      {/* Main Shield Outline */}
      <path
        d="M80 18 C115 18 138 35 138 75 C138 118 96 148 80 155 C64 148 22 118 22 75 C22 35 45 18 80 18 Z"
        fill="url(#jataGold)"
        stroke="#1e293b"
        strokeWidth="3.5"
      />

      {/* Inner Red Triangular/Quadrant Division of State Flag Colors */}
      <path
        d="M80 23 L133 75 C133 112 95 142 80 149 Z"
        fill="#0f172a"
      />
      <path
        d="M80 23 L27 75 C27 112 65 142 80 149 Z"
        fill="url(#jataRed)"
      />

      {/* Nine Pointed Star at the Top / Bintang Sembilan */}
      <g transform="translate(80, 22)">
        <circle cx="0" cy="-7" r="11" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
        <path
          d="M0 -16 L3 -10 L10 -10 L5 -5 L7 2 L0 -2 L-7 2 L-5 -5 L-10 -10 L-3 -10 Z"
          fill="#fef08a"
        />
      </g>

      {/* Sembilan Tangkai Padi (Paddy Stalks encircling shield) */}
      <path
        d="M32 90 C28 65 35 45 50 32"
        stroke="#fef08a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M128 90 C132 65 125 45 110 32"
        stroke="#fef08a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Keris Changi dan Sarung Bersilang */}
      {/* Keris 1 (Right diagonal) */}
      <line x1="50" y1="120" x2="110" y2="52" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="50" y1="120" x2="110" y2="52" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      {/* Keris Hilt & Guard */}
      <path d="M46 122 C42 126 44 133 50 134 C55 132 54 125 50 122 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />
      
      {/* Keris 2 / Sarung (Left diagonal) */}
      <line x1="110" y1="120" x2="50" y2="52" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="110" y1="120" x2="50" y2="52" stroke="#7f1d1d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 122 C118 126 116 133 110 134 C105 132 106 125 110 122 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />

      {/* Center Crown / Motif */}
      <circle cx="80" cy="85" r="16" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
      <text x="80" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f" fontFamily="sans-serif">9</text>

      {/* Banner below shield */}
      <path
        d="M40 148 Q80 162 120 148 Q100 156 80 156 Q60 156 40 148 Z"
        fill="#fde047"
        stroke="#78350f"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Logo Jabatan Kerja Raya (JKR) Malaysia / Negeri Sembilan
export const LogoJKR: React.FC<{ className?: string; withLabel?: boolean }> = ({ 
  className = 'w-12 h-12', 
  withLabel = false 
}) => {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 150 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo JKR Negeri Sembilan">
        {/* Outer Hexagon / Shield in JKR Yellow */}
        <polygon
          points="75,8 138,42 138,108 75,142 12,108 12,42"
          fill="#f4c928"
          stroke="#1e293b"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Black border line */}
        <polygon
          points="75,17 129,47 129,103 75,133 21,103 21,47"
          fill="#facc15"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Industrial Gear / Construction Symbol Motif in Center */}
        <circle cx="75" cy="75" r="38" fill="#182230" />
        <circle cx="75" cy="75" r="28" fill="#f4c928" />

        {/* JKR Bold Typography */}
        <text
          x="75"
          y="83"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="1"
          fill="#0f172a"
        >
          JKR
        </text>

        {/* Technical Arch Curve Top */}
        <path d="M45 48 Q75 35 105 48" stroke="#182230" strokeWidth="4" strokeLinecap="round" />
        {/* Foundation Base Line */}
        <path d="M50 110 L100 110" stroke="#182230" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {withLabel && (
        <div className="leading-tight">
          <div className="text-[13px] font-black tracking-wider text-slate-900">JKR NEGERI SEMBILAN</div>
          <div className="text-[10px] font-semibold text-slate-600">JABATAN KERJA RAYA</div>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

export default function Header() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Set target date to 2026-06-13 00:00:00
    const targetDate = new Date('2026-06-13T00:00:00+08:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-[var(--color-moss)] text-white px-5 md:px-10 py-6 md:py-8 rounded-b-[24px] md:rounded-none md:border-b border-[#73A557] shadow-sm z-10 shrink-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full z-0 opacity-80" preserveAspectRatio="xMidYMax slice" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#81B267" opacity="0" />
            <stop offset="100%" stopColor="#527840" opacity="0.5" />
          </linearGradient>
        </defs>

        {/* Sky fade */}
        <rect width="100%" height="100%" fill="url(#skyGradient)" />

        {/* Sun */}
        <circle cx="85%" cy="50" r="35" fill="#FDE047" opacity="0.6" />
        
        {/* Distant Mountains */}
        <path d="M-50 160 L80 90 L200 170 L320 80 L450 180 L580 90 L700 180 L800 110 L850 160 L850 240 L-50 240 Z" fill="#679152" opacity="0.6"/>

        {/* Snow Peaks */}
        <path d="M80 90 L115 113 L100 125 L80 110 L60 125 L45 113 Z" fill="#FFFFFF" opacity="0.5" />
        <path d="M320 80 L360 111 L345 125 L320 102 L295 125 L280 111 Z" fill="#FFFFFF" opacity="0.5" />
        <path d="M580 90 L615 117 L600 130 L580 112 L560 130 L545 117 Z" fill="#FFFFFF" opacity="0.5" />
        <path d="M800 110 L815 121 L805 130 L800 125 L795 130 L785 121 Z" fill="#FFFFFF" opacity="0.5" />

        {/* Midground Hills */}
        <path d="M-50 240 Q150 150 400 200 T850 170 L850 240 L-50 240 Z" fill="#5E834A" />

        {/* Foreground Grassland */}
        <path d="M-50 240 Q250 190 500 220 T850 200 L850 240 L-50 240 Z" fill="#4D6B3C" />

        {/* Pine Trees Left */}
        <g fill="#37522A">
          <path d="M120 180 L110 205 L130 205 Z" />
          <path d="M120 170 L112 195 L128 195 Z" />
          <path d="M120 160 L115 180 L125 180 Z" />
          
          <path d="M150 190 L142 215 L158 215 Z" />
          <path d="M150 180 L144 205 L156 205 Z" />
          <path d="M150 170 L147 190 L153 190 Z" />
        </g>

        {/* Pine Trees Right */}
        <g fill="#3A552C">
          <path d="M650 170 L635 205 L665 205 Z" />
          <path d="M650 155 L640 190 L660 190 Z" />
          <path d="M650 140 L645 170 L655 170 Z" />
          
          <path d="M690 185 L680 215 L700 215 Z" />
          <path d="M690 170 L683 200 L697 200 Z" />
          <path d="M690 155 L686 180 L694 180 Z" />
        </g>
        
        {/* Yurt */}
        <g transform="translate(380, 185)">
          <path d="M0 20 Q 25 -5 50 20 L50 35 L0 35 Z" fill="#F8FAFC" opacity="0.95" />
          <path d="M0 20 Q 25 -5 50 20" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M5 25 L45 25" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M5 30 L45 30" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M20 22 L30 22 L30 35 L20 35 Z" fill="#94A3B8" />    
        </g>

        {/* Floating clouds */}
        <path d="M150 50 Q 160 40 170 50 Q 190 45 195 55 Q 200 65 180 65 L150 65 Q 135 65 145 55 Q 140 45 150 50 Z" fill="#FFFFFF" opacity="0.3" />
        <path d="M550 70 Q 560 60 570 70 Q 585 65 590 75 Q 595 85 580 85 L550 85 Q 540 85 545 75 Q 540 65 550 70 Z" fill="#FFFFFF" opacity="0.2" />
        <path d="M300 40 Q 315 30 325 40 Q 340 35 345 45 Q 350 55 330 55 L300 55 Q 285 55 295 45 Q 290 35 300 40 Z" fill="#FFFFFF" opacity="0.15" />

      </svg>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-moss)]/90 via-[var(--color-moss)]/40 to-transparent"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <div className="text-[28px] md:text-3xl font-black tracking-tight flex items-baseline gap-2 leading-none">
            新疆12日行程
          </div>
          <div className="flex items-center gap-1.5 opacity-90 mt-2">
             <MapPin size={14} />
             <h1 className="text-[14px] font-bold tracking-wider">北疆自由行</h1>
          </div>
        </div>
        
        {timeLeft && (
          <div className="bg-white/10 border border-white/20 backdrop-blur-md px-3 py-2 font-mono rounded-2xl flex flex-col items-center shrink-0">
            <span className="text-[9px] uppercase tracking-widest font-black text-white/80 mb-1 flex items-center gap-1">
              <Clock size={10} />
              出發倒數
            </span>
            <div className="flex items-center gap-1.5 text-lg font-black leading-none">
              <div className="flex flex-col items-center">
                <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-sans opacity-70 uppercase tracking-widest mt-0.5 text-white/80">Day</span>
              </div>
              <span className="self-start -mt-0.5 opacity-40 text-sm">:</span>
              <div className="flex flex-col items-center">
                <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-sans opacity-70 uppercase tracking-widest mt-0.5 text-white/80">Hr</span>
              </div>
              <span className="self-start -mt-0.5 opacity-40 text-sm">:</span>
              <div className="flex flex-col items-center">
                <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-sans opacity-70 uppercase tracking-widest mt-0.5 text-white/80">Min</span>
              </div>
              <span className="self-start -mt-0.5 opacity-40 text-sm">:</span>
              <div className="flex flex-col items-center w-5">
                <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-sans opacity-70 uppercase tracking-widest mt-0.5 text-white/80">Sec</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

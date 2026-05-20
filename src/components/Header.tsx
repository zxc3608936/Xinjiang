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
      <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop" alt="那拉提大草原背景" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-moss)]/90 via-[var(--color-moss)]/40 to-[var(--color-moss)]/20"></div>
      
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

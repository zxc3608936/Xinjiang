import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Map, Coffee, ShoppingBag, Camera, Hotel, Plane, Bus, Shirt, CloudSun, ChevronDown, ChevronUp } from 'lucide-react';
import { tourData } from '../data';
import { Category } from '../types';

const categoryConfig: Record<Category, { icon: any; color: string; bg: string; label: string }> = {
  food: { icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100', label: '美食' },
  activity: { icon: Map, color: 'text-rose-600', bg: 'bg-rose-100', label: '活動' },
  shopping: { icon: ShoppingBag, color: 'text-pink-600', bg: 'bg-pink-100', label: '購物' },
  attraction: { icon: Camera, color: 'text-sky-600', bg: 'bg-sky-100', label: '景點' },
  hotel: { icon: Hotel, color: 'text-indigo-600', bg: 'bg-indigo-100', label: '住宿' },
  transport: { icon: Bus, color: 'text-purple-600', bg: 'bg-purple-100', label: '交通' },
  flight: { icon: Plane, color: 'text-teal-600', bg: 'bg-teal-100', label: '航班' },
};

export default function ItineraryTab() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const toggleExpand = (id: string) => {
    setExpandedEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getDayOfWeek = (dateString: string) => {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const parts = dateString.split('.');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return days[date.getDay()];
    }
    return '';
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    const observerOptions = {
      root: scrollContainer,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isClickScrolling.current) return;
      
      let maxVisibleIdx = activeDayIdx;
      let hasIntersecting = false;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hasIntersecting = true;
          const idx = Number(entry.target.getAttribute('data-idx'));
          maxVisibleIdx = idx;
        }
      });
      
      if (hasIntersecting && maxVisibleIdx !== activeDayIdx) {
        setActiveDayIdx(maxVisibleIdx);
        const button = document.getElementById(`day-btn-${maxVisibleIdx}`);
        if (button && scrollerRef.current) {
          const scrollLeft = button.offsetLeft - scrollerRef.current.clientWidth / 2 + button.clientWidth / 2;
          scrollerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    dayRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeDayIdx]);

  const scrollToDay = (idx: number) => {
    isClickScrolling.current = true;
    setActiveDayIdx(idx);
    
    const targetEl = dayRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    const button = document.getElementById(`day-btn-${idx}`);
    if (button && scrollerRef.current) {
      const scrollLeft = button.offsetLeft - scrollerRef.current.clientWidth / 2 + button.clientWidth / 2;
      scrollerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <div className="w-full shrink-0 bg-[var(--color-snow)] relative">
      <div className="sticky top-0 z-30 pt-3 pb-2 bg-[var(--color-snow)]/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E3]">
        <div ref={scrollerRef} className="flex overflow-x-auto hide-scrollbar px-6 py-4 gap-3 scroll-smooth items-center min-h-[96px]">
          {tourData.map((day, idx) => {
            const isActive = idx === activeDayIdx;
            return (
              <button
                key={day.id}
                id={`day-btn-${idx}`}
                onClick={() => scrollToDay(idx)}
                className={`shrink-0 flex flex-col items-center justify-center w-[64px] h-[64px] rounded-[22px] transition-all duration-300 ${
                  isActive 
                    ? 'bg-[var(--color-moss)] text-white shadow-[0_4px_12px_rgba(115,165,87,0.4)] scale-105 my-2' 
                    : 'bg-white text-[var(--color-warmgray)] shadow-sm hover:bg-[#F0F5ED] my-2'
                }`}
              >
                <span className="text-[14px] font-black">Day {day.dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full pb-16">
        <div className="max-w-xl mx-auto w-full">
        {tourData.map((currentDay, idx) => (
          <div
            key={currentDay.id}
            ref={(el) => (dayRefs.current[idx] = el)}
            data-idx={idx}
            className="px-6 pt-6 pb-8 flex flex-col gap-5 border-b border-[#E8E8E3] last:border-0 scroll-mt-[160px]"
          >
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0F2ED]">
              <div className="flex flex-col mb-3 border-b border-[#F0F2ED] pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px] font-black text-[#4A4A48] tracking-tight">{currentDay.date}</span>
                  <span className="text-[14px] font-bold text-[#8C8C88]">{getDayOfWeek(currentDay.date)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[13px] font-black text-[var(--color-moss)] bg-[#F4F7F2] px-3 py-1 rounded-[10px]">Day {currentDay.dayNum}</span>
                </div>
              </div>
              <h2 className="text-[17px] font-bold text-[#4A4A48] mb-3 flex items-center gap-2 leading-snug">
                <MapPin size={18} className="text-[var(--color-moss)] shrink-0" />
                {currentDay.locations}
              </h2>
              <div className="flex bg-[#FAFAF7] rounded-[16px] p-3 gap-4">
                <div className="flex-[0.8] flex flex-col items-center justify-center border-r border-[#E8E8E3] gap-1">
                  <CloudSun size={20} className="text-sky-500" />
                  <span className="text-[11px] text-[#8C8C88] font-bold">{currentDay.weather}</span>
                  <span className="text-[13px] font-black text-[#4A4A48] text-center leading-tight">{currentDay.temp.replace(' ', '')}</span>
                </div>
                <div className="flex-[1.2] flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-1.5 text-[#86C166]">
                    <Shirt size={15} />
                    <span className="text-[11px] font-black">建議穿著</span>
                  </div>
                  <p className="text-[13px] text-[#4A4A48] font-bold leading-snug">
                    {currentDay.dress}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative mt-1">
              <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-[#E8E8E3] z-0" />
              
              {currentDay.events.map((event) => {
                const conf = categoryConfig[event.category];
                return (
                  <div key={event.id} className="relative pl-14 w-full group">
                    <div className={`absolute left-[14px] top-4 w-5 h-5 rounded-full border-[3px] border-[var(--color-snow)] shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${conf.bg} ${conf.color}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>

                    {event.category === 'flight' ? (
                       <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden border border-transparent hover:border-sky-100 transition-all flex flex-col">
                         <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 flex items-center justify-between text-white">
                           <div className="flex items-center gap-2">
                             <Plane size={16} className="-rotate-45" />
                             <span className="text-[13px] font-black tracking-wide">航班資訊</span>
                           </div>
                           <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                             {event.time}
                           </span>
                         </div>
                         <div className="p-4 flex flex-col relative border-b-2 border-dashed border-[#E8E8E3]">
                           <div className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-[var(--color-snow)] z-10"></div>
                           <div className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-[var(--color-snow)] z-10"></div>
                           
                           {event.flightInfo && (
                             <div className="flex items-center justify-between mb-4 mt-1 bg-sky-50/50 rounded-[16px] p-3 border border-sky-100">
                               <div className="flex flex-col items-center">
                                 <span className="text-2xl font-black text-[#4A4A48] tracking-wider">{event.flightInfo.originCode}</span>
                                 <span className="text-[11px] font-bold text-[#8C8C88]">{event.flightInfo.origin}</span>
                                 {event.flightInfo.originTerminal && <span className="text-[10px] text-[#A0A09B]">{event.flightInfo.originTerminal}</span>}
                               </div>
                               <div className="flex flex-col items-center justify-center flex-1 px-2">
                                 <span className="text-[10px] font-black text-sky-600 mb-1">{event.flightInfo.duration}</span>
                                 <div className="w-full flex items-center relative">
                                   <div className="h-px bg-sky-200 flex-1 border-t border-dashed border-sky-300"></div>
                                   <Plane size={14} className="text-sky-500 absolute left-1/2 -translate-x-1/2" />
                                 </div>
                               </div>
                               <div className="flex flex-col items-center">
                                 <span className="text-2xl font-black text-[#4A4A48] tracking-wider">{event.flightInfo.destCode}</span>
                                 <span className="text-[11px] font-bold text-[#8C8C88]">{event.flightInfo.dest}</span>
                                 {event.flightInfo.destTerminal && <span className="text-[10px] text-[#A0A09B]">{event.flightInfo.destTerminal}</span>}
                               </div>
                             </div>
                           )}

                           <h3 className="text-[16px] font-black text-[#4A4A48] mb-1.5 leading-snug">{event.title}</h3>
                           {event.flightNo && (
                             <div className="flex items-center gap-2 mt-1 mb-2">
                               <span className="text-[11px] bg-gray-100 text-gray-500 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                 航班號
                               </span>
                               <span className="text-[14px] font-black text-sky-600">{event.flightNo}</span>
                             </div>
                           )}
                           <p className="text-[13px] text-[#8C8C88] font-medium leading-relaxed">
                             {event.desc}
                           </p>
                         </div>
                         <div className="bg-[#FAFAFA] p-3 flex justify-between items-center relative">
                            <div className="text-[10px] text-[#A0A09B] font-bold uppercase tracking-widest pl-2">
                              Boarding Pass
                            </div>
                            {event.flightNo && (
                               <a 
                                 href={`https://flightaware.com/live/flight/${event.trackingNo || event.flightNo}`}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="text-[11px] bg-white border border-sky-100 text-sky-600 px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 hover:bg-sky-50 hover:border-sky-200 transition-colors shadow-sm z-20 relative"
                               >
                                 動態追蹤 <Navigation size={10} className="rotate-90" />
                               </a>
                            )}
                         </div>
                       </div>
                    ) : (
                      <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-transparent hover:border-[#F0F2ED] transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${conf.bg} ${conf.color}`}>
                              {conf.label}
                            </span>
                            {event.time && (
                              <span className="text-[11px] font-black text-[#8C8C88] bg-[#FAFAF7] px-2 py-0.5 rounded-md">{event.time}</span>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="text-[15px] font-black text-[#4A4A48] mb-1.5 leading-snug">{event.title}</h3>
                        <p className="text-[13px] text-[#8C8C88] font-medium leading-relaxed mb-3">
                          {event.desc}
                        </p>

                        {event.detailedDesc && (
                          <div className="mb-3">
                            <button 
                              onClick={() => toggleExpand(event.id)}
                              className="text-[12px] font-bold text-[var(--color-moss)] flex items-center gap-1 hover:underline outline-none"
                            >
                              {expandedEvents[event.id] ? (
                                <>收起詳細介紹 <ChevronUp size={12} /></>
                              ) : (
                                <>展開詳細介紹 <ChevronDown size={12} /></>
                              )}
                            </button>
                            {expandedEvents[event.id] && (
                              <div className="mt-2 text-[13px] text-[#6C6C68] font-medium leading-relaxed bg-[#F4F7F2] p-3 rounded-[12px] border border-[#E8F0E4]">
                                {event.detailedDesc}
                              </div>
                            )}
                          </div>
                        )}

                        {event.query && (
                          <div className="flex justify-end">
                            <a
                              href={`https://uri.amap.com/search?keyword=${encodeURIComponent(event.query)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 bg-[#F4F7F2] hover:bg-[#E8F0E4] transition-colors text-[var(--color-moss)] text-xs font-bold px-3 py-1.5 rounded-[12px]"
                            >
                              <Navigation size={12} strokeWidth={2.5} />
                              高德地圖
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

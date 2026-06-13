import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Map, Coffee, ShoppingBag, Camera, Hotel, Plane, Bus, Shirt, CloudSun, ChevronDown, ChevronUp, Sun, Cloud, CloudRain, Wind, Pencil, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tourData } from '../data';
import { Category, DayData, Event } from '../types';

const categoryConfig: Record<Category, { icon: any; color: string; bg: string; label: string }> = {
  food: { icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100', label: '美食' },
  activity: { icon: Map, color: 'text-rose-600', bg: 'bg-rose-100', label: '活動' },
  shopping: { icon: ShoppingBag, color: 'text-pink-600', bg: 'bg-pink-100', label: '購物' },
  attraction: { icon: Camera, color: 'text-sky-600', bg: 'bg-sky-100', label: '景點' },
  hotel: { icon: Hotel, color: 'text-indigo-600', bg: 'bg-indigo-100', label: '住宿' },
  transport: { icon: Bus, color: 'text-purple-600', bg: 'bg-purple-100', label: '交通' },
  flight: { icon: Plane, color: 'text-teal-600', bg: 'bg-teal-100', label: '航班' },
};

const getWeatherIcon = (weather: string) => {
  if (weather.includes('☀️') || weather.includes('晴朗')) return { Icon: Sun, color: 'text-orange-500' };
  if (weather.includes('🌦️') || weather.includes('陣雨')) return { Icon: CloudRain, color: 'text-blue-500' };
  if (weather.includes('☁️') || weather.includes('陰')) return { Icon: Cloud, color: 'text-slate-500' };
  if (weather.includes('💨') || weather.includes('風')) return { Icon: Wind, color: 'text-teal-500' };
  return { Icon: CloudSun, color: 'text-sky-500' };
};

interface ItineraryTabProps {
  itinerary: DayData[];
  onUpdateItinerary: (newItinerary: DayData[]) => void;
  onShowOnMap: (dayNum: number) => void;
}

export default function ItineraryTab({ itinerary, onUpdateItinerary, onShowOnMap }: ItineraryTabProps) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  // Edit states
  const [editingEvent, setEditingEvent] = useState<{ dayId: string; event: Event } | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Delete state
  const [deletingEvent, setDeletingEvent] = useState<{ dayId: string; eventId: string; eventTitle: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startEdit = (dayId: string, event: Event) => {
    setEditingEvent({ dayId, event });
    setEditTitle(event.title || '');
    setEditTime(event.time || '');
    setEditDesc(event.desc || '');
  };

  const saveEventEdit = () => {
    if (!editingEvent) return;
    const { dayId, event } = editingEvent;

    const updatedItinerary = itinerary.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          events: day.events.map(ev => {
            if (ev.id === event.id) {
              return {
                ...ev,
                title: editTitle,
                time: editTime,
                desc: editDesc,
              };
            }
            return ev;
          }),
        };
      }
      return day;
    });

    onUpdateItinerary(updatedItinerary);
    setEditingEvent(null);
  };

  const confirmDeleteEvent = () => {
    if (!deletingEvent) return;
    const { dayId, eventId } = deletingEvent;

    const updatedItinerary = itinerary.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          events: day.events.filter(ev => ev.id !== eventId),
        };
      }
      return day;
    });

    onUpdateItinerary(updatedItinerary);
    setDeletingEvent(null);
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
          {itinerary.map((day, idx) => {
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
        {itinerary.map((currentDay, idx) => (
          <motion.div
            key={currentDay.id}
            ref={(el) => (dayRefs.current[idx] = el as HTMLDivElement | null)}
            data-idx={idx}
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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
                  <button
                    onClick={() => onShowOnMap(currentDay.dayNum)}
                    className="text-[12px] font-bold text-[var(--color-moss)] hover:bg-[#F4F7F2] active:bg-[#E8F0E4] transition-all px-3 py-1 rounded-[10px] flex items-center gap-1.5 border border-[var(--color-moss)]/20 shadow-sm cursor-pointer"
                  >
                    <Map size={13} className="stroke-[2.5]" />
                    顯示於地圖
                  </button>
                </div>
              </div>
              <h2 className="text-[17px] font-bold text-[#4A4A48] mb-3 flex items-center gap-2 leading-snug">
                <MapPin size={18} className="text-[var(--color-moss)] shrink-0" />
                {currentDay.locations}
              </h2>
              <div className="flex bg-[#FAFAF7] rounded-[16px] p-3 gap-4">
                <div className="flex-[0.8] flex flex-col items-center justify-center border-r border-[#E8E8E3] gap-1">
                  {(() => {
                    const { Icon, color } = getWeatherIcon(currentDay.weather);
                    return <Icon size={20} className={color} />;
                  })()}
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
              {currentDay.events.length > 0 && (
                <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-[#E8E8E3] z-0" />
              )}
              
              {currentDay.events.length === 0 ? (
                <div className="text-center py-8 text-[13px] font-bold text-[#8C8C88] bg-white rounded-[24px] border border-dashed border-[#EAF0E5] shadow-xs select-none">
                  🌸 當天無排定活動行程 🦙
                </div>
              ) : (
                currentDay.events.map((event) => {
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
                           <div className="bg-[#FAFAFA] p-3 flex justify-between items-center relative gap-2">
                              <div className="text-[10px] text-[#A0A09B] font-bold uppercase tracking-widest pl-2">
                                Boarding Pass
                              </div>
                              <div className="flex items-center gap-1.5">
                                 {event.flightNo && (
                                    <a 
                                      href={`https://flightaware.com/live/flight/${event.trackingNo ? event.trackingNo : (event.flightNo?.startsWith('MU') ? event.flightNo.replace(/^MU/, 'CES') : event.flightNo)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[11px] bg-white border border-sky-100 text-sky-600 px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 hover:bg-sky-50 hover:border-sky-200 transition-colors shadow-sm z-20 relative"
                                    >
                                      動態追蹤 <Navigation size={10} className="rotate-90" />
                                    </a>
                                 )}
                                 <button 
                                   onClick={() => startEdit(currentDay.id, event)}
                                   className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors border border-[#E8E8E3] bg-white cursor-pointer"
                                   title="編輯航班"
                                 >
                                   <Pencil size={12} />
                                 </button>
                                 <button 
                                   onClick={() => setDeletingEvent({ dayId: currentDay.id, eventId: event.id, eventTitle: event.title })}
                                   className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors border border-[#E8E8E3] bg-white cursor-pointer"
                                   title="刪除航班"
                                 >
                                   <Trash2 size={12} />
                                 </button>
                              </div>
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

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 md:opacity-40 transition-opacity">
                              <button 
                                onClick={() => startEdit(currentDay.id, event)}
                                className="p-1.5 text-gray-400 hover:text-[var(--color-moss)] hover:bg-[#F2F6F0] rounded-lg transition-colors cursor-pointer"
                                title="編輯項目"
                              >
                                <Pencil size={13} />
                              </button>
                              <button 
                                onClick={() => setDeletingEvent({ dayId: currentDay.id, eventId: event.id, eventTitle: event.title })}
                                className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="刪除項目"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                          
                          <h3 className="text-[15px] font-black text-[#4A4A48] mb-1.5 leading-snug">{event.title}</h3>
                          <p className="text-[13px] text-[#8C8C88] font-medium leading-relaxed mb-3">
                            {event.desc}
                          </p>

                          {event.image && (
                            <div className="w-full h-40 rounded-2xl overflow-hidden mb-3">
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover shadow-sm" />
                            </div>
                          )}

                          {event.detailedDesc && (
                            <div className="mb-3">
                              <button 
                                onClick={() => toggleExpand(event.id)}
                                className="text-[12px] font-bold text-[var(--color-moss)] flex items-center gap-1 hover:underline outline-none cursor-pointer"
                              >
                                {expandedEvents[event.id] ? (
                                  <>收起詳細介紹 <ChevronUp size={12} /></>
                                ) : (
                                  <>展開詳細介紹 <ChevronDown size={12} /></>
                                )}
                              </button>
                              <AnimatePresence initial={false}>
                                {expandedEvents[event.id] && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                    className="mt-2 text-[13px] text-[#6C6C68] font-medium leading-relaxed bg-[#F4F7F2] p-3 rounded-[12px] border border-[#E8F0E4] overflow-hidden"
                                  >
                                    {event.detailedDesc}
                                  </motion.div>
                                )}
                              </AnimatePresence>
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
                })
              )}
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      {/* Edit Modal Dialog */}
      <AnimatePresence>
        {editingEvent && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="bg-white rounded-[28px] w-full max-w-md p-6 shadow-2xl border border-[#FAFAF7] relative mx-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F0F2ED]">
                <h3 className="text-[17px] font-black text-[#4A4A48] flex items-center gap-2">
                  <span className="text-xl">📝</span> 編輯活動行程
                </h3>
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black text-[#8C8C88] mb-1.5 uppercase tracking-wider">活動時間</label>
                  <input 
                    type="text" 
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-[#E8E8E3] rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#4A4A48] focus:outline-none focus:border-[var(--color-moss)] transition-colors"
                    placeholder="例如：14:00 或 6/14 10:30"
                  />
                </div>

                <div>
                  <label className="block text-[#8C8C88] text-[11px] font-black mb-1.5 uppercase tracking-wider">活動標題</label>
                  <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-[#E8E8E3] rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#4A4A48] focus:outline-none focus:border-[var(--color-moss)] transition-colors"
                    placeholder="請輸入活動標題"
                  />
                </div>

                <div>
                  <label className="block text-[#8C8C88] text-[11px] font-black mb-1.5 uppercase tracking-wider">說明內容</label>
                  <textarea 
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={4}
                    className="w-full bg-[#FAFAF7] border border-[#E8E8E3] rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#4A4A48] focus:outline-none focus:border-[var(--color-moss)] transition-colors resize-none leading-relaxed"
                    placeholder="請輸入活動的詳細說明內容..."
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#F0F2ED] pt-4">
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="text-xs font-black text-[#8C8C88] hover:text-[#4A4A48] px-4 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-[16px] cursor-pointer"
                >
                  取消
                </button>
                <button 
                  onClick={saveEventEdit}
                  className="text-xs font-black text-white bg-[var(--color-moss)] hover:bg-[#689E4E] transition-colors px-4 py-2.5 rounded-[16px] flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check size={14} className="stroke-[3]" />
                  儲存修改
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deletingEvent && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="bg-white rounded-[28px] w-full max-w-xs p-6 shadow-2xl border border-[#FAFAF7] text-center relative mx-auto"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-[#4A4A48] mb-2">確認要刪除此活動？</h3>
              <p className="text-xs text-[#8C8C88] font-bold leading-relaxed mb-6 px-1">
                您確定要刪除「<span className="text-[#4A4A48] font-black">{deletingEvent.eventTitle}</span>」嗎？此操作將無法還原。
              </p>

              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setDeletingEvent(null)}
                  className="flex-1 text-xs font-black text-[#5C5C58] bg-gray-100 hover:bg-gray-200 transition-colors py-2.5 rounded-[16px] cursor-pointer"
                >
                  取消
                </button>
                <button 
                  onClick={confirmDeleteEvent}
                  className="flex-1 text-xs font-black text-white bg-rose-500 hover:bg-rose-600 transition-colors py-2.5 rounded-[16px] shadow-sm cursor-pointer"
                >
                  確定刪除
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

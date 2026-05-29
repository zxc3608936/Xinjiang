import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Clock } from 'lucide-react';

const locations: { day: string, name: string, coords: [number, number], distance: string, estTime: string, dir: 'right' | 'left' | 'top' | 'bottom', offset: [number, number] }[] = [
  { day: 'D2, D3', name: '烏魯木齊', coords: [43.8256, 87.6168], distance: '', estTime: '', dir: 'top', offset: [0, -10] },
  { day: 'D3', name: '天山天池', coords: [43.8860, 88.1343], distance: '約 70 km', estTime: '約 1.5 小時', dir: 'right', offset: [10, 0] },
  { day: 'D3', name: '阿勒泰', coords: [47.8486, 88.1396], distance: '約 500 km', estTime: '約 6 小時', dir: 'right', offset: [10, 0] },
  { day: 'D4', name: '禾木', coords: [48.5670, 87.4320], distance: '約 140 km', estTime: '約 3.5 小時', dir: 'top', offset: [0, -10] },
  { day: 'D5', name: '喀納斯', coords: [48.6940, 87.0305], distance: '約 80 km', estTime: '約 2 小時', dir: 'left', offset: [-10, 0] },
  { day: 'D5', name: '布爾津', coords: [47.7018, 86.8778], distance: '約 150 km', estTime: '約 3 小時', dir: 'right', offset: [10, 0] },
  { day: 'D6', name: '魔鬼城', coords: [46.0125, 85.3130], distance: '約 220 km', estTime: '約 3.5 小時', dir: 'left', offset: [-10, 0] },
  { day: 'D6', name: '獨山子', coords: [44.3315, 84.8876], distance: '約 260 km', estTime: '約 3.5 小時', dir: 'top', offset: [0, -10] },
  { day: 'D7', name: '巴音布魯克', coords: [43.0300, 84.1480], distance: '約 300 km', estTime: '約 5 小時', dir: 'bottom', offset: [0, 10] },
  { day: 'D8', name: '那拉提', coords: [43.2688, 83.2505], distance: '約 90 km', estTime: '約 2.5 小時', dir: 'right', offset: [10, 0] },
  { day: 'D8', name: '伊寧市', coords: [43.9169, 81.3204], distance: '約 260 km', estTime: '約 4 小時', dir: 'top', offset: [0, -10] },
  { day: 'D9', name: '賽里木湖', coords: [44.6050, 81.1685], distance: '約 150 km', estTime: '約 2.5 小時', dir: 'left', offset: [-10, 0] },
  { day: 'D9', name: '奎屯', coords: [44.4258, 84.9213], distance: '約 300 km', estTime: '約 4 小時', dir: 'bottom', offset: [0, 10] },
  { day: 'D10', name: '大峽谷', coords: [44.1795, 84.8800], distance: '約 40 km', estTime: '約 1 小時', dir: 'left', offset: [-10, 0] },
  { day: 'D10', name: '回程: 烏魯木齊', coords: [43.8350, 87.6250], distance: '約 250 km', estTime: '約 3.5 小時', dir: 'bottom', offset: [0, 10] },
];

const isLocForDay = (locDay: string, dayNum: number) => {
  return locDay.split(',').map(s => s.trim()).includes(`D${dayNum}`);
};

const getCoordinatesForDay = (dayNum: number): [number, number][] => {
  const matched = locations.filter(loc => isLocForDay(loc.day, dayNum));
  
  if (matched.length === 0) {
    // Fallback logic for days of transit (not inside D2-D10 in locations list)
    if (dayNum === 1 || dayNum === 11 || dayNum === 12) {
      // Focus on Urumqi as the entry/exit point of Xinjiang
      return [[43.8256, 87.6168]];
    }
    // Return all if completely unknown
    return locations.map(l => l.coords);
  }
  
  return matched.map(m => m.coords);
};

const getCustomIcon = (isHighlighted: boolean) => {
  const color = isHighlighted ? '#F59E0B' : '#86C166'; // Amber vs Moss green
  const scale = isHighlighted ? 'scale(1.2)' : 'scale(1)';
  const shadow = isHighlighted ? '0 4px 12px rgba(245,158,11,0.6)' : '0 2px 4px rgba(0,0,0,0.2)';
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; color: white; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: ${shadow}; margin-left: -12px; margin-top: -12px; transform: ${scale}; transition: all 0.3s ease-in-out;"></div>`,
  });
};

const polylinePositions = locations.map(loc => loc.coords);

function MapFocusHandler({ selectedDayNum }: { selectedDayNum: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedDayNum === null) {
      map.fitBounds(L.latLngBounds(polylinePositions), { padding: [40, 40], animate: true, duration: 1 });
    } else {
      const coords = getCoordinatesForDay(selectedDayNum);
      if (coords.length > 0) {
        if (coords.length === 1) {
          map.setView(coords[0], 9, { animate: true, duration: 1 });
        } else {
          const bounds = L.latLngBounds(coords);
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10, animate: true, duration: 1 });
        }
      }
    }
  }, [selectedDayNum, map]);
  return null;
}

interface MapTabProps {
  selectedDayNum: number | null;
  setSelectedDayNum: (dayNum: number | null) => void;
}

export default function MapTab({ selectedDayNum, setSelectedDayNum }: MapTabProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--color-snow)] relative overflow-hidden">
      <div className="flex-1 min-h-[400px] border-b border-[#E8E8E3] relative z-0">
        <MapContainer center={[45.5, 85.5]} zoom={6} className="w-full h-full" zoomControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          
          {locations.map((loc, idx) => {
            if (idx === 0) return null;
            const prevLoc = locations[idx - 1];
            return (
              <Polyline 
                key={`poly-${idx}`} 
                positions={[prevLoc.coords, loc.coords]} 
                pathOptions={{ color: '#86C166', weight: 5, opacity: 0.8 }}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({ weight: 8, color: '#F59E0B' }); // highlight on hover
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({ weight: 5, color: '#86C166' });
                  }
                }}
              >
                <Popup className="font-sans">
                  <div className="flex flex-col gap-1.5 p-1">
                    <div className="font-black text-[var(--color-moss)] text-sm mb-1 whitespace-nowrap">
                      {prevLoc.name} ➔ {loc.name}
                    </div>
                    <div className="text-[13px] font-bold text-[#4A4A48] flex items-center gap-1.5">
                      <Navigation size={14} className="text-[#8C8C88]"/>
                      {loc.distance}
                    </div>
                    <div className="text-[13px] font-bold text-[#4A4A48] flex items-center gap-1.5">
                      <Clock size={14} className="text-[#8C8C88]"/>
                      {loc.estTime}
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

          {locations.map((loc, idx) => {
            const isHighlighted = selectedDayNum !== null && isLocForDay(loc.day, selectedDayNum);
            return (
              <Marker key={idx} position={loc.coords} icon={getCustomIcon(isHighlighted)}>
                <Tooltip permanent direction={loc.dir} offset={loc.offset} className={`custom-map-tooltip ${isHighlighted ? 'border-amber-500 font-extrabold shadow-md z-[500]' : ''}`}>
                  <span className="text-[11px] font-black text-[var(--color-moss)] mr-1.5">{loc.day}</span>
                  <span className="text-[13px]">{loc.name}</span>
                </Tooltip>
              </Marker>
            );
          })}
          <MapFocusHandler selectedDayNum={selectedDayNum} />
        </MapContainer>

        {selectedDayNum !== null && (
          <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-amber-200 flex items-center gap-2 animate-fade-in animate-duration-300">
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg animate-pulse-subtle">
              Day {selectedDayNum}
            </span>
            <span className="text-xs font-extrabold text-[#4A4A48] select-none">
              已聚焦當日景點
            </span>
            <button
              onClick={() => setSelectedDayNum(null)}
              className="text-[11px] text-[#8C8C88] hover:text-amber-600 font-black ml-2 underline cursor-pointer"
            >
              顯示全圖
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar bg-white p-6 md:p-8">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="text-xl font-black text-[#4A4A48] flex items-center gap-2 mb-6">
            <MapPin className="text-[var(--color-moss)]" />
            10日北疆精華路線 (約 2,800 km)
            <span className="ml-auto text-xs font-bold text-[#8C8C88] bg-[#FAFAF7] px-2 py-1 rounded-full">
              點擊地圖綠線可查看車程
            </span>
          </h2>

          <div className="relative pl-6">
            <div className="absolute left-[3px] top-4 bottom-6 w-[2px] bg-[#E8E8E3] z-0" />
            
            {locations.map((loc, idx) => (
              <div key={idx} className="relative pb-6 last:pb-0">
                <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-[var(--color-moss)] shadow-sm z-10" />
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black bg-[#FAFAF7] text-[#8C8C88] px-2 py-0.5 rounded-md w-12 text-center">
                      {loc.day}
                    </span>
                    <span className="text-[15px] font-black text-[#4A4A48]">{loc.name}</span>
                  </div>
                  
                  {idx < locations.length - 1 && locations[idx + 1].distance && (
                    <div className="flex items-center gap-4 mt-2 ml-[60px]">
                      <div className="flex items-center gap-1 text-[12px] font-bold text-[var(--color-moss)] opacity-80">
                        <Navigation size={12} />
                        <span>{locations[idx + 1].distance}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[12px] font-bold text-[#8C8C88]">
                        <Clock size={12} />
                        <span>{locations[idx + 1].estTime}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

const customIcon = L.divIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #86C166; color: white; width: 24px; height: 24px; border-radius: 50%;border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-left: -12px; margin-top: -12px;"></div>`,
});

const polylinePositions = locations.map(loc => loc.coords);

function MapBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds(polylinePositions), { padding: [40, 40] });
  }, [map]);
  return null;
}

export default function MapTab() {
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

          {locations.map((loc, idx) => (
            <Marker key={idx} position={loc.coords} icon={customIcon}>
              <Tooltip permanent direction={loc.dir} offset={loc.offset} className="custom-map-tooltip">
                <span className="text-[11px] font-black text-[var(--color-moss)] mr-1.5">{loc.day}</span>
                <span className="text-[13px]">{loc.name}</span>
              </Tooltip>
            </Marker>
          ))}
          <MapBounds />
        </MapContainer>
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

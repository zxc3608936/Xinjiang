import { CloudSunRain, ThermometerSun, Wind } from 'lucide-react';
import { tourData } from '../data';
import { DayData } from '../types';

interface WeatherTabProps {
  itinerary?: DayData[];
}

export default function WeatherTab({ itinerary = tourData }: WeatherTabProps) {
  return (
    <div className="px-6 pt-6 pb-12 flex flex-col gap-5 max-w-xl mx-auto w-full">
       <h2 className="text-xl font-bold text-[#4A4A48] flex items-center gap-2 mb-2">
        <CloudSunRain className="text-[var(--color-moss)]" />
        北疆氣候預覽
      </h2>

      <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0F2ED] flex gap-4 mb-4">
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <ThermometerSun size={24} className="text-orange-400" />
          <span className="text-xs font-bold text-[#8C8C88] text-center">早晚溫差極大<br/>可達15度</span>
        </div>
        <div className="w-px bg-[#E8E8E3]" />
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Wind size={24} className="text-sky-400" />
          <span className="text-xs font-bold text-[#8C8C88] text-center">氣候乾燥少雨<br/>紫外線強烈</span>
        </div>
      </div>

      <h3 className="font-bold text-sm text-[#8C8C88] pl-2">每日簡易預報</h3>

      <div className="space-y-3">
        {itinerary.map((day) => (
          <div key={day.id} className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-12 text-center text-xs font-bold bg-[#FAFAF7] text-[var(--color-moss)] py-1.5 rounded-lg">
                D{day.dayNum}
              </div>
              <span className="text-sm font-bold text-[#4A4A48] truncate max-w-[120px]">
                {day.locations.split('➜').pop()?.trim() || day.locations}
              </span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-[#4A4A48] whitespace-nowrap">{day.temp}</span>
              <span className="text-xs font-medium text-[#8C8C88]">{day.weather}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Map, MapPin, BookHeart, CloudSun } from 'lucide-react';
import { TabType } from '../App';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'itinerary', label: '行程', icon: Map },
    { id: 'map', label: '地圖', icon: MapPin },
    { id: 'guide', label: '指南', icon: BookHeart },
    { id: 'weather', label: '天氣', icon: CloudSun },
  ] as const;

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.08)] rounded-t-[32px] pb-safe pt-2 px-6 z-20">
      <div className="flex justify-between items-center py-2 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-20 py-2 transition-all duration-300"
            >
              <div
                className={`flex items-center justify-center mb-1 transition-all duration-300 ${
                  isActive ? 'text-[var(--color-moss)] scale-110' : 'text-[#A0A09B] hover:text-[#8C8C88]'
                }`}
              >
                <Icon size={isActive ? 26 : 24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[11px] transition-all duration-300 font-bold ${
                  isActive ? 'text-[var(--color-moss)]' : 'text-[#A0A09B]'
                }`}
              >
                {tab.label}
              </span>
              
              {/* Active Dot indicator */}
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--color-moss)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

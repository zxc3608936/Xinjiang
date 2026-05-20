import { Map, MapPin, BookHeart, CloudSun } from 'lucide-react';
import { TabType } from '../App';

interface SideNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function SideNav({ activeTab, setActiveTab }: SideNavProps) {
  const tabs = [
    { id: 'itinerary', label: '首頁行程', icon: Map },
    { id: 'map', label: '路線地圖', icon: MapPin },
    { id: 'guide', label: '行前指南', icon: BookHeart },
    { id: 'weather', label: '天氣預覽', icon: CloudSun },
  ] as const;

  return (
    <div className="flex flex-col h-full py-8 px-4">
      <div className="mb-10 px-4">
        <h1 className="text-3xl font-black text-[#4A4A48] tracking-wider mb-1">秘境北疆</h1>
        <p className="text-base text-[#8C8C88] font-bold">12日自由行行程</p>
      </div>

      <nav className="flex flex-col gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-4 px-5 py-4 rounded-[20px] transition-all duration-300 font-bold ${
                isActive 
                  ? 'bg-[var(--color-moss)] text-white shadow-md lg:scale-105' 
                  : 'text-[#8C8C88] hover:bg-white hover:text-[var(--color-moss)] shadow-sm border border-transparent hover:border-[#E8E8E3]'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-lg">{tab.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}

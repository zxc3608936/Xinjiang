import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import ItineraryTab from './components/ItineraryTab';
import MapTab from './components/MapTab';
import GuideTab from './components/GuideTab';
import WeatherTab from './components/WeatherTab';

export type TabType = 'itinerary' | 'map' | 'guide' | 'weather';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(null);

  return (
    <div className="flex h-[100dvh] w-full bg-[#E8E8E3] font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-72 bg-[#FAFAF7] border-r border-[#DCDCD8] z-20 shrink-0 shadow-[4px_0_24px_rgb(0,0,0,0.02)]">
        <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden md:p-6 lg:p-8">
        <div className="flex-1 flex flex-col w-full max-w-[800px] mx-auto bg-[var(--color-snow)] shadow-2xl relative overflow-hidden md:rounded-3xl border border-[#DCDCD8]">
          <main id="main-scroll-container" className="flex-1 overflow-y-auto hide-scrollbar pb-[100px] md:pb-0 relative flex flex-col">
            <Header />
            {activeTab === 'itinerary' && (
              <ItineraryTab 
                onShowOnMap={(dayNum) => {
                  setSelectedDayNum(dayNum);
                  setActiveTab('map');
                }} 
              />
            )}
            {activeTab === 'map' && (
              <MapTab 
                selectedDayNum={selectedDayNum} 
                setSelectedDayNum={setSelectedDayNum} 
              />
            )}
            {activeTab === 'guide' && <GuideTab />}
            {activeTab === 'weather' && <WeatherTab />}
          </main>

          {/* Mobile Bottom Nav */}
          <div className="lg:hidden">
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

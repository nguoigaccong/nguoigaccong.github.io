import React from 'react';
import { Outlet } from 'react-router-dom';
import { Battery, Wifi, Signal } from 'lucide-react';

export default function Layout() {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative w-[400px] h-[850px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[8px] border-gray-900 flex flex-col transform-gpu">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-50 text-black">
        <span className="text-[15px] font-semibold mt-1">{time}</span>
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full"></div>
        <div className="flex items-center gap-2 mt-1">
          <Signal size={16} strokeWidth={2.5} />
          <Wifi size={16} strokeWidth={2.5} />
          <Battery size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-background">
        <Outlet />
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-50"></div>
    </div>
  );
}

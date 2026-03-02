import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Compass, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[100px] z-40 pointer-events-none">
      {/* Background SVG with cutout */}
      <svg
        viewBox="0 0 375 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full drop-shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pointer-events-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 H130 C145 30 145 80 187.5 40 C230 80 230 30 245 30 H375 V100 H0 V30 Z"
          fill="white"
        />
      </svg>

      {/* Nav Items Container */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex justify-between items-end px-6 pointer-events-auto pb-5">
        {/* Left Items */}
        <div className="flex w-[35%] justify-between">
          <button
            onClick={() => navigate('/home')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/home') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Home size={24} className={isActive('/home') ? 'fill-primary/20' : ''} />
            <span className="text-[10px] font-medium">Trang chủ</span>
          </button>
          <button
            onClick={() => navigate('/booking')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/booking') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Calendar size={24} className={isActive('/booking') ? 'fill-primary/20' : ''} />
            <span className="text-[10px] font-medium">Đặt lịch</span>
          </button>
        </div>

        {/* Center Floating Button (Bé Na) */}
        <div className="flex flex-col items-center justify-end pointer-events-auto relative w-[20%]">
          <button
            onClick={() => navigate('/chat')}
            className="absolute bottom-6 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-[4px] border-primary active:scale-95 transition-transform z-10"
          >
            {/* Hình Bé Na (Icon) */}
            <img src="/png/icon-be-na.png" alt="Bé Na" className="w-11 h-11" referrerPolicy="no-referrer" />
          </button>
          <span className={`text-[10px] font-medium ${isActive('/chat') ? 'text-primary' : 'text-gray-400'}`}>Bé Na</span>
        </div>

        {/* Right Items */}
        <div className="flex w-[35%] justify-between">
          <button
            onClick={() => navigate('/discover')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/discover') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Compass size={24} className={isActive('/discover') ? 'fill-primary/20' : ''} />
            <span className="text-[10px] font-medium">Khám phá</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <User size={24} className={isActive('/profile') ? 'fill-primary/20' : ''} />
            <span className="text-[10px] font-medium">Cá nhân</span>
          </button>
        </div>
      </div>
    </div>
  );
}

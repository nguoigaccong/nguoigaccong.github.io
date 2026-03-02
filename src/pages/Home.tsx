import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Heart, Calendar, PhoneCall, PlayCircle, Award, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showEmotionPopup, setShowEmotionPopup] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (location.state?.showEmotionPopup) {
      // Small delay for better UX after transition
      const timer = setTimeout(() => {
        setShowEmotionPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleEmotionSelect = (emotion: string) => {
    // Navigate to chat immediately after selecting an emotion
    navigate('/chat');
  };

  const startHold = () => {
    setIsHolding(true);
    setHoldProgress(0);
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          handleSOS();
          return 100;
        }
        return prev + 3.33; // ~3 seconds to reach 100
      });
    }, 100);
  };

  const endHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
  };

  const handleSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Đã kết nối Hotline khẩn cấp!\nTọa độ của bạn: ${position.coords.latitude}, ${position.coords.longitude}\nĐội cứu hộ đang trên đường đến.`);
        },
        (error) => {
          alert("Đã kết nối Hotline khẩn cấp! Không thể lấy tọa độ GPS.");
        }
      );
    } else {
      alert("Đã kết nối Hotline khẩn cấp! Thiết bị không hỗ trợ GPS.");
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  return (
    <div className="h-full bg-background flex flex-col relative pb-32">
      {/* Emotion Popup Modal */}
      <AnimatePresence>
        {showEmotionPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 z-50"
              onClick={() => setShowEmotionPopup(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 z-50 pb-10"
            >
              <div className="relative flex items-center justify-center mb-6">
                <button 
                  onClick={() => setShowEmotionPopup(false)}
                  className="absolute left-0 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  Hôm nay bạn thế nào?
                </h2>
              </div>
              
              <p className="text-center text-gray-800 mb-8 text-[16px] leading-relaxed px-4 font-medium">
                Hãy ghi nhận cảm xúc của bạn để AI có thể hiểu<br/>và phân tích sâu sắc hơn
              </p>
              
              <div className="flex justify-center gap-6 px-2">
                <button 
                  onClick={() => handleEmotionSelect('happy')}
                  className="w-[88px] h-[88px] border border-gray-300 rounded-full flex items-center justify-center text-[40px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                >
                  😊
                </button>
                <button 
                  onClick={() => handleEmotionSelect('neutral')}
                  className="w-[88px] h-[88px] border border-gray-300 rounded-full flex items-center justify-center text-[40px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                >
                  😐
                </button>
                <button 
                  onClick={() => handleEmotionSelect('sad')}
                  className="w-[88px] h-[88px] border border-gray-300 rounded-full flex items-center justify-center text-[40px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                >
                  😔
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-14 pb-6 px-6 bg-primary text-white rounded-b-[40px] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-sm text-white/80 mb-1">Chào buổi sáng,</p>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Helvetica' }}>Nguyễn Văn A</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 relative">
            <Award size={24} className="text-accent" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-primary">
              7
            </div>
          </div>
        </div>
        
        {/* Warrior Badge Info */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border border-accent/50">
            <span className="text-accent font-bold">🔥</span>
          </div>
          <div>
            <p className="text-sm font-medium">Huy hiệu Chiến Binh Dũng Cảm</p>
            <p className="text-xs text-white/70">Đã đăng nhập liên tục 7 ngày. Tuyệt vời!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
        {/* SOS Button */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Can thiệp khẩn cấp</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Nhấn giữ 3 giây để kết nối ngay với Hotline và gửi tọa độ.</p>
          
          <div 
            className="relative w-32 h-32 flex items-center justify-center cursor-pointer select-none"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#ef4444"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * holdProgress) / 100}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
            
            <motion.div 
              animate={{ scale: isHolding ? 0.9 : 1 }}
              className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 relative z-10"
            >
              <ShieldAlert size={40} className="text-white" />
            </motion.div>
            
            <AnimatePresence>
              {!isHolding && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-red-500/20 rounded-full pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs font-bold text-red-500 mt-4 uppercase tracking-wider">SOS</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/chat')}
            className="bg-secondary/10 p-5 rounded-3xl border border-secondary/20 flex flex-col items-start gap-3 hover:bg-secondary/20 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Người lắng nghe</h3>
              <p className="text-xs text-gray-500 mt-1">Chatbot AI 24/7</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/experts')}
            className="bg-primary/10 p-5 rounded-3xl border border-primary/20 flex flex-col items-start gap-3 hover:bg-primary/20 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <PhoneCall size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Chuyên gia</h3>
              <p className="text-xs text-gray-500 mt-1">Tư vấn trực tuyến</p>
            </div>
          </button>
        </div>

        {/* Learning Section */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Học làm điểm tựa</h2>
            <button onClick={() => navigate('/learning')} className="text-sm text-secondary font-medium">Xem tất cả</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {[1, 2].map((i) => (
              <div key={i} className="min-w-[200px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group cursor-pointer">
                <div className="h-28 bg-gray-200 relative">
                  <img src={`https://picsum.photos/seed/mental${i}/400/300`} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <PlayCircle size={32} className="text-white opacity-80" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">Cách nhận biết dấu hiệu trầm cảm ở người thân</h3>
                  <p className="text-xs text-gray-500 mt-1">Video • 5 phút</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

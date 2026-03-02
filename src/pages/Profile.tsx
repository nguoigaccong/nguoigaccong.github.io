import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, Award, HeartPulse, ArrowLeft, Edit2, CheckCircle2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('main');
  const [testScore, setTestScore] = useState<number | null>(null);
  const [testDate, setTestDate] = useState<string | null>(null);

  useEffect(() => {
    const score = localStorage.getItem('lastTestScore');
    const date = localStorage.getItem('lastTestDate');
    if (score) setTestScore(parseInt(score));
    if (date) setTestDate(new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
  }, []);

  const menuItems = [
    { id: 'personal_info', icon: <User size={20} />, label: 'Thông tin cá nhân' },
    { id: 'test_history', icon: <HeartPulse size={20} />, label: 'Lịch sử đánh giá tâm lý' },
    { id: 'badges', icon: <Award size={20} />, label: 'Huy hiệu chiến binh' },
    { id: 'privacy', icon: <Shield size={20} />, label: 'Quyền riêng tư & Bảo mật' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Cài đặt thông báo' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Cài đặt chung' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Trợ giúp & Hỗ trợ' },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'personal_info':
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1 w-full overflow-y-auto px-6 py-6 no-scrollbar">
            <div className="flex justify-center mb-6 relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden">
                <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <button className="absolute bottom-0 right-1/2 translate-x-10 bg-primary text-white p-2 rounded-full shadow-md">
                <Edit2 size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Họ và tên</label>
                <input type="text" defaultValue="Nguyễn Văn A" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Số điện thoại</label>
                <input type="tel" defaultValue="090 123 4567" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Email</label>
                <input type="email" defaultValue="nguyenvana@gmail.com" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Ngày sinh</label>
                <input type="date" defaultValue="1995-05-15" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <button 
              onClick={() => {
                alert("Đã lưu thông tin cá nhân!");
                setActiveView('main');
              }}
              className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
            >
              Lưu thay đổi
            </button>
          </motion.div>
        );
      case 'test_history':
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1 w-full overflow-y-auto px-6 py-6 no-scrollbar">
            {testScore !== null ? (
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${testScore > 15 ? 'bg-red-400' : testScore > 10 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <div className="flex justify-between items-start mb-2 pl-2">
                  <h3 className="font-bold text-gray-900">Bài test PHQ-9</h3>
                  <span className="text-xs text-gray-500">{testDate}</span>
                </div>
                <div className="pl-2">
                  <p className="text-sm text-gray-600 mb-3">Điểm số: <span className="font-bold text-primary text-lg">{testScore}</span> / 27</p>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-sm font-medium text-gray-800">
                      Kết quả: {testScore > 20 ? "Có dấu hiệu trầm cảm nặng" : testScore > 15 ? "Có dấu hiệu trầm cảm vừa" : testScore > 10 ? "Có dấu hiệu trầm cảm nhẹ" : "Mức độ bình thường"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <HeartPulse size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Bạn chưa thực hiện bài đánh giá nào.</p>
                <button onClick={() => navigate('/test')} className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  Làm bài test ngay
                </button>
              </div>
            )}
          </motion.div>
        );
      case 'badges':
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1 w-full overflow-y-auto px-6 py-6 no-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-3xl border border-yellow-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Chiến binh 7 ngày</h3>
                <p className="text-[10px] text-gray-500 mt-1">Đăng nhập 7 ngày liên tục</p>
                <div className="mt-3 bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-full">Đã đạt</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-3xl border border-gray-200 flex flex-col items-center text-center opacity-70 grayscale">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Chiến binh 14 ngày</h3>
                <p className="text-[10px] text-gray-500 mt-1">Đăng nhập 14 ngày liên tục</p>
                <div className="mt-3 bg-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full">Chưa đạt</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-3xl border border-gray-200 flex flex-col items-center text-center opacity-70 grayscale">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  <span className="text-3xl">👑</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Chiến binh 21 ngày</h3>
                <p className="text-[10px] text-gray-500 mt-1">Đăng nhập 21 ngày liên tục</p>
                <div className="mt-3 bg-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full">Chưa đạt</div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1 w-full overflow-y-auto px-6 py-6 no-scrollbar">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <Settings size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Tính năng đang phát triển</h3>
              <p className="text-sm text-gray-500">Chúng tôi đang hoàn thiện tính năng này. Vui lòng quay lại sau nhé!</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="h-full bg-background flex flex-col relative pb-32">
      {activeView === 'main' ? (
        <>
          <div className="pt-14 pb-6 px-6 bg-primary text-white rounded-b-[40px] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 overflow-hidden backdrop-blur-md">
                <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Helvetica' }}>Nguyễn Văn A</h1>
                <p className="text-sm text-white/80 mt-1">090 123 4567</p>
                <div className="flex items-center gap-1 mt-2 bg-white/20 px-2 py-0.5 rounded-full w-fit">
                  <Award size={12} className="text-accent" />
                  <span className="text-[10px] font-bold text-white">Chiến binh 7 ngày</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  whileTap={{ scale: 0.98, backgroundColor: '#f9fafb' }}
                  className={`w-full flex items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="w-full py-4 bg-red-50 text-red-600 rounded-[24px] font-bold text-lg flex items-center justify-center gap-2 border border-red-100"
            >
              <LogOut size={20} />
              Đăng xuất
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <div className="pt-14 pb-4 px-6 bg-white shadow-sm flex items-center sticky top-0 z-10">
            <button onClick={() => setActiveView('main')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 ml-2" style={{ fontFamily: 'Helvetica' }}>
              {menuItems.find(i => i.id === activeView)?.label || 'Chi tiết'}
            </h1>
          </div>
          {renderView()}
        </>
      )}

      <BottomNav />
    </div>
  );
}

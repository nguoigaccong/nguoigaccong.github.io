import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Users, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Booking() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'experts' | 'events'>('experts');
  // HÌNH TRONG THƯ MỤC PUBLIC
  /// Dữ liệu tạm thời cho chuyên gia - *** SỬA DỮ LIỆU Ở ĐÂY (chỉ cần sửa name và img) ***

  const tempArrObjExpert = [
    { id: 1, name: 'ThS. Nguyễn Thị Tâm', type: 'Tư vấn cá nhân', img: 'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-nu-min.jpg' },
    { id: 2, name: 'BS. Trần Văn Bình', type: 'Tư vấn cá nhân', img: 'https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-7-min.jpg' },
    { id: 3, name: 'ThS. Lê Minh Hạnh', type: 'Tư vấn cá nhân', img: 'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/06/anh-bac-si-11.jpg.webp' },
    { id: 4, name: 'TS. Phạm Quang Huy', type: 'Tư vấn cá nhân', img: 'https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-2-min-e1718114189594.jpg' },
    { id: 5, name: 'BS. Hoàng Ngọc Mai', type: 'Tư vấn cá nhân', img: 'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/06/anh-bac-si-10.jpg.webp' },
    { id: 6, name: 'ThS. Vũ Đức', type: 'Tư vấn cá nhân', img: 'https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-9-min.jpg' },
    { id: 7, name: 'ThS. Đinh Thu Trang', type: 'Tư vấn cá nhân', img: 'https://hthaostudio.com/wp-content/uploads/2022/09/Anh-bac-si-4-min.jpg' },
  ];
  /// Dữ liệu tạm thời cho sự kiện - *** SỬA DỮ LIỆU Ở ĐÂY (chỉ cần sửa name và img) ***
  const tempArrObjEvent = [
    { id: 1, name: 'Workshop: Sơ cấp cứu cảm xúc', date: '10/5/2028', time: '09:00 - 11:00', img: '/jpg/workshop-1.jpg' },
  ];

  return (
    <div className="h-full bg-background flex flex-col relative pb-32">
      <div className="pt-14 pb-4 px-6 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Helvetica' }}>Đặt lịch</h1>
        <div className="w-10"></div>
      </div>

      {/* Thanh tab chuyển đổi */}
      <div className="px-6 py-4">
        <div className="flex bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('experts')}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'experts' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Chuyên Gia
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'events' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Sự kiện
          </button>
        </div>
      </div>
      {/* Khu vực content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 no-scrollbar">
        {activeTab === 'experts' ? (
          <div className="space-y-4">
            {/* Danh sách chuyên gia */}
            {tempArrObjExpert.map((i) => (
              <div key={i.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <img src={i.img} alt="Expert" className="w-20 h-20 rounded-xl object-cover object-top shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{i.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><Users size={14} /> Tư vấn cá nhân</p>
                  <button className="mt-3 w-full py-2 bg-primary/10 text-primary font-semibold rounded-xl text-sm hover:bg-primary/20 transition-colors">
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Danh sách workshop */}
            <h2 className="font-bold text-gray-900 mb-2">Lịch Workshop</h2>
            {tempArrObjEvent.sort((a, b) => a.id - b.id).map((i) => (
              <div key={`ws-${i.id}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden">
                  <img src={i.img} alt="Workshop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold text-gray-900">{i.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><CalendarIcon size={14} /> {i.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {i.time}</span>
                </div>
                <button className="mt-3 w-full py-2 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary/90 transition-colors">
                  Đăng ký tham gia
                </button>
              </div>
            ))}

            {/* Sự kiện đặc biệt - Giải chạy (Nếu không thích có thể remove theo vị trí khung đánh dấu này) */}
            <h2 className="font-bold text-gray-900 mb-2 mt-6">Giải chạy</h2>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden">
                <img src={`/jpg/giai-chay-1.jpg`} alt="Run" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-bold text-gray-900">Giải chạy: Bước chân vì sức khỏe tinh thần</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><CalendarIcon size={14} /> 22/10/2028</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> Công viên Yên Sở, HN</span>
              </div>
              <button className="mt-3 w-full py-2 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-secondary/90 transition-colors">
                Đăng ký tham gia
              </button>
            </div>
            {/* Sự kiện đặc biệt - Giải chạy (Nếu không thích có thể remove theo vị trí khung đánh dấu này) */}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

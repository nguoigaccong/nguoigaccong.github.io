import React from 'react';
import { ArrowLeft, PlayCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Discover() {
  const navigate = useNavigate();
  const tempArrObjLearning = [
    { id: 1, name: 'Cách nhận biết dấu hiệu trầm cảm ở người thân', type: 'Video', duration: '5 phút', img: '/jpg/workshop-1.jpg' },
    { id: 2, name: 'Cách nhận biết dấu hiệu trầm cảm ở người thân', type: 'Podcast', duration: '5 phút', img: '/jpg/giai-chay-1.jpg' },
    { id: 3, name: 'Cách nhận biết dấu hiệu trầm cảm ở người thân', type: 'Video', duration: '5 phút', img: '/jpg/giai-chay-1.jpg' },
  ];

  return (
    <div className="h-full bg-background flex flex-col relative pb-32">
      <div className="pt-14 pb-4 px-6 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Helvetica' }}>Khám phá</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
        {/* Thiền Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🧘‍♀️</span> Thiền
            </h2>
            <button className="text-sm text-primary font-medium">Xem tất cả</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer">
                <div className="h-32 bg-gray-200 relative">
                  <img src={`https://picsum.photos/seed/meditation${i}/400/300`} alt="Thiền" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <PlayCircle size={40} className="text-white opacity-90" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 line-clamp-1">Thiền buông thư {i * 10} phút</h3>
                  <p className="text-xs text-gray-500 mt-1">Giúp giảm căng thẳng, dễ ngủ</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Thể dục Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-secondary" /> Thể dục
            </h2>
            <button className="text-sm text-primary font-medium">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/exercise${i}/200/200`} alt="Thể dục" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <PlayCircle size={24} className="text-white opacity-90" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Bài tập giãn cơ cổ vai gáy</h3>
                  <p className="text-xs text-gray-500 mt-1">15 phút • Cường độ nhẹ</p>
                  <button className="mt-3 px-4 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-lg text-xs hover:bg-gray-200 transition-colors">
                    Bắt đầu tập
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Học làm điểm tựa Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📖</span> Học làm điểm tựa
            </h2>
            <button className="text-sm text-primary font-medium">Xem tất cả</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {tempArrObjLearning.map((i) => (
              <div key={i.id} className="min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer">
                <div className="h-32 bg-gray-200 relative">
                  <img src={`https://picsum.photos/seed/mental${i.id}/400/300`} alt={i.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <PlayCircle size={40} className="text-white opacity-90" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{i.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{i.type} • {i.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Section */}
                {/* <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
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
                </div> */}
      </div>

      <BottomNav />
    </div>
  );
}

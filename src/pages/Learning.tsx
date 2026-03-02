import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Headphones, BookOpen, Search } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'video', label: 'Video ngắn' },
  { id: 'audio', label: 'Podcast' },
  { id: 'article', label: 'Bài viết' },
];

const content = [
  { id: 1, type: 'video', title: 'Cách nhận biết dấu hiệu trầm cảm ở người thân', duration: '5 phút', image: 'https://picsum.photos/seed/learn1/400/300' },
  { id: 2, type: 'audio', title: 'Lắng nghe không phán xét: Kỹ năng sống còn', duration: '15 phút', image: 'https://picsum.photos/seed/learn2/400/300' },
  { id: 3, type: 'video', title: 'Xử lý tình huống khi người thân đòi tự sát', duration: '8 phút', image: 'https://picsum.photos/seed/learn3/400/300' },
  { id: 4, type: 'article', title: 'Hiểu đúng về Rối loạn Trầm cảm', duration: 'Đọc 3 phút', image: 'https://picsum.photos/seed/learn4/400/300' },
];

export default function Learning() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <div className="h-full bg-background flex flex-col relative pb-24">
      <div className="pt-14 pb-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Helvetica' }}>Học làm điểm tựa</h1>
        <p className="text-sm text-gray-500 mb-4">Trang bị kiến thức để bảo vệ người thân yêu.</p>
        
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm kỹ năng..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-4">
          {content.filter(item => activeCategory === 'all' || item.type === activeCategory).map(item => (
            <motion.div 
              key={item.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="h-40 bg-gray-200 relative group cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  {item.type === 'video' && <PlayCircle size={48} className="text-white opacity-90" />}
                  {item.type === 'audio' && <Headphones size={48} className="text-white opacity-90" />}
                  {item.type === 'article' && <BookOpen size={48} className="text-white opacity-90" />}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-white">
                  {item.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    item.type === 'video' ? 'bg-red-100 text-red-600' : 
                    item.type === 'audio' ? 'bg-purple-100 text-purple-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.type === 'video' ? 'Video' : item.type === 'audio' ? 'Podcast' : 'Bài viết'}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

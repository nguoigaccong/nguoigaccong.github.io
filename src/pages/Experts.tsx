import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Calendar, Video, CreditCard, X, CheckCircle2, Clock, Filter, ArrowLeft, Heart, Share2, MapPin, Award, Users } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const experts = [
  { id: 1, name: "ThS. Nguyễn Thị Tâm", title: "Chuyên gia Tâm lý học", type: "psychologist", rating: 4.9, reviews: 120, price: "500.000đ", image: "https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-nu-min.jpg", experience: "10 năm", patients: "1000+", about: "Bác sĩ Tâm là một chuyên gia tâm lý học với hơn 10 năm kinh nghiệm trong việc điều trị các chứng trầm cảm, lo âu và rối loạn giấc ngủ. Cô luôn lắng nghe và thấu hiểu bệnh nhân." },
  { id: 2, name: "BS. Trần Văn Bình", title: "Bác sĩ Tâm thần", type: "psychiatrist", rating: 4.8, reviews: 85, price: "700.000đ", image: "https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-7-min.jpg", experience: "8 năm", patients: "800+", about: "Thạc sĩ Bình chuyên chẩn đoán và điều trị các bệnh lý tâm thần phức tạp. Anh áp dụng các phương pháp điều trị tiên tiến kết hợp với trị liệu tâm lý." },
  { id: 3, name: "ThS. Lê Minh Hạnh", title: "Chuyên gia Tham vấn", type: "therapist", rating: 5.0, reviews: 200, price: "Miễn phí (CSR)", image: "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/06/anh-bac-si-11.jpg.webp", experience: "15 năm", patients: "2000+", about: "Bác sĩ Hạnh là người sáng lập nhiều chương trình hỗ trợ cộng đồng. Cô chuyên tham vấn các vấn đề gia đình, hôn nhân và áp lực cuộc sống." },
  { id: 4, name: "TS. Phạm Quang Huy", title: "Tiến sĩ Tâm lý học lâm sàng", type: "psychologist", rating: 4.9, reviews: 150, price: "800.000đ", image: "https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-2-min-e1718114189594.jpg", experience: "12 năm", patients: "1500+", about: "Tiến sĩ Huy có nhiều năm tu nghiệp tại nước ngoài. Anh chuyên xử lý các ca rối loạn tâm lý nặng và cung cấp các liệu pháp nhận thức hành vi (CBT)." },
  { id: 5, name: "BS. Hoàng Ngọc Mai", title: "Bác sĩ Tâm thần nhi", type: "psychiatrist", rating: 4.7, reviews: 92, price: "600.000đ", image: "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/06/anh-bac-si-10.jpg.webp", experience: "7 năm", patients: "600+", about: "Bác sĩ Mai đặc biệt yêu trẻ em và chuyên trị liệu tâm lý cho thanh thiếu niên, giúp các em vượt qua khủng hoảng tuổi dậy thì và áp lực học tập." },
  { id: 6, name: "ThS. Vũ Đức", title: "Chuyên gia tham vấn", type: "therapist", rating: 4.8, reviews: 310, price: "400.000đ", image: "https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-9-min.jpg", experience: "5 năm", patients: "1200+", about: "Chuyên gia Đức có phong cách tư vấn gần gũi, trẻ trung, rất phù hợp với Gen Z. Anh chuyên giải quyết các vấn đề về định hướng bản thân và tình cảm." },
  { id: 7, name: "ThS. Đinh Thu Trang", title: "Chuyên gia Tham vấn", type: "therapist", rating: 4.9, reviews: 175, price: "550.000đ", image: "https://hthaostudio.com/wp-content/uploads/2022/09/Anh-bac-si-4-min.jpg", experience: "9 năm", patients: "900+", about: "Thạc sĩ Trang chuyên tư vấn về quản lý cảm xúc, giảm stress và cân bằng cuộc sống - công việc (Work-life balance)." },
];

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'psychologist', label: 'Tâm lý học' },
  { id: 'psychiatrist', label: 'Bác sĩ Tâm thần' },
  { id: 'therapist', label: 'Tham vấn viên' },
];

const availableDates = [
  { day: 'T2', date: '12', full: 'Thứ 2, 12/10' },
  { day: 'T3', date: '13', full: 'Thứ 3, 13/10' },
  { day: 'T4', date: '14', full: 'Thứ 4, 14/10' },
  { day: 'T5', date: '15', full: 'Thứ 5, 15/10' },
  { day: 'T6', date: '16', full: 'Thứ 6, 16/10' },
];

const availableTimes = [
  '08:00', '09:00', '10:00', '14:00', '15:00', '16:00'
];

export default function Experts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewingExpert, setViewingExpert] = useState<any>(null);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);

  const filteredExperts = experts.filter(expert => activeCategory === 'all' || expert.type === activeCategory);

  const handleExpertClick = (expert: any) => {
    setViewingExpert(expert);
  };

  const handleBookClick = (expert: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedExpert(expert);
    setShowBooking(true);
  };

  const handleContinueToPayment = () => {
    setShowBooking(false);
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(false);
      setSelectedExpert(null);
      setViewingExpert(null);
    }, 3000);
  };

  if (viewingExpert) {
    return (
      <div className="h-full bg-white flex flex-col relative pb-24 overflow-y-auto no-scrollbar">
        <div className="relative h-64 w-full">
          <img src={viewingExpert.image} alt={viewingExpert.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute top-14 left-6 right-6 flex justify-between items-center z-10">
            <button onClick={() => setViewingExpert(null)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{viewingExpert.type === 'psychologist' ? 'Tâm lý học' : viewingExpert.type === 'psychiatrist' ? 'Bác sĩ Tâm thần' : 'Tham vấn viên'}</span>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium">
                <Star size={10} className="text-accent fill-accent" />
                {viewingExpert.rating} ({viewingExpert.reviews})
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-1">{viewingExpert.name}</h1>
            <p className="text-white/80 text-sm">{viewingExpert.title}</p>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-1">Kinh nghiệm</p>
              <p className="font-bold text-gray-900">{viewingExpert.experience}</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-1">Bệnh nhân</p>
              <p className="font-bold text-gray-900">{viewingExpert.patients}</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-1">Đánh giá</p>
              <p className="font-bold text-gray-900">{viewingExpert.rating}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Giới thiệu</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {viewingExpert.about}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Thông tin khám</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Video size={16} />
                </div>
                <span>Đặt lịch trực tuyến qua Video Call</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={16} />
                </div>
                <span>Bệnh viện Tâm thần Trung ương 1</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Award size={16} />
                </div>
                <span>Thành viên Hội Tâm lý Trị liệu Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 pb-8 bg-white border-t border-gray-100 flex items-center justify-between z-20">
          <div>
            <p className="text-xs text-gray-500 mb-1">Phí tư vấn</p>
            <p className="text-xl font-bold text-primary">{viewingExpert.price}</p>
          </div>
          <button 
            onClick={() => handleBookClick(viewingExpert)}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
          >
            Đặt lịch ngay
          </button>
        </div>

        {/* Booking Modal inside Detail View */}
        <AnimatePresence>
          {showBooking && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white w-full rounded-t-[40px] p-6 pb-12 flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Chọn thời gian</h2>
                  <button onClick={() => setShowBooking(false)} className="p-2 bg-gray-100 rounded-full">
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Ngày khám</h3>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {availableDates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className={`flex flex-col items-center justify-center min-w-[60px] py-3 rounded-2xl border transition-colors ${
                          selectedDate.date === d.date ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <span className="text-xs mb-1">{d.day}</span>
                        <span className="text-lg font-bold">{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Giờ khám</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-xl border text-sm font-medium transition-colors ${
                          selectedTime === t ? 'bg-secondary/10 border-secondary text-secondary' : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleContinueToPayment}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                >
                  Tiếp tục
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Modal inside Detail View */}
        <AnimatePresence>
          {showPayment && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white w-full rounded-t-[40px] p-6 pb-12 flex flex-col"
              >
                {!paymentSuccess ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Xác nhận đặt lịch</h2>
                      <button onClick={() => setShowPayment(false)} className="p-2 bg-gray-100 rounded-full">
                        <X size={20} className="text-gray-600" />
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 flex gap-4 items-center">
                      <img src={selectedExpert?.image} alt="" className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h3 className="font-bold text-gray-900">{selectedExpert?.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Video size={14} /> Video Call 1:1</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={14} /> {selectedDate.full}, {selectedTime}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">Phương thức thanh toán</h3>
                      <div className="border-2 border-primary bg-primary/5 p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            VNPT
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">VNPT Money</p>
                            <p className="text-xs text-gray-500">Giảm 50% cho dự án CSR</p>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-6 px-2">
                      <span className="text-gray-500">Tổng thanh toán</span>
                      <span className="text-2xl font-bold text-primary">{selectedExpert?.price}</span>
                    </div>

                    <button 
                      onClick={handleConfirmPayment}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                    >
                      Thanh toán & Đặt lịch
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 size={48} className="text-green-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h2>
                    <p className="text-gray-500 text-center">Bác sĩ sẽ gọi cho bạn vào lúc {selectedTime} ngày {selectedDate.full} qua ứng dụng.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col relative pb-24">
      <div className="pt-14 pb-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Helvetica' }}>Chuyên gia</h1>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200 mb-4">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm bác sĩ, chuyên gia..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700"
          />
        </div>
        
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
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 no-scrollbar">
        {filteredExperts.map((expert) => (
          <motion.div 
            key={expert.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExpertClick(expert)}
            className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 cursor-pointer"
          >
            <img src={expert.image} alt={expert.name} className="w-16 h-16 rounded-xl object-cover object-top shrink-0" referrerPolicy="no-referrer" />
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-bold text-gray-900 text-sm truncate">{expert.name}</h3>
                <p className="text-xs text-gray-500 truncate">{expert.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} className="text-accent fill-accent" />
                  <span className="text-xs font-medium text-gray-700">{expert.rating}</span>
                  <span className="text-[10px] text-gray-400">({expert.reviews})</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-primary">{expert.price}</span>
                <button 
                  onClick={(e) => handleBookClick(expert, e)}
                  className="px-3 py-1 bg-secondary/10 text-secondary font-semibold text-xs rounded-full hover:bg-secondary/20 transition-colors whitespace-nowrap ml-2"
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredExperts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không tìm thấy chuyên gia phù hợp.
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full rounded-t-[40px] p-6 pb-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Chọn thời gian</h2>
                <button onClick={() => setShowBooking(false)} className="p-2 bg-gray-100 rounded-full">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Ngày khám</h3>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {availableDates.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center justify-center min-w-[60px] py-3 rounded-2xl border transition-colors ${
                        selectedDate.date === d.date ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      <span className="text-xs mb-1">{d.day}</span>
                      <span className="text-lg font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Giờ khám</h3>
                <div className="grid grid-cols-3 gap-3">
                  {availableTimes.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-colors ${
                        selectedTime === t ? 'bg-secondary/10 border-secondary text-secondary' : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleContinueToPayment}
                className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Tiếp tục
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full rounded-t-[40px] p-6 pb-12 flex flex-col"
            >
              {!paymentSuccess ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Xác nhận đặt lịch</h2>
                    <button onClick={() => setShowPayment(false)} className="p-2 bg-gray-100 rounded-full">
                      <X size={20} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 flex gap-4 items-center">
                    <img src={selectedExpert?.image} alt="" className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedExpert?.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Video size={14} /> Video Call 1:1</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={14} /> {selectedDate.full}, {selectedTime}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Phương thức thanh toán</h3>
                    <div className="border-2 border-primary bg-primary/5 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          VNPT
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">VNPT Money</p>
                          <p className="font-bold text-gray-900">Techcombank</p>
                          <p className="text-xs text-gray-500">Giảm 50% cho dự án CSR</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-gray-500">Tổng thanh toán</span>
                    <span className="text-2xl font-bold text-primary">{selectedExpert?.price}</span>
                  </div>

                  <button 
                    onClick={handleConfirmPayment}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                  >
                    Thanh toán & Đặt lịch
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={48} className="text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h2>
                  <p className="text-gray-500 text-center">Bác sĩ sẽ gọi cho bạn vào lúc {selectedTime} ngày {selectedDate.full} qua ứng dụng.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

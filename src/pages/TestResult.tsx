import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  useEffect(() => {
    localStorage.setItem('lastTestScore', score.toString());
    localStorage.setItem('lastTestDate', new Date().toISOString());
  }, [score]);

  const ranges = [
    { min: 0, max: 4, label: "Từ 0 - 4: Không có biểu hiện trầm cảm" },
    { min: 5, max: 9, label: "Từ 5 - 9: Trầm cảm mức độ nhẹ" },
    { min: 10, max: 14, label: "Từ 10 - 14: Trầm cảm mức độ vừa" },
    { min: 15, max: 19, label: "Từ 15 - 19: Trầm cảm mức độ nặng vừa" },
    { min: 20, max: 27, label: "Từ 20 - 27: Trầm cảm mức độ nặng" }
  ];

  return (
    <div className="h-full min-h-full bg-white flex flex-col font-sans">
      <div className="pt-14 pb-4 px-6 bg-white flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col max-w-md mx-auto w-full">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-[#4A90E2] text-center mb-8"
        >
          Kết quả kiểm tra
        </motion.h1>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#EAF4FF] rounded-2xl p-6 flex justify-between items-center mb-6"
        >
          <span className="text-lg font-medium text-gray-800">Tổng điểm của bạn</span>
          <span className="text-3xl font-bold text-gray-900">{score}</span>
        </motion.div>

        <div className="space-y-3 mb-8">
          {ranges.map((range, idx) => {
            const isActive = score >= range.min && score <= range.max;
            return (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isActive 
                    ? 'border-[#4A90E2] bg-[#EAF4FF]' 
                    : 'border-gray-100 bg-white'
                }`}
              >
                <span className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                  {range.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-auto pt-4 pb-6 space-y-3">
          <button 
            onClick={() => navigate('/home', { state: { showEmotionPopup: true } })}
            className="w-full py-4 bg-[#4A90E2] text-white rounded-full font-bold text-lg shadow-md hover:bg-[#357ABD] transition-all"
          >
            Vào trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

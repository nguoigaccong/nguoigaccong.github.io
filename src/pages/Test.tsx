import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  "Ít hứng thú hoặc niềm vui trong việc làm mọi thứ",
  "Cảm thấy buồn bã, chán nản, hoặc tuyệt vọng",
  "Khó ngủ, ngủ không sâu giấc, hoặc ngủ quá nhiều",
  "Cảm thấy mệt mỏi hoặc có ít năng lượng",
  "Chán ăn hoặc ăn quá nhiều",
  "Cảm thấy tồi tệ về bản thân, hoặc cảm thấy mình là kẻ thất bại",
  "Khó tập trung vào mọi việc, chẳng hạn như đọc báo hoặc xem tivi",
  "Di chuyển hoặc nói chuyện chậm chạp đến mức người khác có thể nhận ra, hoặc bồn chồn, bứt rứt",
  "Suy nghĩ rằng bạn sẽ tốt hơn nếu chết đi, hoặc muốn làm tổn thương bản thân"
];

const options = [
  { label: "Không có gì", score: 0 },
  { label: "Vài ngày", score: 1 },
  { label: "Hơn nửa ngày", score: 2 },
  { label: "Gần hàng ngày", score: 3 }
];

export default function Test() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedOption;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(newAnswers[currentQ + 1] !== undefined ? newAnswers[currentQ + 1] : null);
    } else {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      navigate('/test-result', { state: { score: totalScore } });
    }
  };

  return (
    <div className="h-full min-h-full bg-white flex flex-col font-sans">
      <div className="flex-1 px-6 py-8 flex flex-col max-w-md mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-8 mt-16">
          {/* <h1 className="text-3xl font-bold text-[#4A90E2] mb-3">Bài kiểm tra trầm cảm PHQ-9</h1> */}
          <p className="text-gray-700 text-sm px-4">
            Với mỗi đề mục, bạn chỉ chọn 1 phản hồi, không chọn nhiều phản hồi cùng lúc.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3 relative">
            {currentQ > 0 && (
              <button 
                onClick={() => {
                  setCurrentQ(currentQ - 1);
                  setSelectedOption(answers[currentQ - 1] !== undefined ? answers[currentQ - 1] : null);
                }}
                className="absolute left-0 flex items-center text-[#4A90E2] font-medium"
              >
                <ChevronLeft size={18} /> Trước
              </button>
            )}
            <div className="w-full text-center font-bold text-gray-800">
              {currentQ + 1}/{questions.length}
            </div>
            {selectedOption !== null && (
              <button 
              onClick={() => {
                if (currentQ < questions.length - 1) {
                  setCurrentQ(currentQ + 1);
                  setSelectedOption(answers[currentQ + 1] !== undefined ? answers[currentQ + 1] : null);
                }
              }}
              className="absolute right-0 flex items-center text-[#4A90E2] font-medium"
            >
              Sau <ChevronRight size={18} />
            </button>
            )}
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#4A90E2] rounded-full"
              initial={{ width: `${(currentQ / questions.length) * 100}%` }}
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-[17px] font-bold text-gray-900 mb-6">
              Đề mục {currentQ + 1}: {questions[currentQ]}
            </h2>

            <div className="space-y-4 mb-8">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt.score)}
                    className={`w-full p-5 rounded-2xl text-left font-medium transition-all flex justify-between items-center border-2 ${
                      isSelected 
                        ? 'border-[#4A90E2] bg-[#F0F7FF]' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <span className={`text-[15px] ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#4A90E2] flex items-center justify-center shrink-0 ml-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-4 pb-6">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-full text-lg font-bold transition-all ${
              selectedOption !== null
                ? 'bg-[#4A90E2] text-white shadow-md hover:bg-[#357ABD]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
}

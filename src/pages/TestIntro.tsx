import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TestIntro() {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#1a5b82] via-[#2a7a9c] to-[#e6a835]">
      {/* Background illustration placeholder */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          // backgroundImage: 'url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop")',
          backgroundImage: 'url("/jpg/test-intro-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md mx-auto w-full"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: 'Helvetica' }}>
            Mỗi hành trình<br />
            đều cần một tấm<br />
            bản đồ
          </h1>

          <div className="space-y-4">
            <p className="text-lg text-white/90 leading-relaxed font-large">
              Hãy kể cho mình nghe về bạn để chúng mình hiểu nhau hơn nhé
            </p>
            <p className="text-lg text-white/90 leading-relaxed font-large">
              Chỉ vài phút thôi, mình hứa
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-auto max-w-md mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/test-intro-confirm')}
              className="w-36 py-4 rounded-full bg-white text-primary font-bold text-lg shadow-xl active:scale-[0.98] transition-all"
            >
              Bỏ qua
            </button>
            <button
              onClick={() => navigate('/test')}
              className="w-36 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl active:scale-[0.98] transition-all"
            >
              Tiếp tục
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

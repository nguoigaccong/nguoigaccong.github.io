import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, ShieldCheck, MapPin, Phone, Sparkles, RadioIcon, Lock } from 'lucide-react';

const steps = [
  {
    title: "Đồng hành & Phát triển",
    description: "Bắt Sóng được đồng hành và phát triển bởi FPT Software, mang đến giải pháp công nghệ tiên tiến nhất để hỗ trợ sức khỏe tinh thần của bạn.",
    icon: (
      <div className="flex items-center justify-center w-full h-full p-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png" alt="FPT Software" className="w-full object-contain" referrerPolicy="no-referrer" />
      </div>
    )
  },
  {
    title: "Sứ mệnh của chúng tôi",
    description: "Trở thành mạng lưới thấu cảm lớn nhất Việt Nam, nơi công nghệ được nhân văn hóa để không một ai phải đơn độc trong bóng tối của trầm cảm.",
    icon: <HeartHandshake size={64} className="text-primary" />
  },
  {
    title: "Ưu tiên bảo mật",
    description: "",
    icon: <ShieldCheck size={64} className="text-secondary" />
  },
  {
    title: "Cho phép cấp quyền",
    description: "Để có thể hỗ trợ bạn kịp thời nhất trong các tình huống khẩn cấp, vui lòng cấp quyền truy cập vị trí và cuộc gọi.",
    icon: (
      <div className="flex gap-4">
        <Lock size={52} className="text-primary" />
      </div>
    )
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [agreedPermissions, setAgreedPermissions] = useState(false);

  const handleNext = () => {
    if (step === 3 && !agreedPermissions) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/test-intro');
    }
  };

  return (
    <div className="h-full bg-white flex flex-col justify-between px-6 py-12">
      <div className="h-6">
        {step !== 2 && (
          <div className="flex justify-between">
          {/* <button 
            onClick={() => navigate('/test-intro')}
            className="text-sm font-medium text-gray-400"
          >
            Quay lại
          </button> */}
          {/* <button 
            onClick={() => navigate('/test-intro')}
            className="text-sm font-medium text-gray-400"
          >
            Bỏ qua
          </button> */}
          </div>
        )}
      </div>
      {/* <div className="inline h-6">
        {step !== 2 && (
          <button 
            onClick={() => navigate('/test-intro')}
            className="text-sm font-medium text-gray-400"
          >
            Bỏ qua
          </button>
        )}
      </div> */}

      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            {step !== 2 && (
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                {steps[step].icon}
              </div>
            )}
            
            <h2 className={`text-2xl font-bold text-gray-900 ${step === 2 ? 'mb-8 text-3xl' : 'mb-4'}`} style={{ fontFamily: 'Helvetica' }}>
              {steps[step].title}
            </h2>
            
            {steps[step].description && (
              <p className="text-gray-500 leading-relaxed px-4">
                {steps[step].description}
              </p>
            )}

            {step === 2 && (
              <div className="w-full text-left space-y-6 px-2">
                <div className="flex gap-4 items-start">
                  <RadioIcon className="shrink-0 mt-1" style={{ color: '#00B8F1' }} size={28} fill="currentColor" />
                  <p className="text-gray-800 text-[15px] leading-relaxed font-medium">Ứng dụng của chúng tôi hỗ trợ hành trình sức khỏe tinh thần của bạn nhưng không thay thế các nhà trị liệu hoặc bác sĩ.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <RadioIcon className="shrink-0 mt-1" style={{ color: '#00B8F1' }} size={28} fill="currentColor" />
                  <p className="text-gray-800 text-[15px] leading-relaxed font-medium">Sử dụng mã hóa tiên tiến để bảo mật thông tin của bạn.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <RadioIcon className="shrink-0 mt-1" style={{ color: '#00B8F1' }} size={28} fill="currentColor" />
                  <p className="text-gray-800 text-[15px] leading-relaxed font-medium">Chúng tôi không chia sẻ dữ liệu của bạn nếu không có sự đồng ý.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <RadioIcon className="shrink-0 mt-1" style={{ color: '#00B8F1' }} size={28} fill="currentColor" />
                  <p className="text-gray-800 text-[15px] leading-relaxed font-medium">Bạn có thể chặn và báo cáo hành vi không phù hợp để cảm thấy an tâm hơn.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <RadioIcon className="shrink-0 mt-1" style={{ color: '#00B8F1' }} size={28} fill="currentColor" />
                  <p className="text-gray-800 text-[15px] leading-relaxed font-medium">Chính sách nghiêm ngặt đảm bảo tài khoản của bạn luôn được an toàn.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <label 
                className="flex items-center gap-3 mt-8 w-full px-2 text-left cursor-pointer justify-center"
                onClick={() => setAgreedPermissions(!agreedPermissions)}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors ${agreedPermissions ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                  {agreedPermissions && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-sm text-gray-700 font-medium select-none">Tôi đồng ý cấp quyền</span>
              </label>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-8">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>
        
        {step === 2 ? (
          <div className="flex gap-4">
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 rounded-full font-bold text-lg bg-white text-gray-900 border border-gray-300 shadow-sm active:scale-[0.98] transition-all"
            >
              TỪ CHỐI
            </button>
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 py-4 rounded-full font-bold text-lg bg-primary text-white active:scale-[0.98] transition-all"
            >
              ĐỒNG Ý
            </button>
          </div>
        ) : (
          <button 
            onClick={handleNext}
            disabled={step === 3 && !agreedPermissions}
            className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${(step === 3 && !agreedPermissions) ? 'bg-gray-200 text-gray-400' : 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-[0.98]'}`}
          >
            {step === steps.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
          </button>
        )}
      </div>
    </div>
  );
}

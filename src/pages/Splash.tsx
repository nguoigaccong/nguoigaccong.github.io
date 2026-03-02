import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Wifi } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!isLogin && !name.trim()) {
      setError('Vui lòng nhập họ và tên');
      return;
    }
    
    if (!email.trim()) {
      setError('Vui lòng nhập số điện thoại / email');
      return;
    }
    
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    // If validation passes, navigate to onboarding
    navigate('/onboarding');
  };

  return (
    <div className="min-h-full bg-white flex flex-col items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="relative w-32 h-32 flex items-center justify-center mb-0">
          {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-sm">
            <g id="logo_goc" data-name="logo goc">
              <path fill="#22409a" d="M602.99,725.65c-18.38,13.93-38.25,25.89-59.07,35.56-6.68,3.1-13.5,5.99-20.42,8.64-8.15,3.12-17.23,2.47-24.88-1.72-70.37-38.64-135.45-84.56-193.71-136.71-79.73-71.38-121.92-111.68-134.36-177.18-11.84-62.33-.19-115.31,33.7-153.22,47.19-52.79,115.85-51.89,129.15-51.17,56.65,3.06,123.9,37.23,142.8,96.62,3.56,11.19,13.56,50.84-7.42,90.93-3.06,5.84-31.49,57.16-88.05,61.44-2.37.17-58.1,3.89-87.08-36.99-5.93-8.36-24.39-37.99-12.97-68.23,9.38-24.85,33.2-35.23,34.21-35.66,8.69-3.7,18.08-5.32,27.9-4.82l26,.33c2.24.03,4.29-1.19,5.39-3.14,5.67-10.08-.03-21.84-6.28-31.22-7.96-11.96-28.51-12.99-29.91-13.01-10.39-.53-21.42.08-41.52,8.65-4.37,1.86-43.48,19.27-59.75,62.29-20.6,54.46,12.85,103.88,18.6,112,43.43,61.24,120.31,57.3,128.94,56.65,81.82-6.19,121.84-78.29,126.13-86.49,29.42-56.2,15.53-111.39,10.57-126.96-26.54-83.39-114.52-125.47-185.03-129.27-17.05-.92-105.2-2.03-166.71,66.77-43.37,48.51-59.28,117.16-44.82,193.32,15.98,84.15,71.85,134.16,149.18,203.39,66.77,59.78,142.06,111.69,223.76,154.31h0c5.44,2.84,11.78,3.43,17.66,1.66,16.61-5.02,32.99-11.27,48.7-18.56,23.85-11.08,46.61-24.78,67.66-40.73l18.72-14.19"/>
              <path fill="#00b8f1" d="M651.67,556.44c20.12-18.14,67.57-68.96,73.73-148.97,7.69-99.8-55.9-166.67-68.72-179.06l-16.97-16.39-32.49,34.24,16.97,16.39c10.14,9.8,60.42,62.65,54.37,141.14-4.85,62.88-42.31,102.98-58.2,117.3l-17.52,15.79"/>
              <path fill="#00b8f1" d="M795.14,591.68c27.37-29.25,74.18-92.08,80.06-184.26,7.34-114.93-56.08-195.68-75.69-217.7l-15.05-16.89-33.48,30.37,15.05,16.89c16.64,18.68,70.45,87.18,64.24,184.4-5.16,80.85-49.18,136.02-67.86,155.98l-15.46,16.52"/>
            </g>
          </svg> */}
          <img src="/png/logo-index.png" alt="Bắt Sóng" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        {/* <h1 className="text-3xl font-bold text-primary mt-0 tracking-tight" style={{ fontFamily: 'Helvetica' }}>Bắt Sóng</h1> */}
        <p className="text-sm text-gray-500 mt-2 text-center">Không một ai phải đơn độc trong bóng tối</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full space-y-4"
      >
        <div className="flex bg-gray-100 p-1 rounded-full mb-6">
          <button 
            className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            Đăng nhập
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            Đăng ký
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Họ và tên" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          )}
          <input 
            type="text" 
            placeholder="Số điện thoại / Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        {isLogin && (
          <div className="flex justify-end">
            <button className="text-sm text-secondary font-medium">Quên mật khẩu?</button>
          </div>
        )}

        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all mt-4"
        >
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">Hoặc tiếp tục với</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
              <span className="font-bold text-gray-700">G</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
              <span className="font-bold text-gray-700">f</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

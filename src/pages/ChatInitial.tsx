import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image as ImageIcon, ArrowLeft, Square } from 'lucide-react';
import { chatWithAI, generateEmotionImage, transcribeAudio } from '../services/geminiService';

export default function ChatInitial() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([
    { role: 'model', text: 'Chào bạn, mình là Bé Na. Hôm nay bạn cảm thấy thế nào, hãy chia sẻ cùng Na nhé!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [emotionImage, setEmotionImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isGeneratingImage]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const responseText = await chatWithAI(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText || '...' }]);
    setIsLoading(false);
  };

  const handleFinish = async () => {
    setIsGeneratingImage(true);
    const allUserText = messages.filter(m => m.role === 'user').map(m => m.text).join(' ');
    const imgUrl = await generateEmotionImage(allUserText || "Bình yên");
    setEmotionImage(imgUrl);
    setIsGeneratingImage(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = (reader.result as string).split(',')[1];
          setIsLoading(true);
          const transcribedText = await transcribeAudio(base64data, 'audio/webm');
          if (transcribedText) {
            setInput(transcribedText);
          }
          setIsLoading(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Vui lòng cấp quyền sử dụng micro để ghi âm.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5">
        <svg viewBox="0 0 200 200" className="w-64 h-64 text-primary" fill="currentColor">
          <path d="M100,30 C60,30 30,60 30,100 C30,140 60,170 100,170 C140,170 170,140 170,100 C170,60 140,30 100,30 Z M70,85 C78.284,85 85,91.716 85,100 C85,108.284 78.284,115 70,115 C61.716,115 55,108.284 55,100 C55,91.716 61.716,85 70,85 Z M130,85 C138.284,85 145,91.716 145,100 C145,108.284 138.284,115 130,115 C121.716,115 115,108.284 115,100 C115,91.716 121.716,85 130,85 Z M100,145 C80,145 65,130 65,130 L75,120 C75,120 85,130 100,130 C115,130 125,120 125,120 L135,130 C135,130 120,145 100,145 Z" />
        </svg>
      </div>

      <div className="pt-14 pb-4 px-6 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-primary" style={{ fontFamily: 'Helvetica' }}>Bé Na</h1>
          <span className="text-xs text-green-500 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 no-scrollbar relative z-10">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-3xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-sm shadow-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}

          {isGeneratingImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center my-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 font-medium">Đang vẽ bức tranh cảm xúc của bạn...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {emotionImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[32px] p-6 w-full max-w-sm flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-primary mb-2 text-center" style={{ fontFamily: 'Helvetica' }}>Món quà dành cho bạn</h3>
              <p className="text-sm text-gray-500 text-center mb-6">Bức tranh này được vẽ từ chính những cảm xúc bạn vừa chia sẻ.</p>
              
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src={emotionImage} alt="Emotion Art" className="w-full h-full object-cover" />
              </div>

              <button 
                onClick={() => navigate('/home')}
                className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Vào trang chủ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-8 relative z-20">
        {!emotionImage && !isGeneratingImage && (
          <div className="flex flex-col gap-3">
            <div className={`flex items-center gap-2 bg-white p-2 rounded-full border ${isRecording ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'} transition-all shadow-sm`}>
              {isRecording ? (
                <button onClick={stopRecording} className="p-2 text-red-500 hover:text-red-600 transition-colors animate-pulse">
                  <Square size={20} fill="currentColor" />
                </button>
              ) : (
                <button onClick={startRecording} className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Mic size={20} />
                </button>
              )}
              <input 
                type="text" 
                value={isRecording ? 'Đang ghi âm...' : input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập tin nhắn..." 
                disabled={isRecording}
                className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 disabled:text-red-500"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isRecording}
                className="p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:bg-gray-300 transition-colors"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
            
            {messages.length > 2 && (
              <button 
                onClick={handleFinish}
                className="w-full py-3 bg-secondary/10 text-secondary font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-secondary/20 transition-colors"
              >
                <ImageIcon size={18} />
                Hoàn thành & Nhận quà
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

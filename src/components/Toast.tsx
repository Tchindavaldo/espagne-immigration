import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-[#C9A84C]" />;
    }
  };

  const colors = {
    success: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    error: 'bg-red-50 border-red-100 text-red-900',
    info: 'bg-[#FDFCF9] border-[#C9A84C]/20 text-[#0D1B2A]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed top-8 right-8 z-[9999]"
    >
      <div className={`flex items-center gap-4 px-6 py-4 rounded-sm border shadow-2xl ${colors[type]} min-w-[320px] max-w-md relative overflow-hidden group`}>
        {/* Progress bar animation */}
        <motion.div 
          initial={{ width: '100%' }}
          animate={{ width: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-0.5 ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-[#C9A84C]'}`}
        />
        
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <p className="text-[13px] font-bold uppercase tracking-wider mb-0.5">
            {type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : 'Information'}
          </p>
          <p className="text-[14px] leading-relaxed opacity-80">{message}</p>
        </div>
        
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-900 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;


import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bg = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-boa-blue';

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] animate-slideUp">
      <div className={`${bg} text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 min-w-[200px] justify-center`}>
        <i className={`fa-solid ${
          type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'
        }`}></i>
        <span className="text-sm font-bold whitespace-nowrap">{message}</span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpToast {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />
    </div>
  );
};

export default Toast;

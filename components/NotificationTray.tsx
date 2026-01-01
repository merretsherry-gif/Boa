
import React from 'react';
import { AppNotification } from '../types';

interface NotificationTrayProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const NotificationTray: React.FC<NotificationTrayProps> = ({ 
  notifications, 
  isOpen, 
  onClose, 
  onMarkRead, 
  onMarkAllRead 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-[85%] max-w-sm h-full shadow-2xl animate-slideLeft flex flex-col">
        <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-4 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Activity</span>
            <button 
              onClick={onMarkAllRead}
              className="text-xs font-semibold text-boa-blue"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-1">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                onClick={() => onMarkRead(n.id)}
                className={`p-6 border-b border-gray-50 transition-colors cursor-pointer relative ${
                  n.isRead ? 'bg-white opacity-70' : 'bg-white border-l-4 border-l-boa-red'
                }`}
              >
                {!n.isRead && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-boa-red rounded-full"></div>
                )}
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'security' ? 'bg-red-50 text-red-500' :
                    n.type === 'insight' ? 'bg-amber-50 text-amber-500' :
                    n.type === 'transaction' ? 'bg-green-50 text-green-500' :
                    'bg-blue-50 text-boa-blue'
                  }`}>
                    <i className={`fa-solid ${
                      n.type === 'security' ? 'fa-shield-halved' :
                      n.type === 'insight' ? 'fa-lightbulb' :
                      n.type === 'transaction' ? 'fa-circle-dollar-to-slot' :
                      'fa-circle-info'
                    }`}></i>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800 text-sm">{n.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-2">{n.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-bell-slash text-gray-300 text-2xl"></i>
              </div>
              <p className="font-bold text-slate-400">All caught up!</p>
              <p className="text-xs text-gray-400 mt-1">We'll let you know when there's something new.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideLeft {
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}} />
    </div>
  );
};

export default NotificationTray;

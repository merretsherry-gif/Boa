
import React from 'react';

interface HeaderProps {
  unreadCount: number;
  onBellClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onBellClick }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 240 40" className="h-6 w-auto">
          <rect x="0" y="0" width="30" height="30" fill="#E31837" />
          <path d="M5 10 L25 10 L25 20 L5 20 Z" fill="white" />
          <path d="M5 10 L25 20" stroke="#00529b" strokeWidth="2" />
          <text x="40" y="25" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#E31837">BANK OF AMERICA</text>
        </svg>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onBellClick} className="text-boa-blue relative p-1 active:scale-90 transition-transform">
          <i className="fa-solid fa-bell text-xl"></i>
          {unreadCount > 0 && (
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-boa-blue flex items-center justify-center text-white font-bold text-xs shadow-sm">
          TM
        </div>
      </div>
    </header>
  );
};

export default Header;

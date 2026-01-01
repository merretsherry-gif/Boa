
import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { type: TabType.HOME, icon: 'fa-house', label: 'Home' },
    { type: TabType.TRANSFER, icon: 'fa-money-bill-transfer', label: 'Transfer' },
    { type: TabType.BILL_PAY, icon: 'fa-file-invoice-dollar', label: 'Bills' },
    { type: TabType.CHAT, icon: 'fa-comment-dots', label: 'Erica' },
    { type: TabType.MENU, icon: 'fa-bars', label: 'Menu' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t flex justify-around items-center h-20 px-2 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => setActiveTab(tab.type)}
          className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${
            activeTab === tab.type ? 'text-boa-red scale-110' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className={`mb-1 p-2 rounded-xl transition-all ${activeTab === tab.type ? 'bg-red-50' : ''}`}>
            <i className={`fa-solid ${tab.icon} text-lg`}></i>
          </div>
          <span className={`text-[9px] font-black uppercase tracking-tighter ${activeTab === tab.type ? 'opacity-100' : 'opacity-60'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;


import React from 'react';
import { USER_NAME, MOCK_EMAIL } from '../constants';

interface MenuProps {
  onLogout: () => void;
}

const Menu: React.FC<MenuProps> = ({ onLogout }) => {
  const menuSections = [
    {
      title: 'Banking & Accounts',
      items: [
        { icon: 'fa-building-columns', label: 'Manage Accounts' },
        { icon: 'fa-location-dot', label: 'Find an ATM/Bank' },
        { icon: 'fa-shield-heart', label: 'SafeBalance Settings' }
      ]
    },
    {
      title: 'Security & Profile',
      items: [
        { icon: 'fa-user-lock', label: 'Security Center' },
        { icon: 'fa-envelope-open-text', label: 'Contact Information' },
        { icon: 'fa-fingerprint', label: 'Biometrics Setup' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'fa-headset', label: 'Contact Us' },
        { icon: 'fa-circle-question', label: 'Help Center' }
      ]
    }
  ];

  return (
    <div className="animate-fadeIn space-y-6 pb-8">
      <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-boa-blue flex items-center justify-center text-white font-black text-xl shadow-lg shadow-boa-blue/20">
          TM
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">{USER_NAME}</h2>
          <p className="text-xs text-gray-400 font-semibold">{MOCK_EMAIL}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      <div className="space-y-8">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {section.items.map((item, idx) => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center justify-between px-6 py-5 active:bg-gray-50 transition-colors ${
                    idx !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-5 text-boa-blue flex justify-center">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{item.label}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-300 text-[10px]"></i>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full mt-6 py-4 rounded-xl border-2 border-boa-red/20 text-boa-red font-black text-sm hover:bg-red-50 transition-all active:scale-95"
      >
        Sign Out Securely
      </button>
      
      <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-6">
        App Version 5.24.1 (PROD)
      </p>
    </div>
  );
};

export default Menu;

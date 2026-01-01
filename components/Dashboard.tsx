
import React, { useState } from 'react';
import { USER_NAME, MOCK_TRANSACTIONS } from '../constants';
import { TabType } from '../types';

interface DashboardProps {
  balance: number;
  onQuickAction?: (tab: TabType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ balance, onQuickAction }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const quickActions = [
    { icon: 'fa-money-bill-transfer', label: 'Transfer', color: 'bg-blue-50 text-boa-blue', tab: TabType.TRANSFER },
    { icon: 'fa-file-invoice-dollar', label: 'Pay Bills', color: 'bg-red-50 text-boa-red', tab: TabType.BILL_PAY },
    { icon: 'fa-mobile-screen-button', label: 'Zelle®', color: 'bg-purple-50 text-purple-600', tab: TabType.TRANSFER },
    { icon: 'fa-camera', label: 'Deposit', color: 'bg-green-50 text-green-600', tab: TabType.HOME },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-4">
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-boa-red/5 rounded-full -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start mb-1">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Available Balance</p>
          <button onClick={handleSync} className={`${isRefreshing ? 'animate-spin' : ''} text-gray-300`}>
            <i className="fa-solid fa-rotate-right text-xs"></i>
          </button>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-4xl font-black text-boa-blue tracking-tight">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified • Advantage Plus (...8234)</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 active:bg-white active:shadow-md transition-all">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Checking</p>
            <p className="text-sm font-black text-slate-800">${(balance * 0.75).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 active:bg-white active:shadow-md transition-all">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Savings</p>
            <p className="text-sm font-black text-slate-800">${(balance * 0.25).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action) => (
          <button 
            key={action.label} 
            onClick={() => onQuickAction?.(action.tab)}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-100`}>
              <i className={`fa-solid ${action.icon}`}></i>
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Latest Activity</h4>
          <button className="text-boa-blue text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full">See All</button>
        </div>
        <div className="space-y-5">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between group active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${
                  tx.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-slate-500'
                }`}>
                  <i className={`fa-solid ${
                    tx.category === 'Food' ? 'fa-burger' : 
                    tx.category === 'Shopping' ? 'fa-bag-shopping' : 
                    tx.category === 'Income' ? 'fa-money-check-dollar' : 
                    tx.category === 'Bills' ? 'fa-file-invoice' : 'fa-arrow-right-arrow-left'
                  }`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{tx.description}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{tx.date} • {tx.category}</p>
                </div>
              </div>
              <p className={`font-black text-sm tracking-tight ${tx.amount > 0 ? 'text-green-600' : 'text-slate-800'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-2 text-center py-4 opacity-50">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Secured by BoA SafePass®</p>
        <p className="text-[9px] text-gray-400">Member FDIC • Equal Housing Lender</p>
        <p className="text-[8px] text-gray-300 mt-2">© 2024 Bank of America Corporation. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;

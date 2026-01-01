
import React from 'react';
import { MOCK_BILLS } from '../constants';

interface BillPayProps {
  onPay: (amount: number, biller: string) => void;
}

const BillPay: React.FC<BillPayProps> = ({ onPay }) => {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bill Pay</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Manage and pay your eBills</p>
        </div>
        <button className="w-10 h-10 bg-blue-50 text-boa-blue rounded-full flex items-center justify-center shadow-sm">
          <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_BILLS.map((bill) => (
          <div key={bill.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.99] transition-all">
            <div className="space-y-1">
              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{bill.name}</p>
              <p className="text-[10px] font-bold text-gray-400">Due {bill.dueDate} • eBill Active</p>
              <p className="text-2xl font-black text-slate-800 mt-2">${bill.amount.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => onPay(bill.amount, bill.name)}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-lg shadow-slate-900/10 transition-all"
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-widest">Recently Paid</h3>
          <i className="fa-solid fa-history text-gray-200 text-xs"></i>
        </div>
        <div className="space-y-3">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <i className="fa-solid fa-file-circle-check text-gray-300"></i>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No recently paid bills</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPay;

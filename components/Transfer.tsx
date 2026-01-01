
import React, { useState } from 'react';
import Keypad from './Keypad';

interface TransferProps {
  onTransfer: (amount: number, recipient: string) => void;
  balance: number;
}

const Transfer: React.FC<TransferProps> = ({ onTransfer, balance }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0 && val <= balance) {
      onTransfer(val, recipient);
    }
  };

  const handleKeyPress = (val: string) => {
    if (val === '.' && amount.includes('.')) return;
    if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
    setAmount(prev => prev + val);
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  return (
    <div className="animate-fadeIn space-y-6 pb-20">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pay & Transfer</h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Move money securely with SafePass®</p>
      </div>
      
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">From Account</label>
          <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50 flex justify-between items-center active:scale-[0.98] transition-all">
            <div>
              <p className="text-xs font-black text-slate-800">Advantage Plus Checking (...8234)</p>
              <p className="text-[10px] font-bold text-gray-400">Available: ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <i className="fa-solid fa-chevron-down text-gray-300 text-xs"></i>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Recipient</label>
          <div className="relative">
            <i className="fa-solid fa-user-plus absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
            <input 
              type="text" 
              placeholder="Name, Phone, or Account"
              className="w-full p-4 pl-10 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-boa-blue/10 outline-none text-sm font-semibold transition-all"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              onFocus={() => setIsKeypadVisible(false)}
            />
          </div>
        </div>

        <div onClick={() => setIsKeypadVisible(true)}>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Amount</label>
          <div className={`relative p-6 border ${isKeypadVisible ? 'border-boa-blue ring-4 ring-boa-blue/5' : 'border-gray-100'} rounded-2xl bg-gray-50 transition-all cursor-pointer`}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-gray-300">$</span>
            <div className="pl-12 text-4xl font-black text-boa-blue min-h-[40px]">
              {amount || <span className="text-gray-300">0.00</span>}
            </div>
          </div>
        </div>

        {!isKeypadVisible && (
          <button 
            onClick={handleSubmit}
            disabled={!amount || !recipient || parseFloat(amount) > balance}
            className="w-full bg-boa-red text-white font-black py-5 rounded-2xl shadow-xl shadow-boa-red/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:active:scale-100 uppercase text-xs tracking-widest"
          >
            Review & Send
          </button>
        )}
      </div>

      <div className="bg-boa-blue/5 p-5 rounded-3xl border border-boa-blue/10 flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <i className="fa-solid fa-shield-halved text-boa-blue text-xs"></i>
        </div>
        <div>
          <p className="text-[10px] font-black text-boa-blue uppercase tracking-widest mb-1">BoA Security Guarantee</p>
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            This transaction is protected by end-to-end encryption. Zelle® transfers are typically available within minutes.
          </p>
        </div>
      </div>

      {isKeypadVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
           <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SafePass® Keypad</span>
             <button onClick={() => setIsKeypadVisible(false)} className="text-boa-blue font-bold text-xs uppercase">Done</button>
           </div>
           <Keypad 
            onPress={handleKeyPress} 
            onDelete={handleDelete} 
            onDone={() => setIsKeypadVisible(false)} 
           />
        </div>
      )}
    </div>
  );
};

export default Transfer;

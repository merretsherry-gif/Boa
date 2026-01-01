
import React, { useState, useEffect } from 'react';
import { MOCK_EMAIL } from '../constants';
import Keypad from './Keypad';

interface OTPModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ onConfirm, onCancel }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    
    const timer = setTimeout(() => {
      alert(`BOA SECURITY: A code has been sent to ${MOCK_EMAIL}. Code: ${newCode}`);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (val: string) => {
    if (activeIdx > 5) return;
    const newCode = [...code];
    newCode[activeIdx] = val;
    setCode(newCode);
    if (activeIdx < 5) setActiveIdx(activeIdx + 1);
  };

  const handleDelete = () => {
    if (activeIdx < 0) return;
    const newCode = [...code];
    const targetIdx = code[activeIdx] === '' ? Math.max(0, activeIdx - 1) : activeIdx;
    newCode[targetIdx] = '';
    setCode(newCode);
    setActiveIdx(targetIdx);
  };

  const isComplete = code.every(c => c !== '');

  const verify = () => {
    if (code.join('') === generatedCode) {
      onConfirm();
    } else {
      alert('Invalid verification code. Please try again.');
      setCode(['', '', '', '', '', '']);
      setActiveIdx(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCancel}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-t-[40px] p-8 space-y-8 animate-slideUp">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-boa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-envelope-shield text-2xl text-boa-blue"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Email Verification</h2>
          <p className="text-xs text-gray-500 px-6 font-medium leading-relaxed">
            SafePass® code sent to <span className="font-bold text-slate-700">{MOCK_EMAIL}</span>.
          </p>
        </div>

        <div className="flex justify-center gap-2 max-w-sm mx-auto">
          {code.map((digit, idx) => (
            <div
              key={idx}
              className={`w-12 h-14 border-2 rounded-xl flex items-center justify-center text-xl font-black transition-all ${
                activeIdx === idx ? 'border-boa-blue bg-blue-50/50 scale-105' : 'border-gray-100 bg-gray-50'
              } ${digit ? 'text-slate-800' : 'text-gray-300'}`}
              onClick={() => setActiveIdx(idx)}
            >
              {digit || '•'}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button 
            onClick={verify}
            disabled={!isComplete}
            className="w-full bg-boa-red text-white font-black py-4 rounded-2xl shadow-xl shadow-boa-red/20 active:scale-95 transition-transform disabled:opacity-50 uppercase text-xs tracking-widest"
          >
            Authorize Transaction
          </button>
          <button 
            onClick={onCancel}
            className="w-full text-gray-400 font-black text-[10px] uppercase tracking-widest py-2"
          >
            Cancel and Return
          </button>
        </div>
      </div>
      
      <div className="relative bg-white z-[110]">
        <Keypad onPress={handleKeyPress} onDelete={handleDelete} onDone={verify} showDone={false} />
      </div>
    </div>
  );
};

export default OTPModal;

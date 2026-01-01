
import React, { useState } from 'react';
import { MOCK_USER_ID, MOCK_PASSCODE } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate production API delay
    setTimeout(() => {
      if (userId === MOCK_USER_ID && passcode === MOCK_PASSCODE) {
        onLogin();
      } else {
        setError('Invalid Online ID or Passcode.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col px-6 pt-12 animate-fadeIn">
      <div className="flex flex-col items-center mb-10">
        <svg viewBox="0 0 400 60" className="h-10 w-auto mb-6">
          <rect x="0" y="0" width="60" height="60" fill="#E31837" />
          <path d="M10 20 L50 20 L50 40 L10 40 Z" fill="white" />
          <path d="M10 20 L50 40" stroke="#00529b" strokeWidth="4" />
          <text x="75" y="42" fontFamily="Arial Black, sans-serif" fontSize="32" fill="#E31837">BANK OF AMERICA</text>
        </svg>
        <div className="bg-gray-50 px-3 py-1 rounded-full flex items-center gap-2 mb-2">
          <i className="fa-solid fa-lock text-[10px] text-gray-400"></i>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Environment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto w-full">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Online ID</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-boa-blue focus:bg-white transition-all text-sm font-semibold"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Online ID"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Passcode</label>
          <input 
            type="password" 
            className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-boa-blue focus:bg-white transition-all text-sm font-semibold"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold text-center border border-red-100 animate-fadeIn">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="saveId" className="w-5 h-5 accent-boa-blue rounded cursor-pointer" />
            <label htmlFor="saveId" className="text-xs font-bold text-slate-500">Save Online ID</label>
          </div>
          <button type="button" className="text-boa-blue text-xs font-bold">Help</button>
        </div>

        <button 
          type="submit"
          disabled={isLoading || !userId || !passcode}
          className="w-full bg-boa-red text-white font-black py-4 rounded-xl shadow-lg shadow-boa-red/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:active:scale-100"
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="space-y-4 pt-4">
          <button type="button" className="w-full text-boa-blue text-xs font-bold text-center">Forgot Online ID or Passcode?</button>
          <div className="flex items-center gap-4 text-gray-200">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-[10px] font-black text-gray-300 uppercase">Or</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>
          <button type="button" className="w-full text-boa-blue text-xs font-bold text-center">Open an Account</button>
        </div>
      </form>

      <div className="mt-auto pb-8 text-center px-4">
        <div className="flex justify-center gap-6 mb-4 opacity-40 grayscale">
          <i className="fa-brands fa-apple-pay text-2xl"></i>
          <i className="fa-brands fa-google-pay text-2xl"></i>
          <i className="fa-solid fa-shield-halved text-2xl"></i>
        </div>
        <p className="text-[9px] text-gray-400 leading-relaxed">
          Investment products are not FDIC insured • May lose value • Not a bank guarantee
        </p>
        <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-bold">
          Bank of America, N.A. Member FDIC
        </p>
      </div>
    </div>
  );
};

export default Login;

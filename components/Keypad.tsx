
import React from 'react';

interface KeypadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  onDone: () => void;
  showDone?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onPress, onDelete, onDone, showDone = true }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100 border-t border-gray-200 animate-slideUp">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onPress(key)}
          className="h-14 bg-white rounded-xl text-xl font-bold text-slate-800 shadow-sm active:bg-gray-200 active:scale-95 transition-all flex items-center justify-center"
        >
          {key}
        </button>
      ))}
      <button
        onClick={onDelete}
        className="h-14 bg-white rounded-xl text-xl font-bold text-boa-red shadow-sm active:bg-gray-200 active:scale-95 transition-all flex items-center justify-center"
      >
        <i className="fa-solid fa-delete-left"></i>
      </button>
      {showDone && (
        <button
          onClick={onDone}
          className="col-span-3 h-14 bg-boa-blue text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all mt-2"
        >
          Confirm Amount
        </button>
      )}
    </div>
  );
};

export default Keypad;

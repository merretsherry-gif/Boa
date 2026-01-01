
import React, { useMemo, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { CHART_DATA, MOCK_TRANSACTIONS } from '../constants';

const CATEGORY_COLORS: Record<string, string> = {
  'Food': '#ef4444',     // red-500
  'Shopping': '#3b82f6', // blue-500
  'Bills': '#10b981',    // emerald-500
  'Transfer': '#f59e0b', // amber-500
  'Income': '#8b5cf6'    // violet-500
};

const Statements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Aggregate spending by category from transactions
  const categoryData = useMemo(() => {
    const aggregates: Record<string, number> = {};
    
    MOCK_TRANSACTIONS.forEach(tx => {
      // We only care about spending (negative amounts)
      if (tx.amount < 0) {
        const absAmount = Math.abs(tx.amount);
        aggregates[tx.category] = (aggregates[tx.category] || 0) + absAmount;
      }
    });

    const data = Object.entries(aggregates).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    })).sort((a, b) => b.value - a.value);

    // Default to the highest category if none selected
    if (!selectedCategory && data.length > 0) {
      setSelectedCategory(data[0].name);
    }

    return data;
  }, [selectedCategory]);

  const totalSpending = useMemo(() => 
    categoryData.reduce((acc, curr) => acc + curr.value, 0), 
  [categoryData]);

  const filteredTransactions = useMemo(() => {
    if (!selectedCategory) return [];
    return MOCK_TRANSACTIONS.filter(tx => tx.category === selectedCategory && tx.amount < 0);
  }, [selectedCategory]);

  const onPieEnter = (_: any, index: number) => {
    setSelectedCategory(categoryData[index].name);
  };

  return (
    <div className="animate-fadeIn space-y-6 pb-12">
      <h2 className="text-2xl font-bold text-slate-800">Spending Trends</h2>
      
      {/* Category Breakdown Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="font-bold text-slate-800 mb-2 text-sm">Spending by Category</h3>
        <p className="text-xs text-gray-400 mb-4">Tap a slice to see detailed transactions</p>
        
        <div className="flex flex-col items-center">
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  onClick={(_, index) => setSelectedCategory(categoryData[index].name)}
                  onMouseEnter={onPieEnter}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.name] || '#cbd5e1'} 
                      style={{ 
                        filter: selectedCategory === entry.name ? 'brightness(1.1) drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                {selectedCategory || 'Total'}
              </span>
              <span className="text-lg font-bold text-slate-800">
                ${(selectedCategory 
                    ? categoryData.find(c => c.name === selectedCategory)?.value 
                    : totalSpending)?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="w-full mt-4 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
            {categoryData.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setSelectedCategory(item.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
                  selectedCategory === item.name 
                    ? 'bg-slate-50 border-slate-200 ring-2 ring-slate-100' 
                    : 'bg-white border-transparent'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[item.name] }}></div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  <span className="text-[9px] text-gray-400">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Drill-down */}
        {selectedCategory && (
          <div className="mt-6 pt-6 border-t border-gray-50 animate-fadeIn">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              {selectedCategory} Transactions
            </h4>
            <div className="space-y-4">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-slate-100 transition-colors">
                      <i className={`fa-solid text-xs ${
                        tx.category === 'Food' ? 'fa-burger' : 
                        tx.category === 'Shopping' ? 'fa-bag-shopping' : 
                        tx.category === 'Bills' ? 'fa-file-invoice' : 'fa-arrow-right-arrow-left'
                      }`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{tx.description}</p>
                      <p className="text-[10px] text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    -${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
              {filteredTransactions.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No recent transactions in this category.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Monthly Outflow Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-800 mb-6 text-sm">Monthly History</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="spending" radius={[4, 4, 0, 0]}>
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? '#E31837' : '#00529b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-800 mb-4 text-sm">Statement Downloads</h3>
        <div className="space-y-4">
          {['October 2024', 'September 2024', 'August 2024'].map((month) => (
            <div key={month} className="flex items-center justify-between py-2 group cursor-pointer border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <i className="fa-regular fa-file-pdf text-boa-red text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{month}</p>
                  <p className="text-[10px] text-gray-400">PDF Document • 1.2 MB</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <i className="fa-solid fa-download text-gray-400 group-hover:text-boa-blue"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statements;

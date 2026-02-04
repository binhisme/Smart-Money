
import React from 'react';
import { DailyPnL } from '../types';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface HistoryTableProps {
  data: DailyPnL[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  return (
    <div className="glass-mirror rounded-2xl overflow-hidden mt-8 border border-white/5">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
            <TrendingUp size={18} />
          </div>
          <h3 className="font-bold text-white">Lịch sử PnL Hàng Ngày</h3>
        </div>
        <button className="text-xs text-blue-400 font-semibold hover:underline">Xem tất cả</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/5 bg-black/20">
              <th className="px-6 py-4 font-semibold">Ngày giao dịch</th>
              <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
              <th className="px-6 py-4 font-semibold text-right">Lợi nhuận (%)</th>
              <th className="px-6 py-4 font-semibold text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">{item.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {item.isProfit ? (
                      <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                        <ArrowUpRight size={12} className="text-blue-500" />
                        <span>Profit</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                        <ArrowDownRight size={12} className="text-gray-400" />
                        <span>Loss</span>
                      </span>
                    )}
                  </div>
                </td>
                <td className={`px-6 py-4 text-right font-mono font-bold ${item.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {item.isProfit ? '+' : ''}{item.percentage}%
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white scale-75 cursor-pointer hover:scale-100 transition-transform">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;

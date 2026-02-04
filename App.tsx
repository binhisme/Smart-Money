
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProfileModal from './components/ProfileModal';
import { AppTab } from './types';
import { generatePnLDataForMonth } from './utils/dataGenerator';
import { 
  RefreshCw, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  X, 
  Zap, 
  Trophy, 
  AlertCircle, 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  LayoutGrid, 
  BarChart3,
  TrendingUp
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [historyMode, setHistoryMode] = useState<'grid' | 'list'>('grid');
  const [isAppFullscreen, setIsAppFullscreen] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const username = "PLong36";

  // Lịch sử PnL từ tháng 12/2025 đến 02/02/2026
  // Tổng lợi nhuận yêu cầu: 25.1%
  const monthlyResults = useMemo(() => [
    { id: 'm0', month: 'Tháng 02', year: 2026, result: 2.15, highest: false },
    { id: 'm1', month: 'Tháng 01', year: 2026, result: 8.30, highest: false },
    { id: 'm2', month: 'Tháng 12', year: 2025, result: 14.65, highest: true },
  ], []);

  const [selectedMonthId, setSelectedMonthId] = useState(monthlyResults[0].id);
  const currentMonthData = useMemo(() => monthlyResults.find(m => m.id === selectedMonthId)!, [selectedMonthId, monthlyResults]);

  const pnlHistoryFullMonth = useMemo(() => {
    return generatePnLDataForMonth(currentMonthData.month, currentMonthData.year, currentMonthData.result);
  }, [currentMonthData]);

  const stats = useMemo(() => {
    const dataWithResults = pnlHistoryFullMonth.filter(d => d.percentage !== 0);
    const winRate = dataWithResults.length > 0 
      ? ((dataWithResults.filter(d => d.isProfit).length / dataWithResults.length) * 100).toFixed(2)
      : "0.00";
    
    const avgMonthly = monthlyResults.reduce((acc, curr) => acc + curr.result, 0) / monthlyResults.length;
    
    return { winRate, avgMonthly: avgMonthly.toFixed(2) };
  }, [pnlHistoryFullMonth, monthlyResults]);

  const toggleAppFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error full-screen mode: ${err.message}`);
      });
      setIsAppFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsAppFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsAppFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const masters = useMemo(() => [
    { rank: 1, name: 'Apex Flow Execution (AFE)', pnl24h: 1.13, amount: 16240.5, private: true },
    { rank: 2, name: 'Precision Liquidity Strike (PLS)', pnl24h: 0.85, amount: 4120.0, private: false },
    { rank: 3, name: 'Quantum Pullback System (QPS)', pnl24h: 0.42, amount: 2890.0, private: false },
    { rank: 4, name: 'Adaptive Range Reversal (ARR)', pnl24h: -0.12, amount: 910.0, private: false },
    { rank: 5, name: 'Velocity Break Structure (VBS)', pnl24h: 0.25, amount: 1310.0, private: false },
  ], []);

  const financeData = {
    deposited: 8500.00,
    withdrawn: 4000.00,
    profitRate: 25.1, 
  };

  // Tính chuẩn tài sản: (Tiền nạp gốc + Lợi nhuận) - Tiền rút
  // (8500 * 1.251) - 4000 = 10633.5 - 4000 = 6633.5
  const calculatedAssets = (financeData.deposited * (1 + financeData.profitRate / 100)) - financeData.withdrawn;

  return (
    <div className="flex h-screen bg-black text-white font-inter overflow-hidden" id="app-root">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <Navbar 
          username={username}
          isAppFullscreen={isAppFullscreen} 
          onToggleFullscreen={toggleAppFullscreen} 
          onMenuToggle={() => setIsSidebarOpen(true)}
          onHistoryToggle={() => setIsHistorySidebarOpen(true)}
          onProfileClick={() => setIsProfileOpen(true)}
        />
        
        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-10 custom-scrollbar pb-24">
            {activeTab === AppTab.HOME ? (
              <>
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] lg:text-[10px] font-black text-red-500 uppercase tracking-widest">CẬP NHẬT: 02/02/2026 - SMARTMONEY-X AI V4.0</span>
                  </div>
                  <h2 className="text-3xl lg:text-6xl font-black tracking-tighter max-w-2xl leading-[1.1]">
                    Smart Money <br />
                    <span className="text-gray-500">Kỷ luật kiến tạo thịnh vượng.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="glass-card rounded-2xl p-5 lg:p-6 border border-white/5 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-green-500">
                      <Zap size={32} />
                    </div>
                    <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Tài sản hiện có</h4>
                    <div className="text-xl lg:text-2xl font-black text-white mt-1 font-mono">$ {calculatedAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <p className="text-[10px] text-green-500 mt-1 font-bold">+{financeData.profitRate}% ROI</p>
                  </div>
                  <div className="glass-card rounded-2xl p-5 lg:p-6 border border-white/5">
                    <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">PnL Trung bình tháng</h4>
                    <div className="text-xl lg:text-2xl font-black text-red-500 mt-1 font-mono">+{stats.avgMonthly}%</div>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold">Dựa trên {monthlyResults.length} tháng</p>
                  </div>
                  <div className="glass-card rounded-2xl p-5 lg:p-6 border border-white/5">
                    <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Tiền nạp</h4>
                    <div className="text-xl lg:text-2xl font-black text-blue-400 mt-1 font-mono">$ {financeData.deposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="glass-card rounded-2xl p-5 lg:p-6 border border-white/5">
                    <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Tiền rút</h4>
                    <div className="text-xl lg:text-2xl font-black text-red-400 mt-1 font-mono">$ {financeData.withdrawn.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg lg:text-2xl font-black text-red-500 tracking-tighter uppercase italic">Hiệu suất Master ngày 02/02</h3>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                    {masters.map((master, idx) => (
                      <div key={idx} className={`relative rounded-xl p-4 lg:p-6 flex flex-col items-center text-center transition-all border border-white/5 ${idx === 0 ? 'bg-yellow-600/10 border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.05)]' : 'bg-white/5'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs mb-4 ${idx === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}>{idx + 1}</div>
                        <p className="text-[10px] font-black text-white uppercase line-clamp-2 h-8 leading-tight mb-3">{master.name}</p>
                        <div className="mb-4">
                          <p className={`text-[9px] font-black ${master.pnl24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            Hôm nay ({master.pnl24h >= 0 ? '+' : ''}{master.pnl24h}%)
                          </p>
                          <p className="text-base lg:text-lg font-black text-white">${master.amount.toLocaleString()}</p>
                        </div>
                        <button className={`w-full py-2 rounded-lg text-[10px] font-black uppercase ${master.private ? 'border border-red-500/40 text-red-500' : 'bg-red-600 text-white'}`}>{master.private ? 'Riêng tư' : 'Sao chép'}</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[1.5rem] p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={18} className="text-red-500" />
                      <h3 className="font-bold text-base lg:text-lg">Bảng lịch sử PnL Trung bình</h3>
                    </div>
                    <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest border border-white/10 px-3 py-1 rounded-full">Dữ liệu tài khoản {username}</div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] uppercase text-gray-500 border-b border-white/5">
                          <th className="pb-4 font-black">Thời gian</th>
                          <th className="pb-4 font-black">Lợi nhuận gộp</th>
                          <th className="pb-4 font-black">Lợi nhuận ròng</th>
                          <th className="pb-4 font-black">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {monthlyResults.map((item) => (
                          <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-4">
                              <span className="text-sm font-bold text-gray-300">{item.month} {item.year}</span>
                            </td>
                            <td className="py-4">
                              <span className="text-base font-black text-green-500">+{item.result.toFixed(2)}%</span>
                            </td>
                            <td className="py-4 font-mono text-xs text-gray-400">
                              $ {(financeData.deposited * item.result / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-4">
                              <div className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${item.highest ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                                {item.highest ? 'Kỷ lục' : 'Tốt'}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
               <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500 text-center">
                <RefreshCw className="animate-spin" size={32} />
                <p className="font-bold uppercase tracking-widest text-sm">Đang cập nhật...</p>
               </div>
            )}
          </div>

          <div 
            className={`
              fixed lg:static inset-0 lg:inset-auto bg-[#030303] flex flex-col transition-all duration-300 z-[100]
              ${isHistorySidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              ${isHistoryExpanded ? 'lg:fixed lg:inset-0 lg:w-full lg:h-full lg:z-[150] lg:bg-black' : 'lg:w-[26rem] lg:border-l lg:border-white/5'}
            `}
          >
            <div className={`p-4 lg:p-6 flex flex-col gap-4 sticky top-0 bg-[#030303] z-40 border-b border-white/5`}>
               <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest italic text-white/40">Lịch sử Chi tiết</h3>
                  <button onClick={() => {setIsHistorySidebarOpen(false); setIsHistoryExpanded(false);}} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
               </div>

               <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
                  {monthlyResults.map(m => (
                    <button 
                      key={m.id} 
                      onClick={() => setSelectedMonthId(m.id)} 
                      className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        selectedMonthId === m.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-[#121212] text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {m.month.split(' ')[1]}/{m.year.toString().slice(2)}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                   <div className="flex items-center space-x-2">
                      <RefreshCw size={14} className="text-red-500" />
                      <h2 className="text-sm font-black uppercase tracking-tighter italic text-white">Daily PnL</h2>
                   </div>
                   <div className="flex items-center space-x-2">
                      <div className="flex bg-[#121212] p-1 rounded-xl">
                        <button onClick={() => setHistoryMode('list')} className={`p-1.5 rounded-lg transition-all ${historyMode === 'list' ? 'bg-white/5 text-white' : 'text-gray-600'}`}><BarChart3 size={14} /></button>
                        <button onClick={() => setHistoryMode('grid')} className={`p-1.5 rounded-lg transition-all ${historyMode === 'grid' ? 'bg-white/5 text-white' : 'text-gray-600'}`}><LayoutGrid size={14} /></button>
                      </div>
                      <button onClick={() => setIsHistoryExpanded(!isHistoryExpanded)} className="p-1.5 bg-[#121212] rounded-xl text-gray-500 hover:text-white transition-all">
                        {isHistoryExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                      </button>
                   </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
               <div className={`p-4 lg:p-6 space-y-6 ${isHistoryExpanded ? 'max-w-5xl mx-auto w-full' : ''}`}>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] p-4 lg:p-6 flex flex-col items-center justify-center">
                        <span className="text-[7px] lg:text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">ROI THÁNG</span>
                        <p className="text-lg lg:text-2xl font-black text-green-500">+{currentMonthData.result.toFixed(2)}%</p>
                     </div>
                     <div className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] p-4 lg:p-6 flex flex-col items-center justify-center">
                        <span className="text-[7px] lg:text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">WIN RATE</span>
                        <p className="text-lg lg:text-2xl font-black text-white">{stats.winRate}%</p>
                     </div>
                  </div>

                  <div className="pb-8">
                    {historyMode === 'grid' ? (
                       <div className={`grid ${isHistoryExpanded ? 'grid-cols-4 sm:grid-cols-7 lg:grid-cols-10' : 'grid-cols-4'} gap-2`}>
                          {pnlHistoryFullMonth.map((item, idx) => {
                             const dayNum = item.date.split('-')[2];
                             const hasData = item.percentage !== 0;

                             return (
                                <div key={idx} className={`aspect-square relative flex flex-col items-center justify-center rounded-xl border transition-all ${
                                   !hasData 
                                   ? 'border-white/[0.03] bg-[#080808] opacity-10'
                                   : item.isProfit 
                                     ? 'border-green-500/20 bg-green-500/[0.03]' 
                                     : 'border-red-500/20 bg-red-500/[0.03]'
                                }`}>
                                   <span className="absolute top-1.5 left-1.5 text-[8px] font-bold text-gray-600">{dayNum}</span>
                                   {hasData && (
                                      <p className={`text-[10px] font-black ${item.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.isProfit ? '+' : '-'}{Math.abs(item.percentage).toFixed(2)}%
                                      </p>
                                   )}
                                </div>
                             );
                          })}
                       </div>
                    ) : (
                       <div className="space-y-2">
                          {pnlHistoryFullMonth.filter(d => d.percentage !== 0).reverse().map((item, idx) => (
                             <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.isProfit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                      {item.isProfit ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                   </div>
                                   <div>
                                      <p className="text-[8px] text-gray-500 font-bold">{item.date.split('-').reverse().join('/')}</p>
                                      <p className={`text-sm font-black ${item.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                         {item.isProfit ? '+' : '-'}{Math.abs(item.percentage).toFixed(2)}%
                                      </p>
                                   </div>
                                </div>
                                <span className="text-[7px] font-bold text-gray-600 uppercase tracking-widest">{item.strategy?.split(' ')[0]}</span>
                             </div>
                          ))}
                       </div>
                    )}
                  </div>
               </div>
            </div>

            <div className="bg-[#030303] border-t border-white/5 p-5 space-y-4 sticky bottom-0 z-40">
               <div className="flex items-center space-x-3">
                  <button className="flex-1 py-3 bg-red-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white italic">SAO CHÉP NGAY</button>
               </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        username={username}
      />
    </div>
  );
};

export default App;

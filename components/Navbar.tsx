
import React from 'react';
import { Maximize, Minimize, Menu, History } from 'lucide-react';

interface NavbarProps {
  username: string;
  isAppFullscreen: boolean;
  onToggleFullscreen: () => void;
  onMenuToggle: () => void;
  onHistoryToggle: () => void;
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  username,
  isAppFullscreen, 
  onToggleFullscreen, 
  onMenuToggle, 
  onHistoryToggle,
  onProfileClick 
}) => {
  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-3 lg:px-8 bg-black/40 backdrop-blur-xl border-b border-white/5 z-50 sticky top-0">
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Menu toggle for mobile/tablet */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 bg-[#111] rounded-lg border border-white/5 text-gray-400 active:scale-95 transition-transform"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-600 rounded-lg flex items-center justify-center red-glow-btn transform -rotate-12">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[11px] sm:text-[12px] lg:text-lg font-black tracking-tighter leading-none text-white uppercase italic">Smart Money</h1>
            <p className="hidden xs:block text-[6px] lg:text-[8px] text-gray-500 uppercase tracking-widest mt-0.5 font-bold">
              Copy & Auto Trading
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
        {/* Language Flag */}
        <div className="flex items-center space-x-2 bg-[#111] px-1.5 py-1.5 sm:px-2 rounded-lg border border-white/5 cursor-pointer hover:bg-white/5 transition-colors group">
          <div className="w-5 h-3.5 flex items-center overflow-hidden rounded-[2px]">
            <svg width="20" height="14" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="18" fill="#DA251D"/>
              <path d="M12 4.5L13.2651 8.3934H17.3592L14.0471 10.8012L15.3122 14.6946L12 12.2868L8.68779 14.6946L9.95287 10.8012L6.64078 8.3934H10.7349L12 4.5Z" fill="#FFFF00"/>
            </svg>
          </div>
        </div>

        {/* Fullscreen Button */}
        <button 
          onClick={onToggleFullscreen}
          className="p-2 bg-[#111] rounded-lg border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          title="Toàn màn hình"
        >
          {isAppFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* History Button */}
        <button 
          onClick={onHistoryToggle}
          className="lg:hidden p-2 bg-red-600/10 rounded-lg border border-red-500/20 text-red-500 active:scale-95 transition-transform"
          title="Lịch sử ngày"
        >
          <History size={18} />
        </button>

        {/* Profile Section */}
        <div 
          onClick={onProfileClick}
          className="flex items-center space-x-1.5 lg:space-x-2 pl-1.5 lg:pl-4 border-l border-white/10 cursor-pointer group"
        >
          <div className="hidden sm:flex flex-col items-end group-hover:opacity-80 transition-opacity">
            <span className="text-[11px] lg:text-sm font-bold text-white leading-none">{username}</span>
            <span className="text-[8px] text-green-500 font-bold tracking-widest mt-1 uppercase">Online</span>
          </div>
          <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl border border-white/10 group-hover:border-white/30 transition-all p-0.5 bg-white flex items-center justify-center">
            <span className="text-black font-black text-xs lg:text-sm">P</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

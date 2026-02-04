
import React from 'react';
import { AppTab } from '../types';
import { SIDEBAR_ITEMS } from '../constants';
import { X } from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-72 lg:w-64 bg-[#050505] border-r border-white/5 z-[101] transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static flex flex-col h-full
      `}>
        {/* Logo Section */}
        <div className="p-6 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center red-glow-btn transform -rotate-12 transition-transform hover:rotate-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter leading-none text-white uppercase italic">Smart Money</h1>
              <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Copy & Auto Trading Platform
              </p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id as AppTab);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'active-nav text-white font-bold'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`${activeTab === item.id ? 'text-white' : 'text-gray-600 group-hover:text-red-500'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Version Badge */}
        <div className="p-4">
          <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
            <span className="text-[10px] text-red-500 font-black tracking-widest uppercase">CẬP NHẬT V2.4</span>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
              Hệ thống tối ưu hóa lợi nhuận đã kích hoạt.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

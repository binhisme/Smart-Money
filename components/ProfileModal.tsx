
import React from 'react';
import { X, Edit2, Copy, Smartphone, Mail, UserCheck, Lock, ShieldCheck, ChevronRight } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;

  const profileData = {
    uid: 'VN29654102',
    mobile: '09*******290',
    email: 'p*********9@gmail.com',
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 -right-2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all active:scale-90 z-[210]"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
          <div className="p-6 space-y-4">
            {/* Section 1: Nickname & Avatar */}
            <div className="bg-[#141414] p-5 rounded-[2rem] border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl border-2 border-red-600/30 overflow-hidden p-0.5 bg-black flex items-center justify-center shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-[#141414] rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight tracking-tight">{username}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">UID: {profileData.uid}</span>
                    <button className="text-green-500/80 hover:text-green-400 transition-colors">
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
              </div>
              <button className="p-2 text-green-500 hover:bg-green-500/10 rounded-xl transition-all">
                <Edit2 size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* Section 2: Account Info */}
            <div className="bg-[#141414] rounded-[2rem] border border-white/5 overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Smartphone size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Di động</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-400 tracking-wider font-mono">{profileData.mobile}</span>
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </div>
              
              <div className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Email(Tài khoản)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-400 font-mono tracking-tight">{profileData.email}</span>
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* Section 3: Security & Verification */}
            <div className="bg-[#141414] rounded-[2rem] border border-white/5 overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <UserCheck size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Xác minh danh tính</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black text-white uppercase tracking-tighter italic">Đã xác minh</span>
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
                     <ShieldCheck size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Lock size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Mật khẩu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black text-green-500 uppercase italic tracking-tighter">Đặt lại</span>
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Brand Button */}
          <div className="px-6 pb-8 pt-2">
            <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl text-sm font-black uppercase tracking-[0.25em] text-white shadow-xl shadow-red-600/20 active:scale-[0.98] transition-all italic">
              Smart Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

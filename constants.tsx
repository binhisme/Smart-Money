
import React from 'react';
import { 
  Home, 
  Settings, 
  Wallet, 
  Trophy, 
  Info,
  Activity,
  Cpu
} from 'lucide-react';
import { AppTab } from './types';

export const SIDEBAR_ITEMS = [
  { id: AppTab.HOME, label: 'Trang chủ', icon: <Home size={18} /> },
  { id: 'copy-trading', label: 'Copy Trading', icon: <Activity size={18} /> },
  { id: 'auto-trading', label: 'Auto Trading', icon: <Cpu size={18} /> },
  { id: AppTab.STRATEGY, label: 'Cấu hình chiến lược', icon: <Settings size={18} /> },
  { id: AppTab.CAPITAL, label: 'Cấu hình vốn', icon: <Wallet size={18} /> },
  { id: AppTab.LEADERBOARD, label: 'BXH Master', icon: <Trophy size={18} /> },
  { id: AppTab.NOTES, label: 'Thông tin lưu ý', icon: <Info size={18} /> },
];

export const VIETNAM_FLAG = (
  <svg width="20" height="14" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="18" fill="#DA251D"/>
    <path d="M12 4.5L13.2651 8.3934H17.3592L14.0471 10.8012L15.3122 14.6946L12 12.2868L8.68779 14.6946L9.95287 10.8012L6.64078 8.3934H10.7349L12 4.5Z" fill="#FFFF00"/>
  </svg>
);

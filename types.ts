
export enum AppTab {
  HOME = 'trang-chu',
  STRATEGY = 'cau-hinh-chien-luoc',
  CAPITAL = 'cau-hinh-von',
  LEADERBOARD = 'bxh-master',
  NOTES = 'thong-tin-can-luu-y'
}

export interface DailyPnL {
  date: string;
  percentage: number;
  isProfit: boolean;
  strategy?: string;
}

export interface MonthlyResult {
  month: string;
  year: number;
  totalPnL: number;
}

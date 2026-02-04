
import { DailyPnL } from '../types';

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const STRATEGIES = [
  'Alpha-X AI V4.0',
  'Apex Flow Execution',
  'Precision Liquidity',
  'Quantum Pullback',
  'Velocity Break',
  'Adaptive Range'
];

export const generatePnLDataForMonth = (monthName: string, year: number, targetTotalPnL: number): DailyPnL[] => {
  const monthInt = parseInt(monthName.replace('Tháng ', ''));
  const daysInMonth = getDaysInMonth(monthInt, year);
  
  const isJan2026 = monthInt === 1 && year === 2026;
  const isFeb2026 = monthInt === 2 && year === 2026;
  
  // Giới hạn ngày hiển thị thực tế - Cập nhật lên ngày 4 cho tháng 2
  const currentDayLimit = isJan2026 ? 31 : (isFeb2026 ? 4 : daysInMonth);

  const data: DailyPnL[] = [];
  
  const lossDaysRatio = 0.185 + (Math.random() * (0.1));
  const lossDaysCount = Math.floor(currentDayLimit * lossDaysRatio); 

  let adjustedTarget = targetTotalPnL;
  let fixedValues: Record<number, number> = {};

  if (isJan2026) {
    fixedValues[31] = 0.88;
    fixedValues[30] = 1.25;
    fixedValues[29] = 1.14;
    fixedValues[28] = 0.91;
    fixedValues[27] = 1.05;
    fixedValues[26] = 0.77;
    adjustedTarget = targetTotalPnL - 6.00; // Giả định target cho các ngày còn lại
  } else if (isFeb2026) {
    // Dữ liệu thực tế đầu tháng 2 (Đảm bảo dưới 1.5%)
    fixedValues[1] = 1.12;
    fixedValues[2] = 0.84;
    fixedValues[3] = 1.31;
    fixedValues[4] = 0.95; // Cập nhật ngày 4/2
    adjustedTarget = targetTotalPnL - (1.12 + 0.84 + 1.31 + 0.95);
  }

  const simulationLimit = isFeb2026 ? 0 : (isJan2026 ? 25 : currentDayLimit);
  const simLossCount = Math.min(lossDaysCount, simulationLimit);
  const simProfitCount = Math.max(0, simulationLimit - simLossCount);

  const losses: number[] = [];
  let sumLosses = 0;
  for (let i = 0; i < simLossCount; i++) {
    const val = -(0.5 + Math.random() * 0.5);
    losses.push(val);
    sumLosses += val;
  }

  const neededProfitSum = adjustedTarget - sumLosses;
  const avgProfitPerDay = simProfitCount > 0 ? neededProfitSum / simProfitCount : 0;

  const profits: number[] = [];
  let currentProfitSum = 0;
  if (simProfitCount > 0) {
    for (let i = 0; i < simProfitCount - 1; i++) {
      const variance = (Math.random() * 0.4 - 0.2) * avgProfitPerDay;
      let val = avgProfitPerDay + variance;
      if (val < 0.1) val = 0.2 + (Math.random() * 0.1);
      profits.push(val);
      currentProfitSum += val;
    }
    profits.push(neededProfitSum - currentProfitSum);
  }

  const allSimValues = [...losses.map(v => ({ val: v, isProfit: false })), ...profits.map(v => ({ val: v, isProfit: true }))];
  for (let i = allSimValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allSimValues[i], allSimValues[j]] = [allSimValues[j], allSimValues[i]];
  }

  let simIndex = 0;
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${monthInt.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    const randomStrategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
    
    if (fixedValues[i] !== undefined) {
      data.push({
        date: dateStr,
        percentage: fixedValues[i],
        isProfit: fixedValues[i] > 0,
        strategy: 'SmartMoney-X AI V4.0'
      });
    } else if (i <= currentDayLimit && simIndex < allSimValues.length) {
      const result = allSimValues[simIndex++];
      data.push({
        date: dateStr,
        percentage: Number(result.val.toFixed(2)),
        isProfit: result.isProfit,
        strategy: randomStrategy
      });
    } else {
      data.push({
        date: dateStr,
        percentage: 0,
        isProfit: true,
        strategy: '-'
      });
    }
  }
  
  return data;
};

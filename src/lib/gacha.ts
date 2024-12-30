export interface GachaItem {
  amount: number;
  probability: number;
}

export type GachaConfig = GachaItem[];

export class GachaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GachaError';
  }
}

/**
 * ガチャの設定が有効かどうかを検証する
 */
function validateConfig(config: GachaConfig): void {
  // 配列が空でないことを確認
  if (config.length === 0) {
    throw new GachaError('ガチャの設定が空です');
  }

  // 各アイテムの値が有効であることを確認
  config.forEach((item, index) => {
    if (typeof item.amount !== 'number' || isNaN(item.amount) || item.amount <= 0) {
      throw new GachaError(`金額が不正です (index: ${index}, amount: ${item.amount})`);
    }
    if (typeof item.probability !== 'number' || isNaN(item.probability) || item.probability < 0 || item.probability > 1) {
      throw new GachaError(`確率が不正です (index: ${index}, probability: ${item.probability})`);
    }
  });

  // 確率の合計を検証
  const totalProb = config.reduce((acc, item) => acc + item.probability, 0);
  if (Math.abs(totalProb - 1.0) > 1e-9) {
    throw new GachaError(`確率の合計が1.0ではありません (total: ${totalProb})`);
  }
}

export const OTOSHIDAMA_CONFIG: GachaConfig = [
  { amount: 1000, probability: 0.20 }, // 1000円
  { amount: 2000, probability: 0.29 }, // 2000円
  { amount: 3000, probability: 0.24 }, // 3000円
  { amount: 4000, probability: 0.10 }, // 4000円
  { amount: 5000, probability: 0.07 }, // 5000円
  { amount: 6000, probability: 0.03 }, // 6000円
  { amount: 7000, probability: 0.02 }, // 7000円
  { amount: 8000, probability: 0.02 }, // 8000円
  { amount: 9000, probability: 0.02 }, // 9000円
  { amount: 10000, probability: 0.01 }, // 10000円
];

/**
 * 期待値を計算する
 * @throws {GachaError} 設定が不正な場合
 */
export function calculateExpectedValue(config: GachaConfig): number {
  validateConfig(config);
  return config.reduce((sum, item) => sum + item.amount * item.probability, 0);
}

/**
 * ガチャを実行する
 * @throws {GachaError} 設定が不正な場合
 */
export function spinGacha(config: GachaConfig): number {
  validateConfig(config);
  
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (const item of config) {
    cumulativeProbability += item.probability;
    if (random <= cumulativeProbability) {
      return item.amount;
    }
  }
  
  // 丸め誤差対策として、最小値を返す
  const minAmount = Math.min(...config.map(item => item.amount));
  return minAmount;
}
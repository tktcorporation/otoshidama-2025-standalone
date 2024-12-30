export interface GachaConfig {
  amounts: number[];
  probabilities: number[];
}

export const OTOSHIDAMA_CONFIG: GachaConfig = {
  amounts: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  // 期待値が3000円になるように確率を調整
  probabilities: [0.28, 0.28, 0.23, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03]
};

/**
 * 期待値を計算する
 */
export function calculateExpectedValue(config: GachaConfig): number {
  return config.amounts.reduce((sum, amount, index) => {
    return sum + amount * config.probabilities[index];
  }, 0);
}

/**
 * 確率の検証を行う
 */
function validateProbabilities(config: GachaConfig): void {
  const totalProb = config.probabilities.reduce((acc, p) => acc + p, 0);
  if (Math.abs(totalProb - 1.0) > 1e-9) {
    console.warn("確率の合計が1.0ではありません");
  }
}

/**
 * ガチャを実行する
 */
export function spinGacha(config: GachaConfig): number {
  validateProbabilities(config);
  
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (let i = 0; i < config.probabilities.length; i++) {
    cumulativeProbability += config.probabilities[i];
    if (random <= cumulativeProbability) {
      return config.amounts[i];
    }
  }
  
  return config.amounts[0];
}
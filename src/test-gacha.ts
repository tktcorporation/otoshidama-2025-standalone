import { spinGacha, OTOSHIDAMA_CONFIG } from './lib/gacha';

// 試行回数
const TRIAL_COUNT = 30;

const results = new Map<number, number>();
let totalAmount = 0;

// TRIAL_COUNT回ガチャを実行
for (let i = 0; i < TRIAL_COUNT; i++) {
  const amount = spinGacha(OTOSHIDAMA_CONFIG);
  totalAmount += amount;
  results.set(amount, (results.get(amount) || 0) + 1);
}

console.log(`=== ガチャ結果（${TRIAL_COUNT}回） ===`);
console.log('金額\t回数\t確率');
for (const [amount, count] of [...results.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`${amount}円\t${count}回\t${(count/TRIAL_COUNT*100).toFixed(1)}%`);
}

const fixedAmount = 3000 * TRIAL_COUNT;
console.log('\n=== 金額比較 ===');
console.log(`ガチャ合計金額: ${totalAmount.toLocaleString()}円`);
console.log(`3000円固定の場合: ${fixedAmount.toLocaleString()}円`);
console.log(`差額: ${(totalAmount - fixedAmount).toLocaleString()}円`); 
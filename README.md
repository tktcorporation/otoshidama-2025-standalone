# お年玉ガチャ

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%93-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%E2%9C%93-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-%E2%9C%93-646CFF.svg)](https://vitejs.dev/)

お年玉の金額をガチャで決めることができるWebアプリケーション 🎊

<img src="public/ogp.png" alt="お年玉ガチャのogp" width="600">

</div>

## 📖 概要

お年玉の金額をランダムに決定できるWebアプリケーションです。

### ✨ 主な機能

- 🎯 お年玉の金額をガチャで決定
  - アニメーション付きのガチャ演出
  - 期待値: 約3000円

### 💰 ガチャ参考データ

30回試行した際の結果例：

```bash
# 必要なパッケージのインストール
npm install

# 30回試行のテスト実行
npx tsx src/test-gacha.ts
```

```
=== ガチャ結果（30回） ===
金額    回数    確率
1000円  7回     23.3%
2000円  10回    33.3%
3000円  5回     16.7%
5000円  1回     3.3%
6000円  2回     6.7%
7000円  3回     10.0%
8000円  1回     3.3%
9000円  1回     3.3%

=== 金額比較 ===
ガチャ合計金額: 97,000円
3000円固定の場合: 90,000円
差額: +7,000円
```

※ これはあくまでも一例であり、実際の結果は毎回異なります。

## 📝 ライセンス

MIT

## 📞 連絡先

- X (Twitter): [@tktcorporation](https://x.com/tktcorporation)

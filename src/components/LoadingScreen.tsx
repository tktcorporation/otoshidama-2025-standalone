import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Stars } from "lucide-react";
import { useState, useEffect } from "react";

type LoadingScreenProps = {
  isHighValue?: boolean;
  resultAmount: number;
};

const AMOUNT_STEPS = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
const STEP_DURATION = 150; // 各ステップの表示時間（ミリ秒）
const ANIMATION_DURATION = 3500; // 全体のアニメーション時間（ミリ秒）

export function LoadingScreen({ isHighValue = false, resultAmount }: LoadingScreenProps) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([]);
  const [currentAmount, setCurrentAmount] = useState(1000);
  const [isRolling, setIsRolling] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    const startTime = Date.now();
    let baseAmount = 1000;

    const rollAmount = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1);

      // アニメーションの段階に応じて異なる動作をする
      if (progress < 0.4) {
        // 序盤: 少しずつ上がっていく
        baseAmount = Math.min(baseAmount + 500, 4000);
        const chance = Math.random();
        if (chance < 0.1) { // 10%の確率で少し高い金額を表示
          const nextAmount = AMOUNT_STEPS[Math.floor(Math.random() * 6)]; // 1000-6000円
          setCurrentAmount(nextAmount);
        } else {
          setCurrentAmount(baseAmount);
        }
        timeoutIds.push(setTimeout(rollAmount, STEP_DURATION));
      } else if (progress < 0.7) {
        // 中盤: より大きく上がっていく
        baseAmount = Math.min(baseAmount + 1000, 6000);
        const chance = Math.random();
        if (chance < 0.2) { // 20%の確率でより高い金額を表示
          const nextAmount = AMOUNT_STEPS[Math.floor(Math.random() * 8)]; // 1000-8000円
          setCurrentAmount(nextAmount);
        } else {
          setCurrentAmount(baseAmount);
        }
        timeoutIds.push(setTimeout(rollAmount, STEP_DURATION + 50));
      } else if (progress < 0.9) {
        // 終盤: 結果に向かって収束し始める
        const targetBase = Math.max(baseAmount, resultAmount - 2000);
        baseAmount = Math.min(baseAmount + 1000, targetBase);
        const chance = Math.random();
        if (chance < 0.3) { // 30%の確率で結果付近の金額を表示
          const variation = Math.floor(Math.random() * 2000);
          const nextAmount = Math.min(10000, Math.max(1000, resultAmount + variation));
          setCurrentAmount(nextAmount);
        } else {
          setCurrentAmount(baseAmount);
        }
        timeoutIds.push(setTimeout(rollAmount, STEP_DURATION + 100));
      } else if (progress < 1) {
        // ラスト: 結果に向かって収束
        const remainingSteps = Math.ceil((1 - progress) / 0.1); // 残りのステップ数
        const amountDiff = resultAmount - baseAmount;
        baseAmount = baseAmount + (amountDiff / remainingSteps);
        setCurrentAmount(Math.round(baseAmount / 1000) * 1000); // 1000円単位に丸める
        timeoutIds.push(setTimeout(rollAmount, STEP_DURATION + 150));
      } else {
        // 最後: 結果の金額に確定
        setCurrentAmount(resultAmount);
        setIsRolling(false);
      }
    };

    if (isRolling) {
      timeoutIds.push(setTimeout(rollAmount, STEP_DURATION));
    }

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [isRolling, resultAmount]);

  const handleGiftClick = async () => {
    // プレゼントを揺らす
    await controls.start({
      scale: [1, 1.3, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.5 }
    });

    // 新しい星を生成
    const newStars = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -100 - 50,
      rotation: Math.random() * 360,
    }));
    
    setStars(newStars);
    
    // 1秒後に星を消す
    setTimeout(() => {
      setStars([]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden ${
        isHighValue ? "bg-gradient-to-br from-red-600 to-yellow-500" : "bg-red-600"
      }`}
    >
      <div className={`absolute inset-0 ${isHighValue ? "bg-black/60" : "bg-black/80"}`} />
      
      {/* 高額当選時の追加エフェクト */}
      {isHighValue && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 opacity-30" />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 100%)",
          backgroundSize: isHighValue ? "150px 150px" : "100px 100px",
          opacity: isHighValue ? 0.7 : 0.5,
        }}
      />

      <div className="text-center space-y-8 relative">
        <motion.div
          className="relative"
          animate={{
            scale: isHighValue ? [1, 1.2, 1] : [1, 1.1, 1],
            rotate: isHighValue ? [0, 10, -10, 0] : [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            animate={{
              scale: isRolling ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              repeat: isRolling ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <motion.span 
              className={`font-bold text-2xl ${currentAmount >= 6000 ? "text-yellow-300" : "text-white"}`}
              animate={{
                scale: currentAmount >= 6000 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              ¥{currentAmount.toLocaleString()}
            </motion.span>
          </motion.div>

          <motion.div
            animate={controls}
            className="relative cursor-pointer"
            onClick={handleGiftClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className={`w-24 h-24 ${isHighValue ? "text-yellow-300" : "text-white"} drop-shadow-lg`} />
            
            {/* クリック時に飛び散る星エフェクト */}
            <AnimatePresence>
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    x: star.x,
                    y: star.y,
                    rotate: star.rotation
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Stars className="w-6 h-6 text-yellow-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translate(${isHighValue ? 70 : 60}px)`,
                }}
                animate={{
                  scale: isHighValue ? [1, 1.5, 1] : [1, 1.2, 1],
                  opacity: isHighValue ? [0.7, 1, 0.7] : [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * (isHighValue ? 0.2 : 0.5),
                  ease: "easeInOut",
                }}
              >
                <Sparkles className={`w-8 h-8 ${isHighValue ? "text-yellow-400" : "text-yellow-300"}`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <motion.h2
            animate={{
              scale: isHighValue ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`text-2xl font-bold ${
              isHighValue ? "text-yellow-300" : "text-white"
            } drop-shadow-lg`}
          >
            お年玉を準備中...
          </motion.h2>
          <p className={`${isHighValue ? "text-yellow-100" : "text-white/80"}`}>
            {isHighValue ? "✨特別なお年玉が待っています✨" : "✨たくさんもらえたらいいな✨"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

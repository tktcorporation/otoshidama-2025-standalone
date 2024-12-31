import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

type LoadingScreenProps = {
  isHighValue?: boolean;
};

export function LoadingScreen({ isHighValue = false }: LoadingScreenProps) {
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
          backgroundSize: "100px 100px",
          opacity: 0.5,
        }}
      />

      <div className="text-center space-y-8 relative">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Gift className={`w-24 h-24 ${isHighValue ? "text-yellow-300" : "text-white"} drop-shadow-lg`} />
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
                  transform: `rotate(${angle}deg) translate(60px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
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
              scale: [1, 1.05, 1],
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

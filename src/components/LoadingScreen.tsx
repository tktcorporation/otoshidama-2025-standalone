import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-black/80"
    >
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
          <Gift className="w-24 h-24 text-white drop-shadow-lg" />
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
            {[0, 90, 180, 270].map((angle, index) => (
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
                <Sparkles className="w-8 h-8 text-yellow-300" />
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
            className="text-2xl font-bold text-white drop-shadow-lg"
          >
            お年玉を準備中...
          </motion.h2>
          <p className="text-white/80">素敵な金額が当たりますように！</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

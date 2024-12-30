import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "../lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("w-full flex justify-center items-center", className)}>
      <div className="flex gap-6">
        <span className="text-sm font-medium text-white/90">連絡先:</span>
        <a
          href="https://github.com/tktcorporation/otoshidama-2025-standalone"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="https://x.com/tktcorporation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <FaXTwitter className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

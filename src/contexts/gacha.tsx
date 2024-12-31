import { useState, ReactNode } from "react";
import { GachaContext } from "./gachaContext";
import { GachaResult } from "./types";

export function GachaProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<GachaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GachaContext.Provider
      value={{
        result,
        setResult,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GachaContext.Provider>
  );
}

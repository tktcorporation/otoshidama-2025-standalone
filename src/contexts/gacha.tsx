import { createContext, useState, useContext, ReactNode } from "react";

export interface GachaResult {
  playerName: string;
  amount: number;
}

interface GachaContextType {
  result: GachaResult | null;
  setResult: (result: GachaResult | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const GachaContext = createContext<GachaContextType>({
  result: null,
  setResult: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export function useGacha() {
  const context = useContext(GachaContext);
  if (context === undefined) {
    throw new Error("useGacha must be used within a GachaProvider");
  }
  return context;
}

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

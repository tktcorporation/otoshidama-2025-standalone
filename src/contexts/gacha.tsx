import { createContext } from 'react';

export interface GachaResult {
  playerName: string;
  amount: number;
}

export const GachaContext = createContext<{
  result: GachaResult | null;
  setResult: (result: GachaResult | null) => void;
}>({
  result: null,
  setResult: () => {},
}); 
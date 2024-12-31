export interface GachaResult {
  playerName: string;
  amount: number;
}

export interface GachaContextType {
  result: GachaResult | null;
  setResult: (result: GachaResult | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

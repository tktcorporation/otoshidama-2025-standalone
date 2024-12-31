import { createContext } from "react";
import { GachaContextType } from "./types";

export const GachaContext = createContext<GachaContextType>({
  result: null,
  setResult: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

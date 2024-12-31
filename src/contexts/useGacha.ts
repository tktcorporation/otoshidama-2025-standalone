import { useContext } from "react";
import { GachaContext } from "./gachaContext";

export function useGacha() {
  const context = useContext(GachaContext);
  if (context === undefined) {
    throw new Error("useGacha must be used within a GachaProvider");
  }
  return context;
}

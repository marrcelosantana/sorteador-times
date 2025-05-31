import { PlayersContext } from "@/contexts/players-context";
import { useContext } from "react";

export function usePlayers() {
  const context = useContext(PlayersContext);
  return context;
}

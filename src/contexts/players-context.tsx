import type { Player } from "@/types/player";
import { createContext, useEffect, useState } from "react";

interface PlayersContextType {
  matchList: Player[];
  addOrRemoveFromMatchList: (player: Player) => void;
  isPlayerInMatchList: (player: Player) => boolean;
  clearMatchList: () => void;
}

interface PlayersProviderProps {
  children: React.ReactNode;
}

export const PlayersContext = createContext({} as PlayersContextType);

export function PlayersProvider({ children }: PlayersProviderProps) {
  const [matchList, setMatchList] = useState<Player[]>(() => {
    const stored = localStorage.getItem("matchList");
    return stored ? JSON.parse(stored) : [];
  });

  function addOrRemoveFromMatchList(player: Player) {
    setMatchList((prev) => {
      const index = prev.findIndex((p) => p.id === player.id);
      if (index === -1) {
        return [...prev, player];
      } else {
        return prev.filter((p) => p.id !== player.id);
      }
    });
  }

  function clearMatchList() {
    setMatchList([]);
    localStorage.removeItem("matchList");
  }

  const isPlayerInMatchList = (player: Player) => {
    return matchList.some((p) => p.id === player.id);
  };

  useEffect(() => {
    localStorage.setItem("matchList", JSON.stringify(matchList));
  }, [matchList]);

  return (
    <PlayersContext.Provider
      value={{
        matchList,
        addOrRemoveFromMatchList,
        isPlayerInMatchList,
        clearMatchList,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

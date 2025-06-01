import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { OctagonX } from "lucide-react";
import { playersMock } from "@/mocks/players";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface AverageModalProps {
  type: "above-average" | "below-average";
}

const getFilteredPlayers = (type: AverageModalProps["type"]) => {
  const filterFn =
    type === "above-average"
      ? (player: { score: number }) => player.score >= 3
      : (player: { score: number }) => player.score < 3;

  const sortFn =
    type === "above-average"
      ? (a: { score: number }, b: { score: number }) => b.score - a.score
      : (a: { score: number }, b: { score: number }) => b.score - a.score;

  return playersMock.filter(filterFn).sort(sortFn);
};

const getTitleAndDescription = (type: AverageModalProps["type"]) => {
  if (type === "above-average") {
    return {
      title: "Lista de jogadores",
      description: "Jogadores na média ou acima.",
    };
  }
  return {
    title: "Lista de jogadores",
    description: "Jogadores abaixo da média.",
  };
};

const AverageModal: React.FC<AverageModalProps> = ({ type }) => {
  const playerList = getFilteredPlayers(type);
  const { title, description } = getTitleAndDescription(type);

  return (
    <DialogContent className="h-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="!-mt-8 w-full">
        {playerList.length ? (
          <ScrollArea className="flex h-[250px] w-full rounded-md border p-4 sm:h-[300px]">
            {playerList.map((player, idx) => (
              <div key={player.name} className="mb-2 flex w-full gap-2 text-sm">
                <span className="text-center">
                  {idx + 1}º - {player.name}
                </span>
                |
                <span
                  className={cn("max-w-[120px] truncate", {
                    "text-green-400": player.score >= 3,
                    "text-red-400": player.score < 3,
                  })}
                >
                  {player.score}
                </span>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="flex h-[350px] w-full flex-col items-center justify-center space-y-2 text-gray-500">
            <OctagonX className="h-8 w-8" />
            <span>Nenhum jogador na lista.</span>
          </div>
        )}
        <DialogFooter className="mt-5 flex w-full items-center gap-4 sm:gap-1">
          <DialogClose asChild>
            <Button variant="default" type="button" className="text-white">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default AverageModal;

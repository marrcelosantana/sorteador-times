import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { OctagonX } from "lucide-react";
import { getAllPlayers } from "@/mocks/players";

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
  const allPlayers = getAllPlayers();
  const filterFn =
    type === "above-average"
      ? (player: { score: number }) => player.score >= 3
      : (player: { score: number }) => player.score < 3;

  const sortFn = (a: { score: number }, b: { score: number }) =>
    b.score - a.score;

  return allPlayers.filter(filterFn).sort(sortFn);
};

const getTitleAndDescription = (type: AverageModalProps["type"]) => {
  if (type === "above-average") {
    return {
      title: "Na média ou acima",
      description: "Jogadores com nota 3 ou superior.",
    };
  }
  return {
    title: "Abaixo da média",
    description: "Jogadores com nota inferior a 3.",
  };
};

const AverageModal: React.FC<AverageModalProps> = ({ type }) => {
  const playerList = getFilteredPlayers(type);
  const { title, description } = getTitleAndDescription(type);

  return (
    <DialogContent className="flex h-[min(600px,85vh)] flex-col gap-0 p-0">
      <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
        <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        <DialogDescription>
          {description}{" "}
          <span className="font-semibold text-foreground">
            {playerList.length} jogadores
          </span>
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-0 flex-1 px-6">
        {playerList.length ? (
          <ScrollArea className="h-full rounded-lg border">
            <div className="space-y-0.5 p-2">
              {playerList.map((player, idx) => (
                <div
                  key={player.name}
                  className="flex items-center justify-between rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-7 text-center text-xs text-muted-foreground">
                      {idx + 1}º
                    </span>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-sm py-1 px-2 text-xs font-semibold flex items-center justify-center",
                      player.score >= 3
                        ? "bg-emerald/10 text-emerald"
                        : "bg-coral/10 text-coral",
                    )}
                  >
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <OctagonX className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhum jogador nesta categoria.
            </p>
          </div>
        )}
      </div>

      <DialogFooter className="shrink-0 px-6 py-4">
        <DialogClose asChild>
          <Button type="button" className="text-white">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default AverageModal;

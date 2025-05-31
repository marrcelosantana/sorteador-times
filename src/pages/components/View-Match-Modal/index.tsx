import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePlayers } from "@/hooks/usePlayers";
import { BrushCleaning, Trash } from "lucide-react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ViewMatchModal: React.FC = () => {
  const { matchList, addOrRemoveFromMatchList, clearMatchList } = usePlayers();

  const matchAverage =
    matchList.reduce((acc, player) => acc + player.score, 0) /
      matchList.length || 0;

  return (
    <DialogContent className="h-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Lista do Racha</DialogTitle>
        <DialogDescription>
          Esses são os jogadores que estão na lista do Racha.
        </DialogDescription>
        {matchList.length > 0 && (
          <div className="mb-4">
            <span className="text-muted-foreground text-sm">
              Média dos jogadores: {matchAverage.toFixed(2)}
            </span>
          </div>
        )}
      </DialogHeader>
      <div className="!-mt-[32px] w-full">
        {matchList.length ? (
          <ScrollArea className="flex h-[250px] w-full rounded-md border p-4">
            {matchList.map((player, idx) => (
              <div key={idx} className="mb-2 flex w-full gap-2 text-sm">
                <div className="flex w-full gap-2">
                  <span className="text-center">
                    {idx + 1}. {player.name}
                  </span>{" "}
                  -
                  <span
                    className={cn("max-w-[120px] truncate", {
                      "text-green-400": player.score >= 3,
                      "text-red-400": player.score < 3,
                    })}
                  >
                    {player.score}
                  </span>
                </div>
                <button
                  className="cursor-pointer text-red-400 hover:text-red-500"
                  onClick={() => addOrRemoveFromMatchList(player)}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="flex h-[350px] w-full items-center justify-center">
            <span className="text-gray-500">
              Nenhum jogador na lista do Racha.
            </span>
          </div>
        )}
        <DialogFooter
          className={cn("mt-5 flex w-full items-center gap-4 sm:gap-1", {
            "!justify-between": matchList.length > 0,
          })}
        >
          {matchList.length > 0 && (
            <Button variant="outline" type="button" onClick={clearMatchList}>
              <BrushCleaning />
              Limpar lista
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="default" type="button">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default ViewMatchModal;

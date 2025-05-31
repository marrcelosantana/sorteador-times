import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePlayers } from "@/hooks/usePlayers";
import { BrushCleaning, OctagonX, Trash2 } from "lucide-react";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ViewMatchListModal: React.FC = () => {
  const { matchList, addOrRemoveFromMatchList, clearMatchList } = usePlayers();

  return (
    <DialogContent className="h-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Lista do racha</DialogTitle>
        <DialogDescription>
          Esses são os jogadores que estão na lista do racha.
        </DialogDescription>
      </DialogHeader>
      <div className="!-mt-[32px] w-full">
        {matchList.length ? (
          <ScrollArea className="flex h-[250px] w-full rounded-md border p-4 sm:h-[300px]">
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
                  aria-label="Remover jogador"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="flex h-[350px] w-full flex-col items-center justify-center space-y-2 text-gray-500">
            <OctagonX className="h-8 w-8" />
            <span>Nenhum jogador na lista do racha.</span>
          </div>
        )}
        <DialogFooter
          className={
            "mt-5 flex w-full items-center !justify-start gap-4 sm:gap-1"
          }
        >
          {matchList.length > 0 && (
            <Button variant="outline" type="button" onClick={clearMatchList}>
              <BrushCleaning />
              Limpar lista
            </Button>
          )}
          {/* <DialogClose asChild>
            <Button variant="default" type="button" className="text-white">
              Fechar
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default ViewMatchListModal;

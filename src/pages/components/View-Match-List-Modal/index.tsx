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

  const matchListAverage =
    matchList.reduce((acc, player) => acc + player.score, 0) /
    (matchList.length || 1);

  return (
    <DialogContent className="flex h-[min(600px,85vh)] flex-col gap-0 p-0">
      <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
        <DialogTitle className="text-xl font-bold">Lista do racha</DialogTitle>
        <DialogDescription>
          {matchList.length} jogadores selecionados — Média:{" "}
          <span className="text-foreground font-semibold">
            {matchListAverage.toFixed(2)}
          </span>
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-0 flex-1 px-6">
        {matchList.length ? (
          <ScrollArea className="h-full rounded-lg border">
            <div className="space-y-0.5 p-2">
              {matchList.map((player, idx) => (
                <div
                  key={idx}
                  className="hover:bg-muted/50 flex items-center justify-between rounded-md px-2 py-2 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-6 text-center text-xs">
                      {idx + 1}.
                    </span>
                    <span className="font-medium">{player.name}</span>
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-sm px-2 py-1 text-xs font-semibold",
                        player.score >= 3
                          ? "bg-emerald/10 text-emerald"
                          : "bg-coral/10 text-coral",
                      )}
                    >
                      {player.score}
                    </span>
                  </div>
                  <button
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-md p-1.5 transition-colors"
                    onClick={() => addOrRemoveFromMatchList(player)}
                    aria-label="Remover jogador"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-12">
            <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-2xl">
              <OctagonX className="text-muted-foreground h-7 w-7" />
            </div>
            <p className="text-muted-foreground text-sm">
              Nenhum jogador na lista do racha.
            </p>
          </div>
        )}
      </div>

      {matchList.length > 0 && (
        <DialogFooter className="shrink-0 px-6 py-4">
          <Button
            variant="destructive"
            type="button"
            onClick={clearMatchList}
            className="gap-1.5"
          >
            <BrushCleaning className="h-4 w-4" />
            Limpar lista
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  );
};

export default ViewMatchListModal;

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayers } from "@/hooks/usePlayers";
import { ChevronDown, ChevronRight, History, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DrawHistoryModal: React.FC = () => {
  const { drawHistory, clearHistory } = usePlayers();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }

  function handleClearHistory() {
    if (confirm("Deseja realmente limpar todo o histórico de sorteios?")) {
      clearHistory();
      toast.success("Histórico limpo com sucesso!");
    }
  }

  return (
    <DialogContent className="flex h-[min(600px,85vh)] flex-col gap-0 p-0">
      <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <History className="h-4 w-4 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold">
            Histórico de sorteios
          </DialogTitle>
        </div>
        <DialogDescription>
          {drawHistory.length > 0
            ? `${drawHistory.length} sorteios realizados.`
            : "Nenhum sorteio realizado ainda."}
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-0 flex-1 px-6">
        {drawHistory.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <History className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhum sorteio salvo ainda.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="space-y-2 pb-2 pr-3">
              {drawHistory.map((draw) => {
                const isExpanded = expandedId === draw.id;
                return (
                  <div key={draw.id} className="rounded-lg border transition-colors">
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : draw.id)
                      }
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted/50"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span>{formatDate(draw.date)}</span>
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {draw.teams.length} times
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="border-t px-3 py-2.5">
                        <div className="grid gap-2 sm:grid-cols-2">
                          {draw.teams.map((team, idx) => (
                            <div key={idx} className="rounded-md bg-muted/30 p-2">
                              <p className="mb-1 text-xs font-semibold text-primary">
                                Time {idx + 1}{" "}
                                <span className="font-normal text-muted-foreground">
                                  — Média: {team.average}
                                </span>
                              </p>
                              <div className="space-y-0.5">
                                {team.players.map((player, playerIdx) => (
                                  <p
                                    key={playerIdx}
                                    className="text-xs text-muted-foreground"
                                  >
                                    {player.name}{" "}
                                    <span className="opacity-60">
                                      ({player.position || "N/A"}) —{" "}
                                      {player.score}
                                    </span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      {drawHistory.length > 0 && (
        <DialogFooter className="shrink-0 px-6 py-4">
          <Button
            variant="destructive"
            type="button"
            onClick={handleClearHistory}
            className="gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            Limpar histórico
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  );
};

export default DrawHistoryModal;

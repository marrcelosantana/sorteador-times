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
import { Trash2 } from "lucide-react";
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
    <DialogContent className="flex h-125 flex-col justify-between">
      <DialogHeader>
        <DialogTitle className="text-2xl">Histórico de sorteios</DialogTitle>
        <DialogDescription>
          Visualize todos os sorteios realizados.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-75 w-full border">
        {drawHistory.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted-foreground">
              Nenhum sorteio salvo ainda.
            </span>
          </div>
        ) : (
          <div className="mt-2 space-y-4 px-4 py-2">
            {drawHistory.map((draw) => (
              <div key={draw.id} className="border-b pb-4">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === draw.id ? null : draw.id)
                  }
                  className="hover:text-primary w-full text-left text-sm font-semibold transition-colors"
                >
                  📅 {formatDate(draw.date)}
                </button>

                {expandedId === draw.id && (
                  <div className="mt-3 space-y-3">
                    {draw.teams.map((team, idx) => (
                      <div key={idx} className="ml-4">
                        <p className="text-xs font-medium">
                          Time {idx + 1} - Média: {team.average}
                        </p>
                        <ul className="mt-1 list-disc pl-5">
                          {team.players.map((player, playerIdx) => (
                            <li
                              key={playerIdx}
                              className="text-muted-foreground text-xs"
                            >
                              [{player.position || "N/A"}] - {player.name} -{" "}
                              {player.score}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <DialogFooter className="mt-5">
        <Button
          variant="destructive"
          type="button"
          onClick={handleClearHistory}
          disabled={drawHistory.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          Limpar histórico
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DrawHistoryModal;

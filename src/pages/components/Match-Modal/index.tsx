import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TeamResult } from "@/types/player";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, CopyCheck, MessageCircle, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { formatDrawMessage, getWhatsAppShareUrl } from "@/utils/share";

interface MatchModalProps {
  teams: TeamResult[];
  drawDate?: string;
}

const teamColors = [
  "border-primary/30 bg-primary/5 dark:bg-primary/10",
  "border-emerald/30 bg-emerald/5 dark:bg-emerald/10",
  "border-amber/30 bg-amber/5 dark:bg-amber/10",
  "border-coral/30 bg-coral/5 dark:bg-coral/10",
  "border-chart-1/30 bg-chart-1/5 dark:bg-chart-1/10",
  "border-chart-2/30 bg-chart-2/5 dark:bg-chart-2/10",
];

const teamAccentColors = [
  "text-primary",
  "text-emerald",
  "text-amber",
  "text-coral",
  "text-chart-1",
  "text-chart-2",
];

const MatchModal: React.FC<MatchModalProps> = ({ teams, drawDate }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const shareMessage = formatDrawMessage({ teams, date: drawDate });

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setIsCopied(true);
      toast.success("Lista copiada para a área de transferência!");
      setTimeout(() => setIsCopied(false), 5000);
    } catch {
      toast.error("Não foi possível copiar a lista.");
    }
  }

  function shareOnWhatsApp() {
    window.open(getWhatsAppShareUrl(shareMessage), "_blank", "noreferrer");
  }

  return (
    <DialogContent className="flex h-[min(600px,85vh)] flex-col gap-0 p-0">
      <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold">Racha formado!</DialogTitle>
        </div>
        <DialogDescription>
          Times sorteados para o racha. {teams.length} times criados.
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-0 flex-1 px-6">
        <ScrollArea className="h-full">
          <div className="grid gap-3 pb-2 pr-3 sm:grid-cols-2">
            {teams.map((team, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg border p-3",
                  teamColors[idx % teamColors.length],
                )}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3
                    className={cn(
                      "text-sm font-bold",
                      teamAccentColors[idx % teamAccentColors.length],
                    )}
                  >
                    Time {idx + 1}
                  </h3>
                  <span className="rounded-sm bg-background/80 py-1 px-2 flex items-center justify-center text-xs font-medium">
                    Média: {team.average}
                  </span>
                </div>
                <div className="space-y-1">
                  {team.players.map((player, playerIdx) => (
                    <div
                      key={playerIdx}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="font-medium">{player.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {player.position}
                        </span>
                        <span className="font-semibold">{player.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <DialogFooter className="shrink-0 flex-row gap-2 px-6 py-4 sm:justify-end">
        <Button
          variant="outline"
          type="button"
          className="flex-1 gap-1.5 sm:flex-none"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <CopyCheck className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Copiar
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex-1 gap-1.5 sm:flex-none"
          onClick={shareOnWhatsApp}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MatchModal;

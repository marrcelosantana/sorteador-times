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
import { Copy, CopyCheck, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { formatDrawMessage, getWhatsAppShareUrl } from "@/utils/share";

interface MatchModalProps {
  teams: TeamResult[];
  drawDate?: string;
}

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
    <DialogContent className="flex h-125 flex-col justify-between">
      <DialogHeader>
        <DialogTitle className="text-2xl">Racha formado!</DialogTitle>
        <DialogDescription>
          Esses são os times sorteados para o racha.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-75 w-full border">
        {teams.map((team, idx) => {
          return (
            <div
              key={idx}
              className="mt-2 mb-2 flex w-full flex-col gap-2 px-4"
            >
              <h3 className="text-sm font-semibold">
                Time {idx + 1} - Média: {team.average}
              </h3>
              <ul className="list-disc pl-5">
                {team.players.map((player, playerIdx) => (
                  <li key={playerIdx} className="text-muted-foreground text-xs">
                    [ {player.position} ] - {player.name} - {player.score}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </ScrollArea>

      <DialogFooter
        className={cn(
          "mt-5 grid w-full grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end",
        )}
      >
        <Button
          variant="outline"
          type="button"
          className="px-2 text-xs sm:px-4 sm:text-sm"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <CopyCheck className="h-4 w-4"></CopyCheck>
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Copiar
        </Button>
        <Button
          variant="outline"
          type="button"
          className="px-2 text-xs sm:px-4 sm:text-sm"
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

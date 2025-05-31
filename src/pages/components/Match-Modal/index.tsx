import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TeamResult } from "@/utils/functions";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface MatchModalProps {
  teams: TeamResult[];
}

const MatchModal: React.FC<MatchModalProps> = ({ teams }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function copyToClipboard() {
    const text = teams
      .map(
        (team, idx) =>
          `Time ${idx + 1} - Média: ${team.average}\n` +
          team.players.map((p) => `- ${p.name} | ${p.score}`).join("\n"),
      )
      .join("\n\n");

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Lista copiada para a área de transferência!");
    setTimeout(() => setIsCopied(false), 5000);
  }

  return (
    <DialogContent className="flex h-[500px] flex-col justify-between">
      <DialogHeader>
        <DialogTitle className="text-2xl">Racha formado!</DialogTitle>
        <DialogDescription>
          Esses são os times sorteados para o racha.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[300px] w-full border-1">
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
          "mt-5 flex w-full items-center !justify-between gap-4 sm:gap-1",
        )}
      >
        <Button variant="outline" type="button" onClick={copyToClipboard}>
          {isCopied ? (
            <CopyCheck className="mr-2 h-4 w-4"></CopyCheck>
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          Copiar lista
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MatchModal;

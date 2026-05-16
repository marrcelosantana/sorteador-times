import type { Player } from "@/types/player";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { usePlayers } from "@/hooks/usePlayers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayersTableProps {
  data: Player[];
}

const avatarColors = [
  "bg-primary/15 text-primary",
  "bg-emerald/15 text-emerald",
  "bg-coral/15 text-coral",
  "bg-amber/15 text-amber",
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(name: string) {
  // Remove anything inside parentheses before processing
  const cleanName = name.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const positionConfig: Record<string, { label: string; className: string }> = {
  ATA: { label: "ATA", className: "bg-coral/10 text-coral border-coral/20" },
  MEI: { label: "MEI", className: "bg-amber/10 text-amber border-amber/20" },
  DEF: {
    label: "DEF",
    className: "bg-primary/10 text-primary border-primary/20",
  },
};

const PlayersTable: React.FC<PlayersTableProps> = ({ data }) => {
  const { addOrRemoveFromMatchList, isPlayerInMatchList } = usePlayers();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead />
          <TableHead className="text-muted-foreground w-[40%] text-xs font-semibold tracking-wider uppercase">
            Nome
          </TableHead>
          <TableHead className="text-muted-foreground w-[20%] text-xs font-semibold tracking-wider uppercase">
            Nota
          </TableHead>
          <TableHead className="text-muted-foreground w-[20%] text-xs font-semibold tracking-wider uppercase">
            Posição
          </TableHead>
          <TableHead className="text-muted-foreground w-[20%] text-xs font-semibold tracking-wider uppercase">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((player: Player) => {
          const inMatch = isPlayerInMatchList(player);
          return (
            <TableRow
              key={player.id}
              className={cn(
                "transition-colors",
                inMatch && "bg-primary/5 dark:bg-primary/10",
              )}
            >
              <TableCell />
              <TableCell className="font-medium">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      getAvatarColor(player.name),
                    )}
                  >
                    {getInitials(player.name)}
                  </div>
                  <span className="truncate">{player.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm px-2 py-1 text-xs font-semibold",
                    player.score >= 3
                      ? "bg-emerald/10 text-emerald"
                      : "bg-coral/10 text-coral",
                  )}
                >
                  {player.score}
                </span>
              </TableCell>
              <TableCell>
                {player.position && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                      positionConfig[player.position]?.className,
                    )}
                  >
                    {player.position}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOrRemoveFromMatchList(player)}
                  className={cn(
                    "justify-center gap-1.5 transition-all",
                    inMatch
                      ? "border-primary/30 bg-primary/10 text-primary hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive dark:bg-primary/20"
                      : "",
                  )}
                >
                  {inMatch ? (
                    <>
                      <UserMinus className="h-3.5 w-3.5" />
                      <span>Remover do racha</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Adicionar ao racha</span>
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;

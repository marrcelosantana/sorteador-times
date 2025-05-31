import type { Player } from "@/types/player";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
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

const PlayersTable: React.FC<PlayersTableProps> = ({ data }) => {
  const { addOrRemoveFromMatchList, isPlayerInMatchList } = usePlayers();

  return (
    <Table className="w-full border-y-2 border-r-2">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Nota</TableHead>
          <TableHead>Posição</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((player: Player) => (
          <TableRow key={player.id}>
            <TableCell></TableCell>
            <TableCell className="!w-[70vw] truncate font-medium">
              {player.name}
            </TableCell>
            <TableCell
              className={cn("max-w-[120px] truncate font-medium", {
                "text-green-400": player.score >= 3,
                "text-red-400": player.score < 3,
              })}
            >
              {player.score}
            </TableCell>
            <TableCell className="max-w-[120px] truncate font-mono text-xs font-medium">
              {player.position}
            </TableCell>
            <TableCell className="max-w-[120px]">
              <Button
                variant="outline"
                onClick={() => addOrRemoveFromMatchList(player)}
                className={cn("flex items-center gap-2", {
                  "text-red-400 hover:text-red-500":
                    isPlayerInMatchList(player),
                })}
              >
                {isPlayerInMatchList(player) ? (
                  <>
                    <span className="hidden sm:inline">Remover do Racha</span>
                    <MinusCircle className="h-4 w-4 md:ml-1" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Adicionar ao Racha</span>
                    <PlusCircle className="h-4 w-4" />
                  </>
                )}
              </Button>
            </TableCell>
            <TableCell className="w-0"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;

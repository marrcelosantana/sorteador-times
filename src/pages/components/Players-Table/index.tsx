import React from "react";
import type { Player } from "@/types/player";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <Table className="w-full border-y-2 border-r-2">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Posição</TableHead>
          <TableHead>Nota</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((player: Player) => (
          <TableRow key={player.id}>
            <TableCell></TableCell>
            <TableCell className="max-w-[220px] truncate font-medium">
              {player.name}
            </TableCell>
            <TableCell className="max-w-[120px] truncate font-mono text-xs font-medium">
              {player.position}
            </TableCell>
            <TableCell
              className={cn("max-w-[120px] truncate font-medium", {
                "text-green-400": player.score >= 3,
                "text-red-400": player.score < 3,
              })}
            >
              {player.score}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="max-w-[120px]">
              <Button variant="secondary">
                Adicionar à lista
                <PlusCircle />
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

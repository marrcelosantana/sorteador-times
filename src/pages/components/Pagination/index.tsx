import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}) => {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between px-4 md:px-8">
      <div className="text-muted-foreground space-x-1 text-sm whitespace-nowrap">
        <span className="hidden md:inline">Total de</span>
        <span>{totalCount}</span>
        <span>
          {totalCount > 0 && totalCount < 2 ? "jogador" : "jogadores"}
        </span>
      </div>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Pag {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

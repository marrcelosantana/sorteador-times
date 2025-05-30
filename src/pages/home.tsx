import type { Player } from "@/types/player";

import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getPlayersPage, playersMock } from "@/mocks/players";
import { Header, InfoCard, Pagination, PlayersTable } from "./components";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [search, setSearch] = useState("");

  const aboveAverage = playersMock.filter((player) => player.score >= 3).length;
  const belowAverage = playersMock.filter((player) => player.score < 3).length;
  const matchList = ["1", "2"];

  const players: Player[] = getPlayersPage(page, limit, search);

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="mb-1 flex w-full flex-col items-center justify-between px-8 py-4 lg:flex-row">
          <h1 className="mb-4 text-3xl font-bold tracking-tight lg:mb-0">
            Jogadores
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
              <InfoCard type="total" data={playersMock.length} />
              <InfoCard type="above-average" data={aboveAverage} />
              <InfoCard type="below-average" data={belowAverage} />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-4 pr-8 pl-4">
          <Input
            className="w-[250px]"
            placeholder="Pesquisar nome do jogador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="outline">
            <List />
            Visualizar lista do Racha
            {matchList.length > 0 && (
              <span className="flex items-center justify-center rounded-xl bg-[#8e54ff] px-2 text-white">
                {matchList.length}
              </span>
            )}
          </Button>
        </div>
        {players.length > 0 ? (
          <div className="mt-4">
            <PlayersTable data={players} />
            <div className="mt-4">
              {!search.length && (
                <Pagination
                  pageIndex={page - 1}
                  perPage={limit}
                  totalCount={playersMock?.length}
                  onPageChange={(newPageIndex: number) =>
                    setPage(newPageIndex + 1)
                  }
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <span className="text-muted-foreground">
              Sem jogadores por aqui.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

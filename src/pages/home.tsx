import type { Player } from "@/types/player";

import { List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getPlayersPage, getAllPlayers } from "@/mocks/players";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { usePlayers } from "@/hooks/usePlayers";

import {
  AverageModal,
  Header,
  InfoCard,
  NewPlayerModal,
  Pagination,
  PlayersTable,
  ViewMatchListModal,
} from "./components";

const Home: React.FC = () => {
  const { matchList } = usePlayers();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [search, setSearch] = useState("");

  const [viewMatchModalOpen, setViewMatchModalOpen] = useState(false);
  const [aboveModalOpen, setAboveModalOpen] = useState(false);
  const [belowModalOpen, setAverageModalOpen] = useState(false);
  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);

  const allPlayers = getAllPlayers();
  const aboveAverage = allPlayers.filter((player) => player.score >= 3).length;
  const belowAverage = allPlayers.filter((player) => player.score < 3).length;

  const players: Player[] = getPlayersPage(page, limit, search);

  useEffect(() => {
    setPage(1);
    if (search.length > 0) {
      setLimit(100);
    } else {
      setLimit(7);
    }
  }, [search]);

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="mb-1 flex w-full flex-col items-start justify-end px-8 py-4 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row">
              <InfoCard type="total" data={allPlayers.length} />
              <Dialog open={aboveModalOpen} onOpenChange={setAboveModalOpen}>
                <DialogTrigger asChild>
                  <span className="w-full cursor-pointer">
                    <InfoCard type="above-average" data={aboveAverage} />
                  </span>
                </DialogTrigger>
                <AverageModal type="above-average" />
              </Dialog>

              <Dialog open={belowModalOpen} onOpenChange={setAverageModalOpen}>
                <DialogTrigger asChild>
                  <span className="w-full cursor-pointer">
                    <InfoCard type="below-average" data={belowAverage} />
                  </span>
                </DialogTrigger>
                <AverageModal type="below-average" />
              </Dialog>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 px-8 sm:flex-nowrap sm:justify-between sm:gap-4">
          <div className="w-[calc(50%-0.25rem)] sm:w-auto">
            <Dialog
              open={newPlayerModalOpen}
              onOpenChange={setNewPlayerModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-full min-w-0 px-2 text-xs whitespace-normal sm:w-auto sm:px-4 sm:text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar jogador
                </Button>
              </DialogTrigger>
              <NewPlayerModal
                isModalOpen={newPlayerModalOpen}
                setModalOpen={setNewPlayerModalOpen}
              />
            </Dialog>
          </div>

          <div className="w-[calc(50%-0.25rem)] sm:order-3 sm:w-auto">
            <Dialog
              open={viewMatchModalOpen}
              onOpenChange={setViewMatchModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full min-w-0 px-2 text-xs whitespace-normal sm:w-auto sm:px-4 sm:text-sm"
                >
                  <List />
                  Visualizar lista
                  {matchList.length > 0 && (
                    <span className="bg-primary dark:bg-primary-foreground flex items-center justify-center rounded-xl px-2 text-white">
                      {matchList.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <ViewMatchListModal />
            </Dialog>
          </div>

          <Input
            className="order-3 w-full sm:order-2 sm:ml-auto sm:w-62.5"
            placeholder="Pesquisar nome do jogador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {players.length > 0 ? (
          <div className="mt-4">
            <PlayersTable data={players} />
            <div className="mt-4 pb-4">
              {!search.length && (
                <Pagination
                  pageIndex={page - 1}
                  perPage={limit}
                  totalCount={allPlayers.length}
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

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
        <div className="mb-1 flex w-full flex-col items-center justify-between px-8 py-4 lg:flex-row">
          <h1 className="mb-4 text-3xl font-bold tracking-tight lg:mb-0">
            Jogadores
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
              <InfoCard type="total" data={allPlayers.length} />
              <Dialog open={aboveModalOpen} onOpenChange={setAboveModalOpen}>
                <DialogTrigger asChild>
                  <span className="cursor-pointer">
                    <InfoCard type="above-average" data={aboveAverage} />
                  </span>
                </DialogTrigger>
                <AverageModal type="above-average" />
              </Dialog>

              <Dialog open={belowModalOpen} onOpenChange={setAverageModalOpen}>
                <DialogTrigger asChild>
                  <span className="cursor-pointer">
                    <InfoCard type="below-average" data={belowAverage} />
                  </span>
                </DialogTrigger>
                <AverageModal type="below-average" />
              </Dialog>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-start justify-between gap-4 pr-8 pl-4 sm:flex-row sm:items-center">
          <Dialog
            open={newPlayerModalOpen}
            onOpenChange={setNewPlayerModalOpen}
          >
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add jogador temporário
              </Button>
            </DialogTrigger>
            <NewPlayerModal
              isModalOpen={newPlayerModalOpen}
              setModalOpen={setNewPlayerModalOpen}
            />
          </Dialog>
          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Input
              className="w-full sm:w-[250px]"
              placeholder="Pesquisar nome do jogador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Dialog
              open={viewMatchModalOpen}
              onOpenChange={setViewMatchModalOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <List />
                  Visualizar lista do racha
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

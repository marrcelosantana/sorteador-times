import type { Player } from "@/types/player";

import { List, Plus, Search, Users } from "lucide-react";
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
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 flex-col">
        <div className="px-4 py-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

        <div className="flex flex-wrap items-center gap-3 border-b px-4 pb-4 sm:flex-nowrap sm:gap-3 sm:px-8">
          <div className="relative order-2 w-full sm:order-1 sm:w-auto">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              className="h-10 w-full pl-9 sm:w-96"
              placeholder="Pesquisar jogador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="order-1 ml-auto flex gap-2 sm:order-2">
            <Dialog
              open={newPlayerModalOpen}
              onOpenChange={setNewPlayerModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="gap-1.5 text-white shadow-sm" size="lg">
                  <Plus className="h-4 w-4" />
                  <span>Adicionar jogador</span>
                </Button>
              </DialogTrigger>
              <NewPlayerModal
                isModalOpen={newPlayerModalOpen}
                setModalOpen={setNewPlayerModalOpen}
              />
            </Dialog>

            <Dialog
              open={viewMatchModalOpen}
              onOpenChange={setViewMatchModalOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-1.5" size="lg">
                  <List className="h-4 w-4" />
                  <span>Ver lista</span>
                  {matchList.length > 0 && (
                    <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white">
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
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              <PlayersTable data={players} />
            </div>
            {!search.length && (
              <div className="border-t px-4 py-3 sm:px-8">
                <Pagination
                  pageIndex={page - 1}
                  perPage={limit}
                  totalCount={allPlayers.length}
                  onPageChange={(newPageIndex: number) =>
                    setPage(newPageIndex + 1)
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-2xl">
              <Users className="text-muted-foreground h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-medium">
                Nenhum jogador encontrado
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {search
                  ? "Tente outro termo de busca."
                  : "Adicione jogadores para começar."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CalendarPlus, History, Trophy } from "lucide-react";

import NewDrawModal from "../New-Draw-Modal";
import DrawHistoryModal from "../Draw-History-Modal";
import { usePlayers } from "@/hooks/usePlayers";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const { drawHistory } = usePlayers();

  return (
    <header className="from-primary/5 to-primary/5 dark:from-primary/10 dark:to-primary/10 border-b bg-gradient-to-r via-transparent dark:via-transparent">
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-xl">
            <Trophy className="text-primary h-5 w-5" />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-lg font-bold tracking-tight">
              Sorteador de Times
            </span>
            <span className="text-muted-foreground text-xs">
              Forme seu racha com times equilibrados
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="shadow-primary/25 hover:shadow-primary/30 gap-2 font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
              >
                <CalendarPlus className="h-4 w-4" />
                <span>Novo sorteio</span>
              </Button>
            </DialogTrigger>
            <NewDrawModal isModalOpen={modalOpen} setModalOpen={setModalOpen} />
          </Dialog>
          <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <History className="h-5! w-5!" />
                {drawHistory.length > 0 && (
                  <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    {drawHistory.length > 9 ? "9+" : drawHistory.length}
                  </span>
                )}
              </Button>
            </DialogTrigger>
            <DrawHistoryModal />
          </Dialog>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

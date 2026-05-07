import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CalendarPlus, History, Trophy } from "lucide-react";

import NewDrawModal from "../New-Draw-Modal";
import DrawHistoryModal from "../Draw-History-Modal";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  return (
    <header className="flex w-full items-center justify-between border-b px-8 py-5">
      <div className="flex items-center justify-center gap-4">
        <Trophy className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6!" />
        <span className="hidden text-xl sm:inline">Forme seu racha</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex h-12 items-center justify-center gap-2 text-white">
              <span>Novo sorteio</span>
              <CalendarPlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <NewDrawModal isModalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Dialog>
        <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-12 w-12">
              <History className="h-5! w-5!" />
            </Button>
          </DialogTrigger>
          <DrawHistoryModal />
        </Dialog>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

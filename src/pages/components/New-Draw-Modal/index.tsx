import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ViewMatchModal from "../View-Match-Modal";

type NewDrawModalProps = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const NewDrawModal: React.FC<NewDrawModalProps> = () => {
  const [viewMatchModalOpen, setViewMatchModalOpen] = useState(false);

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Novo sorteio</DialogTitle>
        <DialogDescription>
          Adicione os dados para sortear os times do Racha.
        </DialogDescription>
      </DialogHeader>
      <form className="w-full space-y-7" onSubmit={() => {}}>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-teams" className="text-sm">
            Quantidade de times
          </Label>
          <Input
            id="number-of-teams"
            type="number"
            placeholder="Clique para preencher..."
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-players" className="text-sm">
            Quantidade de jogadores por time
          </Label>
          <Input
            id="number-of-players"
            type="number"
            placeholder="Clique para preencher..."
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-teams" className="text-sm">
            Lista do Racha
          </Label>

          <Dialog
            open={viewMatchModalOpen}
            onOpenChange={setViewMatchModalOpen}
          >
            <DialogTrigger asChild>
              <Button variant="secondary" type="button">
                <span className="text-sm">Confirme a lista do Racha</span>
              </Button>
            </DialogTrigger>
            <ViewMatchModal />
          </Dialog>
        </div>
        <DialogFooter className="mt-3 gap-4 sm:gap-1">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" type="submit" className="ml-2 text-white">
            Sortear
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default NewDrawModal;

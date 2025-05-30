import { Button } from "@/components/ui/button";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NewDrawModalProps = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const NewDrawModal: React.FC<NewDrawModalProps> = () => {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Novo sorteio</DialogTitle>
        <DialogDescription>
          Adicione os dados para sortear os times do Racha.
        </DialogDescription>
      </DialogHeader>
      <form className="w-full space-y-7" onSubmit={() => {}}>
        <div>Hello World</div>
        <DialogFooter className="mt-3 gap-4 sm:gap-1">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" type="submit" className="text-white">
            Formar racha
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default NewDrawModal;

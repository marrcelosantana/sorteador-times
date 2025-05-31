import { useForm } from "react-hook-form";
import { usePlayers } from "@/hooks/usePlayers";
import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkRules,
  sortBalancedTeams,
  type TeamResult,
} from "@/utils/functions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

import ViewMatchListModal from "../View-Match-List-Modal";
import MatchModal from "../Match-Modal";

type NewDrawModalProps = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const schema = z.object({
  numberOfTeams: z.string().min(1, "Campo obrigatório."),
  numberOfPlayers: z.string().min(1, "Campo obrigatório."),
});

type FormDataType = z.infer<typeof schema>;

const NewDrawModal: React.FC<NewDrawModalProps> = ({ isModalOpen }) => {
  const { matchList } = usePlayers();

  const [viewMatchModalOpen, setViewMatchModalOpen] = useState(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<TeamResult[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const values = watch();

  function handleNewDraw(data: FormDataType) {
    setIsLoading(true);

    const payload = {
      numberOfTeams: Number(data.numberOfTeams),
      numberOfPlayers: Number(data.numberOfPlayers),
      matchList: matchList,
    };

    if (!checkRules(payload)) {
      setIsLoading(false);
      return;
    }

    const teams = sortBalancedTeams(
      payload.matchList,
      payload.numberOfTeams,
      payload.numberOfPlayers,
    );

    setTeams(teams);

    setTimeout(() => {
      toast.success("Sorteio realizado com sucesso!");
      setMatchModalOpen(true);
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    reset();
    setIsLoading(false);
  }, [isModalOpen]);

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Novo sorteio</DialogTitle>
        <DialogDescription>
          Adicione os dados para sortear os times do Racha.
        </DialogDescription>
      </DialogHeader>
      <form className="w-full space-y-7" onSubmit={handleSubmit(handleNewDraw)}>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-teams" className="text-sm">
            Quantidade de times
          </Label>
          <Input
            id="number-of-teams"
            type="number"
            placeholder="Clique para preencher..."
            {...register("numberOfTeams")}
            value={values.numberOfTeams}
          />
          <span className="text-xs text-red-500">
            {errors.numberOfTeams?.message}
          </span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-players" className="text-sm">
            Quantidade de jogadores por time
          </Label>
          <Input
            id="number-of-players"
            type="number"
            placeholder="Clique para preencher..."
            {...register("numberOfPlayers")}
            value={values.numberOfPlayers}
          />
          <span className="text-xs text-red-500">
            {errors.numberOfPlayers?.message}
          </span>
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
                <span className="text-sm">Confira a lista do Racha</span>
              </Button>
            </DialogTrigger>
            <ViewMatchListModal />
          </Dialog>
        </div>
        <DialogFooter className="mt-3 gap-4 sm:gap-1">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="default"
            type="submit"
            className="ml-2 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sorteando..." : "Sortear times"}
          </Button>
        </DialogFooter>
      </form>

      <Dialog open={matchModalOpen} onOpenChange={setMatchModalOpen}>
        <MatchModal teams={teams} />
      </Dialog>
    </DialogContent>
  );
};

export default NewDrawModal;

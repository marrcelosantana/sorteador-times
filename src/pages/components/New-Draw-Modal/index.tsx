import { useForm } from "react-hook-form";
import { usePlayers } from "@/hooks/usePlayers";
import { useEffect, useState } from "react";

import { z } from "zod";
import { LoaderIcon, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkRules, sortBalancedTeams } from "@/utils/functions";
import type { TeamResult } from "@/types/player";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

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
  numberOfTeams: z.number().min(1, "Campo obrigatório."),
  numberOfPlayers: z.number().min(1, "Campo obrigatório."),
});

type FormDataType = z.infer<typeof schema>;

const DRAW_PRESETS = [
  { label: "3 times de 5 jogadores", numberOfTeams: 3, numberOfPlayers: 5 },
  { label: "4 times de 5 jogadores", numberOfTeams: 4, numberOfPlayers: 5 },
] as const;

function Loader() {
  return <LoaderIcon className="h-4 w-4 animate-spin" />;
}

const NewDrawModal: React.FC<NewDrawModalProps> = ({ isModalOpen }) => {
  const { matchList, saveDrawToHistory } = usePlayers();

  const [viewMatchModalOpen, setViewMatchModalOpen] = useState(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<TeamResult[]>([]);
  const [drawDate, setDrawDate] = useState<string>();

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const values = watch();

  function handleSelectPreset(preset: (typeof DRAW_PRESETS)[number]) {
    setValue("numberOfTeams", preset.numberOfTeams, {
      shouldValidate: true,
    });
    setValue("numberOfPlayers", preset.numberOfPlayers, {
      shouldValidate: true,
    });
  }

  function handleNewDraw(data: FormDataType) {
    setIsLoading(true);

    const payload = {
      numberOfTeams: data.numberOfTeams,
      numberOfPlayers: data.numberOfPlayers,
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

    const currentDrawDate = new Date().toISOString();

    setTeams(teams);
    setDrawDate(currentDrawDate);
    saveDrawToHistory(teams, currentDrawDate);

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
        <div className="flex w-full flex-col gap-3">
          <Label className="text-sm">Presets de partida</Label>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {DRAW_PRESETS.map((preset) => {
              const isSelected =
                values.numberOfTeams === preset.numberOfTeams &&
                values.numberOfPlayers === preset.numberOfPlayers;

              return (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto justify-start px-3 py-2 text-left whitespace-normal",
                    isSelected &&
                      "border-primary bg-primary/10 text-primary hover:bg-primary/15",
                  )}
                  onClick={() => handleSelectPreset(preset)}
                >
                  {preset.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="number-of-teams" className="text-sm">
            Quantidade de times
          </Label>
          <Input
            id="number-of-teams"
            type="number"
            placeholder="Clique para preencher..."
            onChange={(e) => {
              setValue("numberOfTeams", Number(e.target.value));
            }}
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
            onChange={(e) => {
              setValue("numberOfPlayers", Number(e.target.value));
            }}
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
              <Button variant="secondary" type="button" className="w-[220px]">
                <Search className="h-4 w-4" />
                <span className="text-sm">Confira a lista do Racha</span>
              </Button>
            </DialogTrigger>
            <ViewMatchListModal />
          </Dialog>
        </div>
        <DialogFooter className="mt-3 gap-4 sm:flex sm:items-center sm:gap-1">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="default"
            type="submit"
            className="text-white md:ml-2"
            disabled={isLoading}
          >
            <>
              Sortear times
              {isLoading && <Loader />}
            </>
          </Button>
        </DialogFooter>
      </form>

      <Dialog open={matchModalOpen} onOpenChange={setMatchModalOpen}>
        <MatchModal teams={teams} drawDate={drawDate} />
      </Dialog>
    </DialogContent>
  );
};

export default NewDrawModal;

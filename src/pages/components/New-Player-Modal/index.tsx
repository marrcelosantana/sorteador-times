import type { Player } from "@/types/player";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { generateShortId } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, "Nome é obrigatório"),
  score: z
    .string({
      required_error: "Nota é obrigatória",
    })
    .min(1, "Nota é obrigatória")
    .refine((val) => !isNaN(Number(val)), {
      message: "Nota deve ser um número válido",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Nota deve ser maior ou igual a 0",
    })
    .refine((val) => Number(val) <= 5, {
      message: "Nota deve ser menor ou igual a 5",
    }),
  position: z.enum(["ATA", "MEI", "DEF"], {
    required_error: "Posição é obrigatória",
  }),
});

type FormDataType = z.infer<typeof schema>;

interface NewPlayerModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

const NewPlayerModal: React.FC<NewPlayerModalProps> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  function handleAddPlayer(data: FormDataType) {
    setIsLoading(true);

    const newPlayer: Player = {
      id: generateShortId(),
      name: data.name,
      score: Number(data.score),
      position: data.position,
    };

    const existingPlayers = JSON.parse(
      localStorage.getItem("tempPlayers") || "[]",
    );

    const updatedPlayers = [...existingPlayers, newPlayer];
    localStorage.setItem("tempPlayers", JSON.stringify(updatedPlayers));

    setTimeout(() => {
      toast.success("Jogador adicionado com sucesso!");
      setModalOpen(false);
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    reset();
    setIsLoading(false);
  }, [isModalOpen, reset]);

  return (
    <DialogContent className="w-[400px]">
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Adicionar jogador</DialogTitle>
        <DialogDescription>
          Adicione um novo jogador temporário à lista.
        </DialogDescription>
      </DialogHeader>
      <form
        className="w-full space-y-4"
        onSubmit={handleSubmit(handleAddPlayer)}
      >
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="player-name" className="text-sm">
            Nome do jogador
          </Label>
          <Input
            id="player-name"
            type="text"
            placeholder="Digite o nome do jogador..."
            onChange={(e) => {
              setValue("name", e.target.value);
            }}
            value={values.name || ""}
          />
          <span className="text-xs text-red-500">{errors.name?.message}</span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="player-score" className="text-sm">
            Nota do jogador
          </Label>
          <Input
            id="player-score"
            type="number"
            placeholder="Digite uma nota de 0 a 5"
            onChange={(e) => {
              setValue("score", e.target.value);
            }}
            value={values.score || ""}
          />
          <span className="text-xs text-red-500">{errors.score?.message}</span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="player-position" className="text-sm">
            Posição
          </Label>
          <Select
            value={values.position}
            onValueChange={(value) =>
              setValue("position", value as "ATA" | "MEI" | "DEF")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a posição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATA">Atacante (ATA)</SelectItem>
              <SelectItem value="MEI">Meio-Campo (MEI)</SelectItem>
              <SelectItem value="DEF">Defensor (DEF)</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-red-500">
            {errors.position?.message}
          </span>
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
              Adicionar jogador
              {isLoading && (
                <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default NewPlayerModal;

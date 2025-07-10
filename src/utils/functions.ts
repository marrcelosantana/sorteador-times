import type { PayloadType, Player } from "@/types/player";
import { toast } from "sonner";

function checkRules(payload: PayloadType): boolean {
  const { matchList, numberOfTeams, numberOfPlayers } = payload;

  if (matchList.length === 0) {
    toast.error("Cadastre jogadores para sortear.");
    return false;
  }

  if (numberOfTeams < 2) {
    toast.error("Mínimo de 2 times para sortear.");
    return false;
  }

  if (numberOfPlayers < numberOfTeams) {
    toast.error(
      "Número de times não pode ser maior que o número de jogadores.",
    );
    return false;
  }

  const totalRequiredPlayers = numberOfPlayers * numberOfTeams;

  if (totalRequiredPlayers > matchList.length) {
    toast.error("Limite de jogadores excedido.");
    return false;
  }

  if (totalRequiredPlayers < matchList.length) {
    toast.error("Sorteie com todos os jogadores.");
    return false;
  }

  return true;
}

export type TeamResult = {
  players: Player[];
  average: number;
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(
      (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * (i + 1),
    );
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sortear1(
  players: Player[],
  numberOfTeams: number,
  numberOfPlayers: number,
): { difference: number; teams: Player[][] } {
  // Cria array de índices e embaralha
  const ordem = Array.from({ length: players.length }, (_, i) => i);
  const shuffledOrdem = shuffleArray(ordem);

  // Divide os índices em grupos para cada time
  const idTimes: number[][] = [];
  for (let i = 0; i < numberOfTeams; i++) {
    idTimes.push(
      shuffledOrdem.slice(i * numberOfPlayers, (i + 1) * numberOfPlayers),
    );
  }

  // Cria os times baseado nos índices
  const times: Player[][] = [];
  for (let i = 0; i < numberOfTeams; i++) {
    times.push([]);
    for (const j of idTimes[i]) {
      times[i].push(players[j]);
    }
  }

  // Calcula médias
  const medias = times.map(
    (time) =>
      time.reduce((sum, player) => sum + player.score, 0) / numberOfPlayers,
  );

  const maior = Math.max(...medias);
  const menor = Math.min(...medias);
  const difference = maior - menor;

  return { difference, teams: times };
}

function sortBalancedTeams(
  players: Player[],
  numberOfTeams: number,
  numberOfPlayers: number,
): TeamResult[] {
  const totalNeeded = numberOfTeams * numberOfPlayers;
  if (players.length < totalNeeded) {
    throw new Error("Jogadores insuficientes para formar os times.");
  }

  // Pega apenas os jogadores necessários
  const selectedPlayers = players.slice(0, totalNeeded);

  const tentativas = 10000;
  let menorDif = 1000;
  let melhorTimes: Player[][] = [];

  // Faz múltiplas tentativas para encontrar a melhor distribuição
  for (let i = 0; i < tentativas; i++) {
    const { difference, teams } = sortear1(
      selectedPlayers,
      numberOfTeams,
      numberOfPlayers,
    );
    if (difference < menorDif) {
      melhorTimes = teams;
      menorDif = difference;
    }
  }

  // Converte para o formato TeamResult
  const result: TeamResult[] = melhorTimes.map((time) => {
    const total = time.reduce((sum, player) => sum + player.score, 0);
    const average = time.length ? Number((total / time.length).toFixed(3)) : 0;
    return {
      players: time,
      average,
    };
  });

  return result;
}

export { checkRules, sortBalancedTeams };

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
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sortBalancedTeams(
  players: Player[],
  numberOfTeams: number,
  numberOfPlayers: number,
): TeamResult[] {
  if (players.length < numberOfTeams * numberOfPlayers) {
    throw new Error("Jogadores insuficientes para formar os times.");
  }

  // Embaralha os jogadores antes de balancear
  const shuffledPlayers = shuffleArray(players);

  // Ordena os jogadores por score decrescente
  const sortedPlayers = [...shuffledPlayers].sort((a, b) => b.score - a.score);

  // Inicializa os times
  const teams: TeamResult[] = Array.from({ length: numberOfTeams }, () => ({
    players: [],
    average: 0,
  }));

  // Distribuição balanceada: snake draft
  let direction = 1;
  let teamIndex = 0;

  for (let i = 0; i < numberOfTeams * numberOfPlayers; i++) {
    teams[teamIndex].players.push(sortedPlayers[i]);
    // Avança para o próximo time
    if (
      (direction === 1 && teamIndex === numberOfTeams - 1) ||
      (direction === -1 && teamIndex === 0)
    ) {
      direction *= -1;
    } else {
      teamIndex += direction;
    }
  }

  // Calcula a média de cada time
  for (const team of teams) {
    const total = team.players.reduce((sum, p) => sum + p.score, 0);
    team.average = Number((total / team.players.length).toFixed(2));
  }

  return teams;
}

export { checkRules, sortBalancedTeams };

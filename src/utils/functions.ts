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

function sortBalancedTeams(
  players: Player[],
  numberOfTeams: number,
  numberOfPlayers: number,
): TeamResult[] {
  const totalNeeded = numberOfTeams * numberOfPlayers;
  if (players.length < totalNeeded) {
    throw new Error("Jogadores insuficientes para formar os times.");
  }

  // Embaralha primeiro para aleatoriedade geral
  const shuffled = shuffleArray(players);

  // Ordena por score, mas com aleatoriedade leve (score + random noise)
  const randomizedSortedPlayers = [...shuffled]
    .sort(
      (a, b) => b.score + Math.random() * 0.3 - (a.score + Math.random() * 0.3),
    )
    .slice(0, totalNeeded);

  const teams: TeamResult[] = Array.from({ length: numberOfTeams }, () => ({
    players: [],
    average: 0,
  }));

  for (const player of randomizedSortedPlayers) {
    // Acha o time mais "leve" com espaço
    const eligibleTeams = teams.filter(
      (team) => team.players.length < numberOfPlayers,
    );

    eligibleTeams
      .sort((a, b) => {
        const totalA = a.players.reduce((sum, p) => sum + p.score, 0);
        const totalB = b.players.reduce((sum, p) => sum + p.score, 0);
        return totalA - totalB;
      })[0]
      .players.push(player);

    // Atualiza médias
    for (const team of teams) {
      const total = team.players.reduce((sum, p) => sum + p.score, 0);
      team.average = team.players.length
        ? Number((total / team.players.length).toFixed(2))
        : 0;
    }
  }

  return teams;
}

export { checkRules, sortBalancedTeams };

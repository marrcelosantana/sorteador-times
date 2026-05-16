import type { TeamResult } from "@/types/player";

type FormatDrawMessageParams = {
  teams: TeamResult[];
  date?: string;
};

function formatDrawDate(date?: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date ? new Date(date) : new Date());
}

function formatDrawMessage({ teams, date }: FormatDrawMessageParams) {
  const header = `Racha formado - ${formatDrawDate(date)}`;
  const totalPlayers = teams.reduce(
    (total, team) => total + team.players.length,
    0,
  );
  const summary = `${teams.length} times | ${totalPlayers} jogadores`;

  const teamsText = teams
    .map((team, idx) => {
      const players = team.players
        .map(
          (player) =>
            `- [${player.position || "N/A"}] ${player.name} | ${player.score}`,
        )
        .join("\n");

      return `Time ${idx + 1} - Média ${team.average}\n${players}`;
    })
    .join("\n\n");

  return `${header}\n${summary}\n\n${teamsText}\n\n Gerado por sorteador de times by Marcelo Santana ©`;
}

function getWhatsAppShareUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function getTelegramShareUrl(message: string) {
  return `https://t.me/share/url?url=&text=${encodeURIComponent(message)}`;
}

export { formatDrawMessage, getTelegramShareUrl, getWhatsAppShareUrl };

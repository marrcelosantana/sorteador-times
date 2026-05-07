export type Player = {
  id: string;
  name: string;
  score: number;
  position?: "ATA" | "MEI" | "DEF";
};

export type PayloadType = {
  numberOfTeams: number;
  numberOfPlayers: number;
  matchList: Player[];
};

export type TeamResult = {
  players: Player[];
  average: number;
};

export type DrawHistory = {
  id: string;
  date: string;
  teams: TeamResult[];
};

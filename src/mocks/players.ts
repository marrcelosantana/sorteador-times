import type { Player } from "@/types/player";

const playersMock: Player[] = [
  { id: "e1f2", name: "Marcelo Santana", score: 4.25, position: "MEI" },
  { id: "a1b2", name: "Davi Silva", score: 1.5, position: "ATA" },
  { id: "c3d4", name: "Lucas Barbosa", score: 4.2, position: "MEI" },
  { id: "o7p8", name: "Pedro Victor (PV)", score: 5.0, position: "MEI" },
  { id: "g7h8", name: "Dhonatas Sousa (Capota)", score: 2.1, position: "MEI" },
  { id: "i9j0", name: "Sergio Filho", score: 4.4, position: "DEF" },
  { id: "k1l2", name: "Assis Felix", score: 3.2, position: "ATA" },
  { id: "a7b8", name: "Manoel Hudson (Manel)", score: 4.6, position: "ATA" },
  { id: "w3x4", name: "Pedro Olimpio", score: 2.1, position: "MEI" },
  { id: "e5f6", name: "Gledson Junior", score: 4.6, position: "DEF" },
  { id: "s9t0", name: "Rodrigo Saldanha", score: 3.9, position: "MEI" },
  { id: "u1v2", name: "Rodrigo Almeida", score: 1.5, position: "DEF" },
  { id: "y5z6", name: "Pedro Lyvio", score: 2.54, position: "DEF" },
  { id: "c9d0", name: "Pedro Henrique", score: 1.5, position: "DEF" },
  { id: "g3h4", name: "Felipe Rodrigues", score: 2.0, position: "DEF" },
  { id: "o5p6", name: "Matheus Felipe", score: 3.9, position: "MEI" },
  { id: "k7l8", name: "Roberto Olavo", score: 1.4, position: "DEF" },
  { id: "q7r8", name: "Matheus Araujo", score: 4.4, position: "MEI" },
  { id: "m9n0", name: "Yago Capistrano", score: 1.2, position: "MEI" },
  { id: "o1p2", name: "Jean Panjota", score: 1.27, position: "DEF" },
  { id: "q3r4", name: "Icaro Caminha", score: 3.3, position: "ATA" },
  { id: "s5t6", name: "Flavio Yuri", score: 2.27, position: "DEF" },
  { id: "u7v8", name: "Jhonny Sousa", score: 4.0, position: "MEI" },
  { id: "w9x0", name: "Julio Rocha", score: 4.67, position: "MEI" },
  { id: "y1z2", name: "Pedro Jacó", score: 1.65, position: "MEI" },
  { id: "a3b4", name: "Pedro Ygor (Perygo)", score: 3.1, position: "MEI" },
  { id: "c5d6", name: "Carlos Eduardo (Cadu)", score: 1.5, position: "DEF" },
  { id: "e7f8", name: "Decio Neto", score: 1.5, position: "ATA" },
  { id: "g9h0", name: "Gabriel Porto", score: 2.17, position: "DEF" },
  { id: "i1j2", name: "Lucas Santiago", score: 3.8, position: "MEI" },
  { id: "k3l4", name: "Lucca Oliveira", score: 2.2, position: "ATA" },
  { id: "m5n6", name: "Morvan Carvalho", score: 3.2, position: "MEI" },
  { id: "q9r0", name: "Roberto Julio", score: 3.65, position: "DEF" },
  { id: "s1t2", name: "Vinicius Cabral", score: 4.8, position: "ATA" },
  { id: "u3v4", name: "Henrique Soares", score: 3.1, position: "DEF" },
  { id: "w5x6", name: "Israel Freitas (Negão)", score: 4.2, position: "ATA" },
  { id: "y7z8", name: "Pablu Ribeiro", score: 3.8, position: "MEI" },
  { id: "a9b0", name: "Lorhan Dejan", score: 3.3, position: "MEI" },
  { id: "s0p9", name: "Afonso Neto", score: 3.0, position: "MEI" },
  { id: "c1d2", name: "Marcos Vinicius", score: 2.43, position: "DEF" },
  { id: "e3f4", name: "Paulo Hemeson (Messin)", score: 4.0, position: "MEI" },
  { id: "g5h6", name: "Romulo Cabral (Romim)", score: 2.6, position: "DEF" },
  { id: "i7j8", name: "Luan Barber", score: 4.1, position: "MEI" },
  { id: "k9l0", name: "John Barber", score: 4.1, position: "MEI" },
  { id: "m1n2", name: "Falcao Filho", score: 4.8, position: "MEI" },
  { id: "o3p4", name: "Avelino Facó", score: 4.8, position: "MEI" },
  { id: "q5r6", name: "Gustavo Araujo", score: 3.3, position: "ATA" },
  { id: "s7t8", name: "Uesley Guerra", score: 4.3, position: "MEI" },
  { id: "u9v0", name: "Natan Oliveira", score: 3.7, position: "MEI" },
  { id: "w1x2", name: "Magno Alves", score: 1.5, position: "DEF" },
  { id: "y3z4", name: "Lucas Benicio", score: 2.4, position: "DEF" },
  { id: "a5b6", name: "Elixandre Filho (Eli)", score: 3.8, position: "MEI" },
  { id: "e9f0", name: "Geova Maciel (Pajé)", score: 2.8, position: "MEI" },
  { id: "g1h2", name: "Francisco Pedro", score: 3.0, position: "MEI" },
  { id: "i3j4", name: "Danilo Pinheiro", score: 2.0, position: "DEF" },
  { id: "k5l6", name: "Angelo Maciel", score: 0.5, position: "ATA" },
  { id: "m7n8", name: "Gabriel Braga", score: 2.8, position: "MEI" },
  { id: "o9p0", name: "Carlos Victor", score: 3.0, position: "DEF" },
  { id: "q1r2", name: "Leodecio Segundo", score: 3.8, position: "MEI" },
  { id: "s3t4", name: "Breno A.", score: 3.6, position: "MEI" },
  {
    id: "m3n4",
    name: "Mateus Felipe (Ex Goleiro)",
    score: 1.3,
    position: "DEF",
  },
];

function getPlayersPage(page: number, pageSize = 10, search: string): Player[] {
  const start = (page - 1) * pageSize;
  if (search) {
    return playersMock
      .filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(start, start + pageSize);
  }
  return playersMock.slice(start, start + pageSize);
}

export { playersMock, getPlayersPage };

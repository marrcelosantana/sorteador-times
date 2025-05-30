import { players } from "@/mocks/players";
import Header from "./components/Header";
import { InfoCard } from "./components/Info-Card";

const Home: React.FC = () => {
  const data = players;
  const aboveAverage = data.filter((player) => player.score > 3).length;
  const belowAverage = data.filter((player) => player.score < 3).length;

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="mb-1 flex w-full flex-col items-center justify-between px-8 py-4 lg:flex-row">
          <h1 className="mb-4 text-3xl font-bold tracking-tight lg:mb-0">
            Jogadores
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
              <InfoCard type="total" data={data.length} />
              <InfoCard type="above-average" data={aboveAverage} />
              <InfoCard type="below-average" data={belowAverage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

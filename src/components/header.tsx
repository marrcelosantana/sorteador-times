import { Plus, Trophy } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Header: React.FC = () => {
  return (
    <header className="flex w-full items-center justify-between border-b-[1px] px-8 py-5">
      <div className="flex items-center justify-center gap-4">
        <Trophy className="h-6 w-6" />
        <Separator orientation="vertical" className="!h-6" />
        <span className="text-xl">Sorteador de times</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button className="flex h-12 items-center justify-center gap-2 text-white">
          <span className="hidden sm:inline">Novo sorteio</span>
          <Plus className="h-4 w-4" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

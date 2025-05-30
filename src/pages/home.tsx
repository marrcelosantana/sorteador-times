import { ThemeToggle } from "@/components/theme/theme-toggle";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-full p-4">
      <div className="ml-auto flex items-center justify-end gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Home;

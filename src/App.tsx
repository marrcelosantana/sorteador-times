import Home from "./pages/home";
import { ThemeProvider } from "./components/theme/theme-provider";
import { PlayersProvider } from "./contexts/players-context";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
      <PlayersProvider>
        <Home />
        <Toaster richColors />
      </PlayersProvider>
      {/* <div className="py-4 text-center">
        <span className="text-muted-foreground text-xs">
          Criado por Marcelo Santana
        </span>
        <Copyright className="text-muted-foreground ml-1 inline h-4 w-4" />
      </div> */}
    </ThemeProvider>
  );
}

export default App;

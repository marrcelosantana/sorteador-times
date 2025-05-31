import Home from "./pages/home";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Copyright } from "lucide-react";
import { PlayersProvider } from "./contexts/players-context";

function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
      <PlayersProvider>
        <Home />
      </PlayersProvider>
      <div className="py-4 text-center">
        <span className="text-muted-foreground text-xs">
          Created by Marcelo Santana
        </span>
        <Copyright className="text-muted-foreground ml-1 inline h-4 w-4" />
      </div>
    </ThemeProvider>
  );
}

export default App;

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
    </ThemeProvider>
  );
}

export default App;

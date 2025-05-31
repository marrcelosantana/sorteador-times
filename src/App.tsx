import Home from "./pages/home";
import { ThemeProvider } from "./components/theme/theme-provider";
import { PlayersProvider } from "./contexts/players-context";

function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
      <PlayersProvider>
        <Home />
      </PlayersProvider>
    </ThemeProvider>
  );
}

export default App;

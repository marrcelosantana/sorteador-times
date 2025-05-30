import Home from "./pages/home";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
      <Home />
    </ThemeProvider>
  );
}

export default App;

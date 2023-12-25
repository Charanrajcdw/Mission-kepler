import "./App.css";
import Home from "./pages/Home/Home";
import ThemeContextProvider from "./contexts/theme.context";

const App = () => {
  return (
    <ThemeContextProvider>
      <Home />
    </ThemeContextProvider>
  );
};

export default App;

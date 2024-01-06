import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import ThemeContextProvider from "./contexts/theme.context";
import { store } from "./store";

const App = () => {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <Home />
      </Provider>
    </ThemeContextProvider>
  );
};

export default App;

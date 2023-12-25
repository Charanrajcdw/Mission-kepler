import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { THEME } from "../constants";

export const ThemeContext = createContext({
  currentTheme: THEME.light,
});

const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEME.light);
  return <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>;
};

ThemeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ThemeContextProvider;

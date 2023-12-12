import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default UserContextProvider;

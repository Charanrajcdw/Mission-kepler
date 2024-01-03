import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { localStorageHelper } from "../utils/localStorage.utils";
import { USER } from "../constants";

export const UserContext = createContext({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

const UserContextProvider = ({ children }) => {
  const { get } = localStorageHelper;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!get(USER.key));
  return <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default UserContextProvider;

import { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { UserContext } from "../../contexts/user.context";
import { ROUTE_PATHS, PUBLIC_NAVS, PRIVATE_NAVS, NAVBAR, USER } from "../../constants";
import { localStorageHelper } from "../../utils/localStorage.utils";

const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTE_PATHS.login;
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const { get, clear } = localStorageHelper;
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    clear();
    navigate(ROUTE_PATHS.home);
  };

  const getNavlinkItems = (data) => {
    return data.map((route) => {
      const { label, path } = route;
      return (
        <li key={label} className={styles.navlink}>
          <NavLink to={path} className={({ isActive }) => (isActive ? styles["navlink-active"] : "")}>
            {label.toUpperCase()}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className={styles.navbar}>
      <Link to={ROUTE_PATHS.home} className={styles.logo}>
        <img src={logo} alt="CINEFLEX" />
      </Link>
      {!isLoginPage && (
        <>
          <ul className={styles.navlinks}>
            {getNavlinkItems(PUBLIC_NAVS)}
            {isUserLoggedIn && getNavlinkItems(PRIVATE_NAVS)}
          </ul>
          <div className={styles["login-details"]}>
            {isUserLoggedIn ? (
              <>
                <span>
                  {NAVBAR.greeting}
                  {get(USER.key).user}
                </span>
                <div className={styles.seperator}></div>
                <span onClick={handleLogout} className={styles.auth}>
                  {NAVBAR.logout}
                </span>
              </>
            ) : (
              <Link to={ROUTE_PATHS.login} className={styles.auth}>
                {NAVBAR.login}
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

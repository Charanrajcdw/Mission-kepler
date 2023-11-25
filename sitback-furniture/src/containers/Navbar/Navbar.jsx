import { Link, NavLink } from "react-router-dom";
import { NAVBAR } from "../../constants/constants";
import { FaCaretDown } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navlinkItems = NAVBAR.navlinks.map((navlink) => (
    <li key={navlink} className={styles.navlink}>
      <NavLink to={`/categories/${navlink}`} className={({ isActive }) => (isActive ? styles["navlink-active"] : "")}>
        {navlink.toUpperCase()}
      </NavLink>
    </li>
  ));

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        {NAVBAR.logo}
      </Link>
      <ul className={styles.navlinks}>{navlinkItems}</ul>
      <p className={styles.username}>
        {NAVBAR.name}
        <span>
          <FaCaretDown />
        </span>
      </p>
    </div>
  );
};

export default Navbar;

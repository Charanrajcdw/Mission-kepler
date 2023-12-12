import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";
import { NAVBAR, ROUTES } from "../../constants/constants";

const Navbar = ({ categoriesData }) => {
  const navlinkItems = categoriesData.map((category) => {
    const { id, category: name } = category;
    return (
      <li key={id} className={styles.navlink}>
        <NavLink to={`${NAVBAR.route}${name.toLowerCase()}`} className={({ isActive }) => (isActive ? styles["navlink-active"] : "")}>
          {name.toUpperCase()}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={styles.navbar}>
      <Link to={ROUTES.home} className={styles.logo}>
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

Navbar.propTypes = {
  categoriesData: PropTypes.array.isRequired,
};

export default Navbar;

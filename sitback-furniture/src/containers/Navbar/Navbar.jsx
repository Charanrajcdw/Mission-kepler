import { Link, NavLink } from "react-router-dom";
import { NAVBAR, ROUTES } from "../../constants/constants";
import { FaCaretDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/furnitures";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [navlinks, setNavlinks] = useState([]);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setNavlinks(
          categories.map((category) => {
            return { id: category.id, name: category.category };
          })
        );
      })
      .catch(() => setNavlinks([]));
  }, []);

  const navlinkItems = navlinks.map((navlink) => (
    <li key={navlink.id} className={styles.navlink}>
      <NavLink to={`${NAVBAR.route}${navlink.name.toLowerCase()}`} className={({ isActive }) => (isActive ? styles["navlink-active"] : "")}>
        {navlink.name.toUpperCase()}
      </NavLink>
    </li>
  ));

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

export default Navbar;

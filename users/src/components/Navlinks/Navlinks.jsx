import PropTypes from "prop-types";
import styles from "./Navlinks.module.css";

function Navlinks({ navLinks }) {
  const navListItems = navLinks.map((navLink, index) => {
    return (
      <li key={`${index}-nav-link`} className={styles.navlink}>
        {navLink}
      </li>
    );
  });

  return <ul className={styles["navlinks-container"]}>{navListItems}</ul>;
}

Navlinks.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navlinks;

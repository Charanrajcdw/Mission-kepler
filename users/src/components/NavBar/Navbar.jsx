import SearchTab from "../SearchTab/SearchTab";
import Navlinks from "../Navlinks/Navlinks";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

function NavBar({ placeholder, navLinks }) {
  return (
    <div className={styles.navbar}>
      <SearchTab placeholder={placeholder} />
      <Navlinks navLinks={navLinks} />
    </div>
  );
}

NavBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  navLinks: PropTypes.array.isRequired,
};

export default NavBar;

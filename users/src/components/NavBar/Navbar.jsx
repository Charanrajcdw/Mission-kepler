import SearchTab from "../SearchTab/SearchTab";
import Navlinks from "../Navlinks/Navlinks";
import styles from "./Navbar.module.css";
import { HEADER_DATA } from "../../assets/UserData";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <SearchTab placeholder={HEADER_DATA.placeholder} />
      <Navlinks navLinks={HEADER_DATA.navLinks} />
    </div>
  );
}

export default NavBar;

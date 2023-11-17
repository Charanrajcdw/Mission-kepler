import NavBar from "../../components/NavBar/Navbar";
import { HEADER_DATA } from "../../assets/UserData";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles["header-container"]}>
      <h1 className={styles.title}>{HEADER_DATA.title}</h1>
      <NavBar />
    </header>
  );
}

export default Header;

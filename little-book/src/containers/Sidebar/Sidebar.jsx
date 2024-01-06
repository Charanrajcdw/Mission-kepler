import { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import { MODAL, SIDEBAR, THEME } from "../../constants";
import { ThemeContext } from "../../contexts/theme.context";

const Sidebar = ({ setCurrentModal }) => {
  const LOGO = SIDEBAR.logo.split(" ");
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    toggleTheme();
  };

  const filterValues = ["Regional", "National", "International"];
  const getFilterContent = () => {
    let filterContent = "";
    if (filterValues.length > 0) {
      filterContent = filterValues.map((filter) => <Checkbox key={filter} label={filter} />);
    } else {
      filterContent = <p>{SIDEBAR.noFilter}</p>;
    }
    return filterContent;
  };

  return (
    <aside className={styles.sidebarContainer}>
      <h1 className={styles.title}>
        {LOGO[0]} <span className={styles.titleLastWord}>{LOGO[1]}</span>
      </h1>
      <div className={styles.filtersContainer}>
        <p className={styles.filterTitle}>{SIDEBAR.filter}</p>
        <div>{getFilterContent()}</div>
      </div>
      <div className={styles.optionsContainer}>
        <p className={styles.members} onClick={() => setCurrentModal(MODAL.members)}>
          {SIDEBAR.viewMembers}
        </p>
        <p className={styles.theme} onClick={changeTheme}>
          {currentTheme === THEME.light ? SIDEBAR.switchToDark : SIDEBAR.switchToLight}
        </p>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  setCurrentModal: PropTypes.func.isRequired,
};

export default Sidebar;

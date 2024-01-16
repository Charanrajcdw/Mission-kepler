import { useContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import Checkbox from "../../components/Checkbox/Checkbox";
import { MODAL, SIDEBAR, THEME } from "../../constants";
import { ThemeContext } from "../../contexts/theme.context";

const Sidebar = ({ modalHandler }) => {
  const LOGO = SIDEBAR.logo.split(" ");
  const filterValues = useSelector((state) => state.blogs.blogTypes);
  const selectedBlogTypes = useSelector((state) => state.blogs.selectedBlogTypes);
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    toggleTheme();
  };

  const getFilterContent = () => {
    let filterContent = "";
    if (filterValues.length > 0) {
      filterContent = filterValues.map((filter) => (
        <Checkbox key={filter} label={filter} modalHandler={modalHandler} isSelected={selectedBlogTypes.includes(filter)} />
      ));
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
        <p className={styles.members} onClick={() => modalHandler(MODAL.members, false)}>
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
  modalHandler: PropTypes.func.isRequired,
};

export default Sidebar;

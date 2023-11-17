import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchTab.module.css";
import PropTypes from "prop-types";

function SearchTab({ placeholder }) {
  return (
    <div className={styles["search-container"]}>
      <FontAwesomeIcon icon={faSearch} className={styles["search-icon"]} />
      <input type="search" placeholder={placeholder} className={styles["search-input"]} />
    </div>
  );
}

SearchTab.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchTab;

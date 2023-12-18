import styles from "./OtherLanguages.module.css";
import { OTHER_LANGUAGES } from "../../constants/component.constants";

const OtherLanguages = () => {
  return (
    <div className={styles["other-languages-container"]}>
      <p className={styles["languages-title"]}>{OTHER_LANGUAGES.title}</p>
      <div className={styles["language-list-container"]}>
        {OTHER_LANGUAGES.languagesList.map((language) => (
          <span key={language} className={styles["language-card"]}>
            {language}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OtherLanguages;

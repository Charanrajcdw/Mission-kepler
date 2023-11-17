import UserImage from "../UserImage/UserImage";
import PropTypes from "prop-types";
import styles from "./userCard.module.css";

function UserCard({ name, location, tags, image }) {
  return (
    <div className={`${styles["user-card"]} ${name === "Jesus Weiss" ? styles["active-card"] : ""}`}>
      <UserImage image={image} alt={name} />
      <div className={styles["user-details"]}>
        <p className={styles.username}>{name}</p>
        <p className={styles.location}>{location}</p>
        <ul className={styles["user-tags"]}>
          {tags.map((tag) => (
            <li key={tag} className={styles["user-tag"]}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string.isRequired,
};

export default UserCard;

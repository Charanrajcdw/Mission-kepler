import PropTypes from "prop-types";
import styles from "./MembersCard.module.scss";
import Image from "../Image/Image";
import { API_URLS } from "../../constants";

const MembersCard = ({ name, photo, address }) => {
  return (
    <div className={styles.memberCard}>
      <Image src={`${API_URLS.images}${photo}`} alt={name} className="memberImg" />
      <p className={styles.memberName}>{name}</p>
      <span className={styles.memberCity}>{address.city}</span>
    </div>
  );
};

MembersCard.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  address: PropTypes.shape({ city: PropTypes.string.isRequired }),
};

export default MembersCard;

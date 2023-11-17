import UserCard from "../../components/UserCard/UserCard";
import { CONTENT_DATA } from "../../assets/UserData";
import styles from "./UserDetails.module.css";

function UserDetails() {
  const userCards =
    CONTENT_DATA && CONTENT_DATA.length > 0 ? (
      CONTENT_DATA.map((userData) => {
        return <UserCard key={userData.name} {...userData} />;
      })
    ) : (
      <p>No users found!!</p>
    );
  return <main className={styles["user-cards-container"]}>{userCards}</main>;
}

export default UserDetails;

import { useEffect, useState } from "react";
import styles from "./MembersList.module.scss";
import Loader from "../../components/Loader/Loader";
import MembersCard from "../../components/MembersCard/MembersCard";
import { getUsers } from "../../services/blog.services";
import { MEMBERS_LIST } from "../../constants";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUsers().then((users) => {
      setMembers(users);
      setIsLoaded(true);
    });
  }, []);

  const getMembersContent = () => {
    let membersContent = "";
    if (members.length > 0) {
      membersContent = members.map((member) => <MembersCard key={member.id} {...member} />);
    } else {
      membersContent = MEMBERS_LIST.noMembers;
    }
    return membersContent;
  };

  return (
    <div className={styles.membersListContainer}>
      <h2 className={styles.membersListTitle}>{MEMBERS_LIST.title}</h2>
      {isLoaded ? <div className={styles.membersContainer}>{getMembersContent()}</div> : <Loader />}
    </div>
  );
};

export default MembersList;

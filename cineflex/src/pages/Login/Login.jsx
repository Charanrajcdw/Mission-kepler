import styles from "./Login.module.css";
import sindel from "../../assets/sindel.png";
import Image from "../../components/Image/Image";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LOGIN } from "../../constants";

const Login = () => {
  return (
    <div className={styles["login-page-container"]}>
      <Image src={sindel} alt="cover-image" />
      <div className={styles["login-form-container"]}>
        <h2 className={styles["form-title"]}>{LOGIN.title}</h2>
        <p className={styles["form-description"]}>{LOGIN.description}</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

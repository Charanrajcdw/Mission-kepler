import { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_FORM, ROUTE_PATHS, USER } from "../../constants";
import styles from "./LoginForm.module.css";
import Button from "../../components/Button/Button";
import { localStorageHelper } from "../../utils/localStorage.utils";
import { UserContext } from "../../contexts/user.context";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { get, set } = localStorageHelper;
  const user = get(USER.key);
  const { setIsUserLoggedIn } = useContext(UserContext);

  useEffect(() => {
    user && user.user && navigate(ROUTE_PATHS.home);
  }, [user, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email === LOGIN_FORM.emailValue && password === LOGIN_FORM.passwordValue) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      set(USER.key, { user: USER.name });
      setIsUserLoggedIn(true);
      navigate(ROUTE_PATHS.home);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["input-group"]}>
        <label htmlFor={LOGIN_FORM.email} className={styles["input-label"]}>
          {LOGIN_FORM.email}
        </label>
        <input
          type="email"
          ref={emailRef}
          name={LOGIN_FORM.email}
          id={LOGIN_FORM.email}
          className={styles["input-field"]}
          defaultValue={LOGIN_FORM.emailValue}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor={LOGIN_FORM.password} className={styles["input-label"]}>
          {LOGIN_FORM.password}
        </label>
        <input
          type="password"
          ref={passwordRef}
          name={LOGIN_FORM.password}
          id={LOGIN_FORM.password}
          className={styles["input-field"]}
          defaultValue={LOGIN_FORM.passwordValue}
        />
      </div>
      <Button className="form-btn">{LOGIN_FORM.button}</Button>
    </form>
  );
};

export default LoginForm;

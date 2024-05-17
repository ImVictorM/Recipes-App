import { setLocalStorage } from "../services/localStorage";
import logoRecipesApp from "../images/logoRecipesApp.svg";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

export default function Login() {
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const canEnter = useMemo(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return (
      loginFormState.password.length > MIN_PASSWORD_LENGTH &&
      emailRegex.test(loginFormState.email)
    );
  }, [loginFormState]);

  const handleLogin = async () => {
    actLogin(this.state);
    setLocalStorage("user", { email });
    navigate("/meals");
  };

  return (
    <div className="login">
      <img src={logoRecipesApp} alt="logo Recipes App" />
      <form className="login-inputs">
        <input
          type="email"
          placeholder="Enter your email"
          data-testid="email-input"
          name="email"
          value={loginFormState.email}
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          data-testid="password-input"
          name="password"
          value={loginFormState.password}
          onChange={handleFormChange}
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={!canEnter}
          onClick={handleLogin}
        >
          Enter
        </button>
      </form>
    </div>
  );
}

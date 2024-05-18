import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "@/assets/images";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/store/slices/userSlice";
import "@/sass/pages/_login.scss";

export default function Login() {
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
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
    dispatch(
      setUser({
        email: loginFormState.email,
        password: loginFormState.password,
      })
    );
    navigate("/meals");
  };

  return (
    <div className="min-vh-100 container-fluid">
      <main className="login">
        <img src={logo} alt="logo" />
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
      </main>
    </div>
  );
}

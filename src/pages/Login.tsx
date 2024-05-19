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

  const isFormValid = useMemo(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return (
      loginFormState.password.length > MIN_PASSWORD_LENGTH &&
      emailRegex.test(loginFormState.email)
    );
  }, [loginFormState]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setUser({
        email: loginFormState.email,
        password: loginFormState.password,
      })
    );
    navigate("/meals");
  };

  return (
    <div className="min-vh-100 p-0 container-fluid d-flex justify-content-center">
      <main className="login">
        <img src={logo} className="logo" alt="logo" />
        <form className="login-form container-fluid" onSubmit={handleLogin}>
          <h1 className="login-title">Login</h1>
          <div className="login-inputs">
            <input
              type="email"
              placeholder="Enter your email"
              data-testid="email-input"
              name="email"
              value={loginFormState.email}
              onChange={handleFormChange}
              className="form-control"
              maxLength={60}
            />

            <input
              type="password"
              placeholder="Enter your password"
              data-testid="password-input"
              name="password"
              value={loginFormState.password}
              onChange={handleFormChange}
              className="form-control"
              maxLength={60}
            />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            data-testid="login-submit-btn"
            disabled={!isFormValid}
          >
            Enter
          </button>
        </form>
      </main>
    </div>
  );
}

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "@/assets/images";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/store/slices/userSlice";
import "@/sass/pages/_login.scss";
import { Button, Container, Form, Image, Stack } from "react-bootstrap";

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
    <Container fluid className="min-vh-100 p-0 d-flex justify-content-center">
      <Container as="main" fluid className="login">
        <Image src={logo} className="logo" alt="logo" />

        <Form className="login-form container-fluid" onSubmit={handleLogin}>
          <Container as="h1" fluid className="login-title">
            Login
          </Container>

          <Stack gap={2}>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              data-testid="email-input"
              name="email"
              value={loginFormState.email}
              onChange={handleFormChange}
              maxLength={60}
            />

            <Form.Control
              type="password"
              placeholder="Enter your password"
              data-testid="password-input"
              name="password"
              value={loginFormState.password}
              onChange={handleFormChange}
              maxLength={60}
            />
          </Stack>

          <Button
            variant="primary"
            type="submit"
            data-testid="login-submit-btn"
            disabled={!isFormValid}
            className="m-0"
          >
            Enter
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

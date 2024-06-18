import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, Stack } from "react-bootstrap";

import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";

import { selectUser, setUser } from "@/store/slices/user";

import Logo from "@/assets/images/logo.svg";

import styles from "@/sass/pages/Login/Login.module.scss";

export default function Login() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = React.useState<string>("");

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const isFormValid = React.useMemo(() => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return emailRegex.test(userEmail);
  }, [userEmail]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setUser({
        email: userEmail,
      })
    );
  };

  React.useEffect(() => {
    if (user.email) {
      const navigatePath = location.state?.from?.pathname || "/meals";

      navigate(navigatePath);
    }
  }, [location.state?.from?.pathname, navigate, user.email]);

  return (
    <Container fluid className="min-vh-100 p-0 d-flex justify-content-center">
      <main className={`${styles.login}`} data-testid="Login">
        <Logo className={`${styles.login__logo}`} role="img" />

        <Form
          className={`${styles.login__form} container-fluid`}
          onSubmit={handleLogin}
          id={`${styles["login-form"]}`}
          data-testid="Login.Form"
        >
          <Container as="h1" fluid className={`${styles.login__title}`}>
            Login
          </Container>

          <Stack gap={2}>
            <FloatingLabel controlId="email-input" label="Enter your email">
              <Form.Control
                className={`${styles.login__form__email__input}`}
                type="email"
                placeholder="name@example.com"
                name="email"
                value={userEmail}
                onChange={handleUserEmailChange}
                maxLength={60}
              />
            </FloatingLabel>
          </Stack>

          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid}
            className="m-0"
          >
            Enter
          </Button>
        </Form>
      </main>
    </Container>
  );
}

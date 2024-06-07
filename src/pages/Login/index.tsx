import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/assets/images";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectUser, setUser } from "@/store/slices/userSlice";
import { Button, Container, FloatingLabel, Form, Stack } from "react-bootstrap";
import styles from "@/sass/pages/Login/style.module.scss";

export default function Login() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState<string>("");

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const isFormValid = useMemo(() => {
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

  useEffect(() => {
    if (user.email) {
      const navigatePath = location.state?.from?.pathname || "/meals";

      navigate(navigatePath);
    }
  }, [location.state?.from?.pathname, navigate, user.email]);

  return (
    <Container fluid className="min-vh-100 p-0 d-flex justify-content-center">
      <Container as="main" fluid className={`${styles.login}`}>
        <Logo className={`${styles.login__logo}`} role="img" />

        <Form
          className={`${styles.login__form} container-fluid`}
          onSubmit={handleLogin}
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
                data-testid="email-input"
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

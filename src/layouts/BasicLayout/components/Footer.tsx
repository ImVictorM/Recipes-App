import { CocktailIcon, MealIcon } from "@/assets/icons";
import { Container, Nav } from "react-bootstrap";
import styles from "@/sass/layouts/BasicLayout/components/Footer.module.scss";

export default function Footer() {
  return (
    <Container
      as="footer"
      fluid
      data-testid="footer"
      className={`${styles.footer} fixed-bottom`}
    >
      <Nav as="nav" className={`${styles.footer__nav}`}>
        <Nav.Item>
          <Nav.Link href="/meals" data-testid="meals-bottom-btn">
            <MealIcon
              role="img"
              aria-label="meal plate in the middle with fork to the left and knife to the right"
            />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/drinks" data-testid="drinks-bottom-btn">
            <CocktailIcon role="img" aria-label="cocktail glass" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

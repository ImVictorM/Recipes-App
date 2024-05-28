import { cocktailIcon, mealIcon } from "@/assets/icons";
import { Container, Image, Nav } from "react-bootstrap";
import styles from "@/sass/components/Footer.module.scss";

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
          <Nav.Link href="/drinks">
            <Image
              src={cocktailIcon}
              alt="cocktail"
              data-testid="drinks-bottom-btn"
            />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/meals">
            <Image src={mealIcon} alt="meal" data-testid="meals-bottom-btn" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

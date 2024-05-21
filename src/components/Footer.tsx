import { cocktailIcon, mealIcon } from "@/assets/icons";
import { Container, Image, Nav } from "react-bootstrap";
import "@/sass/components/_footer.scss";

export default function Footer() {
  return (
    <Container
      as="footer"
      fluid
      data-testid="footer"
      className="footer fixed-bottom"
    >
      <Nav as="nav" className="footer-content">
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

import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import MealIcon from "@/assets/icons/mealIcon.svg";
import CocktailIcon from "@/assets/icons/cocktailIcon.svg";

import styles from "@/sass/layouts/BasicLayout/components/Footer.module.scss";

export default function Footer() {
  return (
    <Container
      as="footer"
      fluid
      data-testid="footer"
      className={`${styles.footer} fixed-bottom`}
    >
      <nav className={`${styles.footer__nav}`}>
        <div>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="link-meals" {...props}>
                Search for foods
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/meals"
              data-testid="meals-bottom-btn"
            >
              <MealIcon
                role="img"
                aria-label="meal plate in the middle with a fork to the left and a knife to the right"
              />
            </Link>
          </OverlayTrigger>
        </div>

        <div>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="link-drinks" {...props}>
                Search for drinks
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/drinks"
              data-testid="drinks-bottom-btn"
            >
              <CocktailIcon role="img" aria-label="cocktail glass" />
            </Link>
          </OverlayTrigger>
        </div>
      </nav>
    </Container>
  );
}

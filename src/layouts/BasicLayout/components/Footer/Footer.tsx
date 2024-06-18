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
      className={`${styles.footer} fixed-bottom`}
      data-testid="BasicLayout.Footer"
    >
      <nav className={`${styles.footer__nav}`}>
        <div>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="link-meals" {...props}>
                <span data-testid="BasicLayout.Footer.LinkMeals.Tooltip">
                  Search for foods
                </span>
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/meals"
              data-testid="BasicLayout.Footer.LinkMeals"
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
                <span data-testid="BasicLayout.Footer.LinkDrinks.Tooltip">
                  Search for drinks
                </span>
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/drinks"
              data-testid="BasicLayout.Footer.LinkDrinks"
            >
              <CocktailIcon role="img" aria-label="cocktail glass" />
            </Link>
          </OverlayTrigger>
        </div>
      </nav>
    </Container>
  );
}

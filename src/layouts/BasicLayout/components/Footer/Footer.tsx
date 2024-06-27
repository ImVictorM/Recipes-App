import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import MealIcon from "@/assets/icons/mealIcon.svg";
import CocktailIcon from "@/assets/icons/cocktailIcon.svg";

import styles from "@/sass/layouts/BasicLayout/components/Footer.module.scss";
import { TestableComponent } from "@/types/testableComponent";

export default function Footer({
  prefixDataTestId = "Footer",
}: TestableComponent) {
  return (
    <Container
      as="footer"
      fluid
      className={`${styles.footer} fixed-bottom`}
      data-testid={prefixDataTestId}
    >
      <nav className={`${styles.footer__nav}`}>
        <div>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="link-meals" {...props}>
                <span data-testid={`${prefixDataTestId}.LinkMeals.Tooltip`}>
                  Search for foods
                </span>
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/meals"
              data-testid={`${prefixDataTestId}.LinkMeals`}
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
                <span data-testid={`${prefixDataTestId}.LinkDrinks.Tooltip`}>
                  Search for drinks
                </span>
              </Tooltip>
            )}
            placement="top"
          >
            <Link
              className={`${styles.footer__nav__link}`}
              to="/drinks"
              data-testid={`${prefixDataTestId}.LinkDrinks`}
            >
              <CocktailIcon role="img" aria-label="cocktail glass" />
            </Link>
          </OverlayTrigger>
        </div>
      </nav>
    </Container>
  );
}

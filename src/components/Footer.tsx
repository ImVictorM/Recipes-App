import { Link } from "react-router-dom";
import { cocktailIcon, mealIcon } from "@/assets/icons";
import "@/sass/components/_footer.scss";

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer fixed-bottom">
      <nav className="footer-content">
        <Link to="/drinks">
          <img
            src={cocktailIcon}
            alt="cocktail"
            data-testid="drinks-bottom-btn"
          />
        </Link>

        <Link to="/meals">
          <img
            className="svg"
            src={mealIcon}
            alt="meal"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </nav>
    </footer>
  );
}

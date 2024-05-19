import { Link } from "react-router-dom";
import { drinkIcon, mealIcon } from "@/assets/icons";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <Link to="/drinks">
        <img src={drinkIcon} alt="cocktail" data-testid="drinks-bottom-btn" />
      </Link>

      <Link to="/meals">
        <img
          className="svg"
          src={mealIcon}
          alt="meal"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

import { Link } from "react-router-dom";
import "../styles/components/Footer.css";
import { drinkIcon, mealIcon } from "@/assets/icons";

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <Link to="/drinks">
        <img
          src={drinkIcon}
          alt="Icon Bebidas"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          className="svg"
          src={mealIcon}
          alt="Icon comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

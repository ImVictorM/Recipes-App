import { Card } from "react-bootstrap";

import styles from "@/sass/components/ui/RecipeBasicCard.module.scss";

import { RecipeBasicCardProps } from "./RecipeBasicCard.types";

export default function RecipeBasicCard({
  recipe: { id, img, name, type },
  scaleOnHover,
  index,
}: RecipeBasicCardProps) {
  return (
    <Card
      className={`${styles["recipe-card"]} ${
        scaleOnHover ? `${styles["recipe-card--scale-on-hover"]}` : ""
      } shadow m-0`}
    >
      <Card.Link
        href={type === "meal" ? `/meals/${id}` : `/drinks/${id}`}
        className="text-decoration-none"
      >
        <div className={`${styles["recipe-card__img"]}`}>
          <Card.Img
            variant="top"
            src={img}
            alt={name}
            data-testid={`${index}-card-img`}
          />
        </div>

        <Card.Body className={`${styles["recipe-card__body"]}`}>
          <Card.Title
            className={`${styles["recipe-card__body__title"]}`}
            title={name}
            data-testid={`${index}-card-name`}
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card.Link>
    </Card>
  );
}

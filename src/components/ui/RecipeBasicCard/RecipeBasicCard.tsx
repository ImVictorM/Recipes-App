import { Card } from "react-bootstrap";

import styles from "@/sass/components/ui/RecipeBasicCard.module.scss";

import { RecipeBasicCardProps } from "./RecipeBasicCard.types";

export default function RecipeBasicCard({
  recipe: { id, img, name, type },
  scaleOnHover,
}: RecipeBasicCardProps) {
  return (
    <Card
      className={`${styles["recipe-card"]} ${
        scaleOnHover ? `${styles["recipe-card--scale-on-hover"]}` : ""
      } shadow m-0`}
      data-testid="BasicCard"
    >
      <Card.Link
        href={`/${type}s/${id}`}
        className="text-decoration-none"
        data-testid="BasicCard.Link"
      >
        <div className={`${styles["recipe-card__img"]}`}>
          <Card.Img
            role="img"
            variant="top"
            src={img}
            alt={name}
            data-testid="BasicCard.Img"
          />
        </div>

        <Card.Body
          data-testid="BasicCard.Body"
          className={`${styles["recipe-card__body"]}`}
        >
          <Card.Title
            className={`${styles["recipe-card__body__title"]}`}
            title={name}
            data-testid="BasicCard.Body.Title"
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card.Link>
    </Card>
  );
}

import { Card } from "react-bootstrap";

import styles from "@/sass/components/ui/RecipeBasicCard.module.scss";

import { RecipeBasicCardProps } from "./RecipeBasicCard.types";

export default function RecipeBasicCard({
  recipe: { id, img, name, type },
  scaleOnHover,
  prefixDataTestId = "BasicCard",
}: RecipeBasicCardProps) {
  return (
    <Card
      className={`${styles["recipe-card"]} ${
        scaleOnHover ? `${styles["recipe-card--scale-on-hover"]}` : ""
      } shadow m-0`}
      data-testid={prefixDataTestId}
    >
      <Card.Link
        href={`/${type}s/${id}`}
        className="text-decoration-none"
        data-testid={`${prefixDataTestId}.Link`}
      >
        <div className={`${styles["recipe-card__img"]}`}>
          <Card.Img
            role="img"
            variant="top"
            src={img}
            alt={name}
            data-testid={`${prefixDataTestId}.Img`}
          />
        </div>

        <Card.Body
          data-testid={`${prefixDataTestId}.Body`}
          className={`${styles["recipe-card__body"]}`}
        >
          <Card.Title
            className={`${styles["recipe-card__body__title"]}`}
            title={name}
            data-testid={`${prefixDataTestId}.Body.Title`}
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card.Link>
    </Card>
  );
}

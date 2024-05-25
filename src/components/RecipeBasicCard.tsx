import { Card, Container } from "react-bootstrap";
import { Recipe } from "@/store/slices/menuSlice";
import "@/sass/components/_recipeBasicCard.scss";

export type RecipeBasicCardProps = {
  recipe: Recipe;
  scaleOnHover?: boolean;
  index: number;
};

export default function RecipeBasicCard({
  recipe: { id, img, name, type },
  scaleOnHover,
  index,
}: RecipeBasicCardProps) {
  return (
    <Card
      className={`recipe-card ${
        scaleOnHover ? "recipe-card--scale-on-hover" : ""
      } shadow m-0`}
    >
      <Card.Link
        href={type === "meal" ? `/meals/${id}` : `/drinks/${id}`}
        className="text-decoration-none"
      >
        <Container fluid className="recipe-card-img p-0">
          <Card.Img
            variant="top"
            src={img}
            alt={name}
            data-testid={`${index}-card-img`}
          />
        </Container>

        <Card.Body className="recipe-card-body">
          <Card.Title
            className="recipe-card-body-title"
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

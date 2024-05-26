import { RecipeHero } from "@/components";
import { RecipeWithDetails } from "@/store/slices/menuSlice";
import { PropsWithChildren } from "react";
import "@/sass/layouts/_heroLayout.scss";

export type HeroLayoutProps = PropsWithChildren & {
  recipe: RecipeWithDetails;
};

export default function HeroLayout({ recipe, children }: HeroLayoutProps) {
  return (
    <>
      <RecipeHero recipe={recipe} />

      <main className="hero-layout-content">{children}</main>
    </>
  );
}

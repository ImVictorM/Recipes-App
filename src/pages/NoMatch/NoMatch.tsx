import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import useHeadTitle from "@/hooks/useHeadTitle";

import brokenWineGlass from "@/assets/images/brokenWineGlass.png";
import ArrowLeftIcon from "@/assets/icons/arrowLeftIcon.svg";
import Blob from "@/assets/images/blob.svg";

import styles from "@/sass/pages/NoMatch/NoMatch.module.scss";
import { TestableComponent } from "@/types/testableComponent";

export default function NoMatch({
  prefixDataTestId = "NoMatch",
}: TestableComponent) {
  useHeadTitle("Not Found");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={`${styles["no-match"]}`} data-testid={prefixDataTestId}>
      <div className={`${styles["no-match__inner"]}`}>
        <section className={`${styles["no-match__broken-glass"]}`}>
          <Blob
            aria-label="blob"
            role="img"
            className={`${styles["no-match__broken-glass__blob"]}`}
          />
          <img
            className={`${styles["no-match__broken-glass__glass"]}`}
            src={brokenWineGlass}
            alt="broken wine glass"
          />
        </section>

        <section className={`${styles["no-match__message"]}`}>
          <span
            data-testid={`${prefixDataTestId}.404`}
            className={`${styles["no-match__message__not-found"]}`}
          >
            404
          </span>

          <h1
            data-testid={`${prefixDataTestId}.Title`}
            className={`${styles["no-match__message__title"]}`}
          >
            Something's missing here...
          </h1>

          <p
            data-testid={`${prefixDataTestId}.Text`}
            className={`${styles["no-match__message__paragraph"]}`}
          >
            I think someone stole the page you are looking for.
          </p>

          <Button
            onClick={handleGoBack}
            className={`${styles["no-match__message__go-back"]}`}
            data-testid={`${prefixDataTestId}.ButtonBack`}
          >
            <ArrowLeftIcon aria-label="arrow to the left" role="img" />
            <span>Go back to a safe place</span>
          </Button>
        </section>
      </div>
    </main>
  );
}

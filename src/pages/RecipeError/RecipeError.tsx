import { Button } from "react-bootstrap";
import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";

import ErrorIcon from "@/assets/icons/errorIcon.svg";

export default function RecipeError() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleReload = () => {
    navigate(0);
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <main className={`px-4`}>
        <ErrorIcon role="image" aria-label="error" style={{ width: "70px" }} />
        <h1>Oops, something went wrong!</h1>

        <p>Something happened when trying to show this page content.</p>

        {isRouteErrorResponse(error) && (
          <p className="text-muted">
            Error code: {error.status} - {error.statusText}
          </p>
        )}

        <Button onClick={handleReload} className={`d-flex ms-auto`}>
          Reload
        </Button>
      </main>
    </div>
  );
}

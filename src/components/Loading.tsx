import { Spinner } from "react-bootstrap";
import "@/sass/components/_loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner variant="primary" animation="border" />
    </div>
  );
}

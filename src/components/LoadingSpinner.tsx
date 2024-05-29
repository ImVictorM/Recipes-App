import { Spinner } from "react-bootstrap";
import styles from "@/sass/components/LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={`${styles.loading}`}>
      <Spinner variant="primary" animation="border" />
    </div>
  );
}

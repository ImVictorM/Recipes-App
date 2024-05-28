import { Spinner } from "react-bootstrap";
import styles from "@/sass/components/Loading.module.scss";

export default function Loading() {
  return (
    <div className={`${styles.loading}`}>
      <Spinner variant="primary" animation="border" />
    </div>
  );
}

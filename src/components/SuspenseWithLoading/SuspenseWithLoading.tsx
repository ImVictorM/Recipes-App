import React from "react";
import { Outlet } from "react-router-dom";

import styles from "@/sass/components/SuspenseWithLoading.module.scss";
import Loading from "../Loading";

export default function SuspenseWithLoading() {
  return (
    <React.Suspense
      fallback={
        <main className={`${styles.overlay}`}>
          <Loading />
        </main>
      }
    >
      <Outlet />
    </React.Suspense>
  );
}

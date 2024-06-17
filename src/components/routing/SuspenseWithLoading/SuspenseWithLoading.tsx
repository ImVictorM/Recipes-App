import React from "react";
import { Outlet } from "react-router-dom";

import styles from "@/sass/components/routing/SuspenseWithLoading.module.scss";
import Loading from "@/components/ui/Loading";

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

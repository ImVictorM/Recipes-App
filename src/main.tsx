import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./service/connexion";
import "./index.css";

import router from "./router.jsx";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </StrictMode>
);

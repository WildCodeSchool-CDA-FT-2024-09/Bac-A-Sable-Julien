import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailRepo from "./pages/DetailRepo";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/detail/:id",
        element: <DetailRepo/>,
    },
]);


export default router;

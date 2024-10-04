import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        // loader: () => fetch  (`http://localhost:3000/api/repos `)
    },
]);


export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Page404 from "./pages/errors/404";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <Page404 />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

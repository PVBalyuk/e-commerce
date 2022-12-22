import { createBrowserRouter } from "react-router-dom";
import Layout from "src/components/layout/layout";
import NotFound from "src/components/not-found/not-found";
import Shop from "src/modules/shop/list/shop";
import { AboutUs, Favorites, HomePage, News } from "src/modules";
import CreateItem from "src/modules/shop/create-item/create-item";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "shop/create",
        element: <CreateItem />,
      },
    ],
  },
]);

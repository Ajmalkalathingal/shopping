import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";  
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cartPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // ✅ wrap with Layout
    children: [
      { index: true, element: <HomePage /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);

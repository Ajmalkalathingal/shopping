import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cartPage";
import AuthCard  from "./pages/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";


import CreateCategory from "./pages/admin/CreateCategory";

const CategoryList = lazy(() => import("./pages/admin/categories"))
const ProductList = lazy(() => import("./pages/admin/products"))
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"))
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"))
// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      { path: "user-auth", element: <AuthCard /> },
      { path: "/product/:id", element: <ProductDetails /> },

      // --- Admin Routes ---
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          { path: "categories", element: <CategoryList /> },
          { path: "products", element: <ProductList /> },
          { path: "create-product", element: <CreateProduct /> },
          { path: "create-category", element: <CreateCategory /> },
          { path:"edit-product/:id", element: <UpdateProduct /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

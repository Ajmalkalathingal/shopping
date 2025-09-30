// src/App.js
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

// Core pages/components
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cartPage";
import AuthCard from "./pages/Auth";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import CreateCategory from "./pages/admin/CreateCategory";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy-loaded pages
const CategoryList = lazy(() => import("./pages/admin/categories"));
const ProductList = lazy(() => import("./pages/admin/products"));
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "user-auth", element: <AuthCard /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "checkout", element: <CheckoutPage /> },

       {
        path: "/order-complete",
        element: (
          <ProtectedRoute>
            <OrderCompletePage />
          </ProtectedRoute>
        ),
      },

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
          { path: "edit-product/:id", element: <UpdateProduct /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <span className="text-lg font-medium">Loading...</span>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;

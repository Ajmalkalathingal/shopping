import { lazy, Suspense } from "react";

// Lazy load components
const Navbar = lazy(() => import("./components/nav"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <>
        <Navbar />
        <HomePage />
    </>
  );
}

export default App;
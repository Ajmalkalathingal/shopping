  import { useState } from "react";
  import CategoryCard from "./components/CategoryCard";
  import ProductCard from "./components/ProductCard";
  import { Button } from "./components/ui/button";
  import Navbar from "./components/nav";
  import { categories } from "./data/categories";
  import { products } from "./data/products";
  import { Menu, X } from "lucide-react"; // icons for toggle
import HomePage from "./pages/HomePage";

  function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <>
        <Navbar />
        
<HomePage/>
      </>
    );
  }

  export default App;



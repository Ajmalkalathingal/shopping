import { useState, useEffect, lazy, Suspense } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";

const CategoryCard = lazy(() => import("../components/CategoryCard"));
const ProductCard = lazy(() => import("../components/ProductCard"));

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    // Fetch categories first (usually smaller and faster)
    getCategories()
      .then(cats => {
        setCategories(cats);
        setCategoriesLoading(false);
      })
      .catch(console.error);

    // Then fetch products
    getProducts()
      .then(prods => {
        setProducts(prods);
        setProductsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Categories load first */}
      <div className="w-full bg-white shadow-sm sticky top-[80px] z-40">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center space-x-3 px-3 py-2">
            {categoriesLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              ))
            ) : (
              categories.map((categorie) => (
                <Suspense key={categorie.id} fallback={
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                }>
                  <CategoryCard name={categorie.name} />
                </Suspense>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Products load after */}
      <div className="px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {productsLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
          ))
        ) : (
          products.map((product) => (
            <Suspense key={product.id} fallback={
              <div className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            }>
              <ProductCard product={product} />
            </Suspense>
          ))
        )}
      </div>
    </main>
  );
};

export default HomePage;
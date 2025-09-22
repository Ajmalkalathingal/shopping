import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { getCategories } from "../services/categoryService";
import { getProductsPage } from "../services/productService";

const CategoryCard = lazy(() => import("../components/CategoryCard"));
const ProductCard = lazy(() => import("../components/ProductCard"));

const PAGE_SIZE = 10;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        setCategoriesLoading(false);
      })
      .catch(console.error);
  }, []);

  // Load products (with pagination + category filter)
  const loadProducts = async (reset = false) => {
    if (loading) return; // Prevent multiple calls at once
    if (!hasMore && !reset) return;

    setLoading(true);

    const { products: newProducts, lastDoc: newLastDoc } =
      await getProductsPage(
        PAGE_SIZE,
        reset ? null : lastDoc, // pass lastDoc for pagination
        selectedCategory 
      );

    if (reset) {
      setProducts(newProducts);
    } else {
      setProducts((prev) => [
        ...prev,
        ...newProducts.filter(
          (p) => !prev.some((existing) => existing.id === p.id) //  prevent duplicates
        ),
      ]);
    }

    setLastDoc(newLastDoc);
    setHasMore(newProducts.length === PAGE_SIZE); 
    setLoading(false);
  };

  // Initial + category change
  useEffect(() => {
    setProducts([])
    setLastDoc(null);
    setHasMore(true);
    loadProducts(true);
  }, [selectedCategory]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadProducts();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
       observer.disconnect();
    };
  }, [loaderRef.current, hasMore, loading, lastDoc]);
  
console.log(products,'pro')


  return (
    <main className="min-h-screen">
      {/* Categories */}
      <div className="w-full bg-white shadow-sm sticky top-[80px] z-40">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center space-x-3 px-3 py-2">
            {categoriesLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-8 bg-gray-200 rounded animate-pulse"
                ></div>
              ))
            ) : (
              <>
                {/* All Products */}
                <Suspense fallback={<div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>}>
                  <CategoryCard
                    name="All"
                    onClick={() => setSelectedCategory(null)}
                  />
                </Suspense>

                {/* Categories */}
                {categories.map((categorie) => (
                  <Suspense
                    key={categorie.id}
                    fallback={<div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>}
                  >
                    <CategoryCard
                      name={categorie.name}
                      onClick={() => setSelectedCategory(categorie.id)}
                    />
                  </Suspense>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {loading && products.length === 0 ? (
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Suspense
              key={product.id}
              fallback={<div className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>}
            >
              <ProductCard product={product} />
            </Suspense>
          ))
        ) : (
          !loading && (
            <div className="col-span-full text-center text-gray-500">
              No products found
            </div>
          )
        )}
      </div>


      {/* Infinite Scroll Sentinel */}
      <div ref={loaderRef} className="h-12 flex justify-center items-center">
        {loading && <span className="text-gray-500">Loading...</span>}
        {!hasMore && !loading && (
          <span className="text-gray-400">No more products</span>
        )}
      </div>
    </main>
  );
};

export default HomePage;

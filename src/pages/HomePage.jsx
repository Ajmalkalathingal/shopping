import { Menu } from "lucide-react";
import { useState } from "react";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";


const HomePage = ()=>{

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return  <>
        <main className="flex min-h-screen">
          <section className="w-full mt-px">
            {/* Toggle Button for Mobile */}
            <div className="md:hidden flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold">Categories</h2>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md border"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            <div className="flex">
              {/* Sidebar (Categories) */}
              <aside
                className={`fixed top-16 left-0 z-40 h-full w-64 bg-white p-4 shadow-md transform transition-transform md:static md:translate-x-0 md:w-1/5 lg:w-1/6 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
              >
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <CategoryCard key={cat.id} name={cat.name} />
                  ))}
                </div>
              </aside>

              {/* Overlay when sidebar open (only mobile) */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Products Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-0 md:ml-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </main>
    </>
}


export default HomePage
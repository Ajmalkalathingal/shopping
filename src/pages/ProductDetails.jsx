import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

const productCache = {};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(productCache[id] || null);
  const [loading, setLoading] = useState(!product);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const dispatch = useAppDispatch();
  

  // Fetch product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      if (productCache[id]) {
        setProduct(productCache[id]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          productCache[id] = data;
          setProduct(data);
        } else {
          toast.error("Product not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Set first image as mainImage when product loads
  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl?.[0] || "");
    }
  }, [product]);

  // Add to Cart
  const handleAddToCart = (() => {

    if (product?.sizes && !selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    if (product?.color && product.color.length > 0 && !selectedColor) {
      toast.error("Please select a color!");
      return;
    }
     // ✅ Unique key 
    const key = `${product.id}-${product.size || "nosize"}-${product.color || "nocolor"}-${product.imageUrl || "noimage"}`;

    const cartItem = {
    key:key,
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: mainImage,
    size: selectedSize ,
    color: selectedColor,
    quantity: 1,
  };

    dispatch(addToCart({ product: cartItem }));
    setSelectedColor('')
    setSelectedSize('')
   

  });

  // Buy Now
const handleBuyNow = () => {
  if (product?.sizes && !selectedSize) {
    toast.error("Please select a size!");
    return;
  }
  if (product?.color && product.color.length > 0 && !selectedColor) {
    toast.error("Please select a color!");
    return;
  }

  const orderItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: mainImage,
    size: selectedSize,
    color: selectedColor,
    quantity: 1,
  };

  navigate("/checkout", { state: { orderItem } });
};


  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card className="shadow-xl rounded-2xl overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-200 h-64 sm:h-80 md:h-96 w-full rounded-lg"></div>
            <CardContent className="flex flex-col gap-4">
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-lg font-medium">Product not found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
          {/* Left: Images */}
          <div className="flex flex-col items-center">
            <LazyLoadImage
              src={mainImage || "/placeholder.png"}
              alt={product.name}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg"
              effect=""
            />

            {/* Thumbnails */}
            {product.imageUrl?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 snap-x snap-mandatory w-full px-2">
                {product.imageUrl.map((img, idx) => (
                  <button
                    key={idx}
                    className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-md border cursor-pointer snap-center overflow-hidden transition-transform ${
                      mainImage === img
                        ? "border-black scale-110 shadow-md"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <CardContent className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description || "No description available"}</p>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              ₹{product.price.toFixed(2)}
            </Badge>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <label className="block font-medium text-gray-900 mb-2">Availabe Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.color?.length > 0 && (
              <div>
                <label className="block font-medium text-gray-900 mb-2">Availabe Colors</label>
                <div className="flex gap-3">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-black scale-110 shadow-md"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart / Buy Now */}
            <div className="flex flex-col gap-3 mt-4">
              <Button size="lg" className="w-full py-4" onClick={handleAddToCart}>
                🛒 Add to Cart
              </Button>
              <Button
                size="lg"
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-xl"
                onClick={handleBuyNow}
              >
                ⚡ Buy Now
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

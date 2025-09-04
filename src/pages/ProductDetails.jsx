import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";

const productCache = {};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(productCache[id] || null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(!product);

  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productCache[id]) {
        setProduct(productCache[id]);
        setLoading(false);
        return;
      }
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() };
        productCache[id] = data;
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!user) {
      toast.error("Please login to add items to cart!");
      return;
    }
    if (product.sizes && !selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    if (product.color && product.color.length > 0 && !selectedColor) {
      toast.error("Please select a color!");
      return;
    }

    const cartItem = {
      ...product,
      size: selectedSize || null,
      color: selectedColor || null,
      quantity: 1,
    };

    dispatch(addToCart({ userId: user.uid, product: cartItem }));
    toast.success(
      `${product.name}${selectedSize ? ` (${selectedSize})` : ""}${
        selectedColor ? ` - ${selectedColor}` : ""
      } added to cart`
    );
  }, [user, product, selectedSize, selectedColor, dispatch]);
  console.log(productCache);
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card className="shadow-xl rounded-2xl overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-200 h-96 w-full rounded-lg"></div>
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

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Image */}
          <div className="flex items-center justify-center bg-gray-50">
            <LazyLoadImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              effect=""
            />
          </div>

          {/* Right: Product Info */}
          <CardContent className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-3">
                {product.description || "No description available"}
              </p>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ${product.price.toFixed(2)}
              </Badge>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block font-medium mb-2">Choose Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-3 py-1 rounded-md border text-sm transition 
            ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "border-gray-300"
            }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {selectedSize}
                  </p>
                )}
              </div>
            )}

            {/* Color */}
            {product.color && product.color.length > 0 && (
              <div>
                <label className="block font-medium mb-2">Choose Color</label>
                <div className="flex gap-2">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 transition 
            ${
              selectedColor === color
                ? "border-black scale-110"
                : "border-gray-300"
            }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {selectedColor}
                  </p>
                )}
              </div>
            )}

            <Button
              size="lg"
              className="mt-4 w-full md:w-auto"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

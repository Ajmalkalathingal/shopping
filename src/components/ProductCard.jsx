import { Button } from "./ui/button";
import { useAppDispatch } from "../app/hooks"; // adjust path
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log(product)
  };

  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      <Button className="mt-2 w-full" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
}

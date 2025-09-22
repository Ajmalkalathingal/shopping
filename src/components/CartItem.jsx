import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react"; 
import { Link } from "react-router-dom";
const CartItem = ({ item, formatter }) => {
  const dispatch = useDispatch();
console.log(item)
  return (
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Link to={`/product/${item.id}`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover border"
          />
          </Link>
          <div>
            <p className="font-semibold text-base sm:text-lg">{item.name}</p>
            <p className="text-gray-600 text-sm sm:text-base">
              {formatter.format(item.price)} x {item.quantity}{" "}
              <span className="font-medium">
                = {formatter.format(item.price * item.quantity)}
              </span>
            </p>
            {/* ✅ Show size if available */}
            {item.size && (
              <p className="text-gray-500 text-sm">Size: {item.size}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(decreaseQuantity(item.key))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-2 font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(increaseQuantity(item.key))}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => dispatch(removeFromCart(item.key))}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
  );
};

export default CartItem;

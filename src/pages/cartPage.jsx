import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import CartItem from "../components/CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Currency formatter for INR
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {cartItems.map((item,index) => (
            <CartItem  key={index} item={item} formatter={formatter} />
          ))}

          {/* Total + Actions */}
          <div className="mt-8 p-6 bg-gray-50 border rounded-xl shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold">
              Total: <span className="text-primary">{formatter.format(totalPrice)}</span>
            </h3>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
              <Button className="w-full sm:flex-1" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

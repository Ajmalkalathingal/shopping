import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import CartItem from "../components/CartItem";
import axios from "axios";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems)

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

    try {
      const url = "https://graph.facebook.com/v22.0/834761243044128/messages";
      const token =
        "EAAPhrkZBVBFYBPUewaBKETQwehM8Kqj5DT0l2wC4u6uV91gTDxUzf1nRvCAwC9m7oD2GpLyetpOD8MAGuxHpCEOP69FEcHdZA6MfO5wwBK4KC1GRoElO7ycFhPxEobFncuop1yAsqJ9nHYmOrdH3bjzLHZA32PRcMyw95treYhCZBOriK1UDcdaXx7hsdNewxdeu9bf36lhyxvC4FQUYJZAsMLssnnOUgJkMzJw97A08LF5kRlE57oxbSa1VuNQZDZD";

      const recipient = "919061552443"; // Replace with your verified number

      // Build cart message dynamically
      const message = `🛒 New order from Ajmal\n\n${cartItems
        .map(
          (item) =>
            `• ${item.name} (${item.quantity} × ₹${item.price}) = ₹${
              item.price * item.quantity
            }`
        )
        .join("\n")}\n\n💵 Total: ₹${totalPrice}\n📍 Address: Kochi, Kerala`;

      const payload = {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
          name: "hello_world", // Must exist in your WhatsApp templates
          language: { code: "en_US" },
        },
      };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("WhatsApp API response:", response.data);
      alert("✅ Order sent to WhatsApp!");
      dispatch(clearCart()); // Clear cart after checkout
    } catch (err) {
      console.error("Error sending WhatsApp message:", err.response?.data || err.message);
      alert("❌ Failed to send WhatsApp message");
    }
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
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} formatter={formatter} />
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

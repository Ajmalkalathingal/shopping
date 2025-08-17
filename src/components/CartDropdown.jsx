import { useAppSelector, useAppDispatch } from "../app/hooks"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { removeFromCart } from "../features/cart/cartSlice"

export default function CartDropdown() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="absolute right-0 mt-6 w-80 bg-white border shadow-lg rounded-lg z-50 p-4">
      <h4 className="font-semibold mb-3">Cart Items ({cartCount})</h4>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <img src={`/images/${item.image}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">${item.price} x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <Button className="mt-3 w-full">Go to Checkout</Button>
      )}
    </div>
  )
}

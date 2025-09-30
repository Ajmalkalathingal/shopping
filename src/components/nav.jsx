import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Home, Phone, Menu, X, ShoppingCart, Shield } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await logout();
    dispatch(clearCart());
    navigate("/user-auth", { replace: true });
    setLoggingOut(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-l font-bold text-primary">TRENDIFY INTERNATIONAL</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="flex items-center gap-2 px-3 py-2 hover:text-primary transition-colors"
                >
                  <Link to="/"><Home size={18} /> Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="flex items-center gap-2 px-3 py-2 hover:text-primary transition-colors"
                >
                  <Link to="/contact"><Phone size={18} /> Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Admin Link */}
              {user && isAdmin && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="flex items-center gap-2 px-3 py-2 text-red-600 font-medium hover:text-red-700 transition-colors"
                  >
                    <Link to="/admin"><Shield size={18} /> Admin</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          {!user ? (
            <>
              <Link to="/user-auth?tab=login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/user-auth?tab=signup">
                <Button size="sm">Signup</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <span className="flex items-center gap-1 text-sm text-red-600 font-medium">
                  <Shield size={16} /> Admin
                </span>
              )}
              <Button size="sm" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 relative">
          {/* Cart */}
          <Link to="/cart" className="hover:underline">
            <div className="relative">
              <ShoppingCart size={22} className="hover:text-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <div className="flex flex-col p-4 gap-3">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
              <Home size={18} /> Home
            </Link>
            <Link to="/contact" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
              <Phone size={18} /> Contact
            </Link>
            {user && isAdmin && (
              <Link to="/admin" className="flex items-center gap-2 p-2 text-red-600 hover:bg-accent rounded-md">
                <Shield size={18} /> Admin
              </Link>
            )}

            {!user ? (
              <div className="flex items-center gap-2 mt-3">
                <Link to="/user-auth?tab=login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/user-auth?tab=signup">
                  <Button size="sm">Signup</Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                className="mt-3"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

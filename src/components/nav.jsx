import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Home, Phone, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();

  // 👇 check if user is logged in (from localStorage)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user session
    navigate("/user-auth"); // redirect to login
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">MyBrand</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 hover:text-primary transition-colors"
                >
                  <Home size={18} />
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className="flex items-center gap-2 px-3 py-2 hover:text-primary transition-colors"
                >
                  <Phone size={18} />
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons (conditionally rendered) */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          {!user ? (
            <>
              <Link to="/user-auth?tab=login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/user-auth?tab=signup">
                <Button size="sm">Signup</Button>
              </Link>
            </>
          ) : (
            <Button   size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 relative">
          {/* Cart */}
          <Link to="/cart" className="hover:underline">
            <div className="relative">
              <button className="relative">
                <ShoppingCart
                  size={22}
                  className="hover:text-primary transition"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
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

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <div className="flex flex-col p-4 gap-3">
            <a
              href="/"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
            >
              <Home size={18} /> Home
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
            >
              <Phone size={18} /> Contact
            </a>

            {/* Auth Buttons Mobile */}
            {!user ? (
              <div className="flex items-center gap-2 mt-3">
                <Link to="/user-auth">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/user-auth">
                  <Button size="sm">Signup</Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                className="mt-3"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

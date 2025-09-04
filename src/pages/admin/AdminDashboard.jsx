// src/pages/AdminDashboard.jsx
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  Folder,
  FolderPlus,
  Users,
  Menu
} from "lucide-react"

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Category List", icon: Folder, path: "/admin/categories" },
    { label: "Create Category", icon: FolderPlus, path: "/admin/create-category" },
    { label: "Product List", icon: Package, path: "/admin/products" },
    { label: "Create Product", icon: PackagePlus, path: "/admin/create-product" },
    { label: "Users", icon: Users, path: "/admin/users" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white shadow-md transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h1 className="text-lg font-bold">Admin</h1>}
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors",
                collapsed && "justify-center"
              )}
            >
              <Icon size={20} />
              {!collapsed && label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

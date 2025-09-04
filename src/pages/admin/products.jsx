import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "react-hot-toast"
import { Pencil, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products
      const prodSnap = await getDocs(collection(db, "products"))
      const items = prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // Fetch categories
      const catSnap = await getDocs(collection(db, "categories"))
      const cats = {}
      catSnap.docs.forEach((doc) => {
        cats[doc.id] = doc.data().name
      })

      setProducts(items)
      setCategories(cats)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id))
      setProducts(products.filter((p) => p.id !== id))
      toast.success("Product deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              {/* Map categoryId to category name */}
              <TableCell>
                {categories[product.categoryId] || "N/A"}
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                >
                  <Pencil size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash size={16} className="mr-1" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// src/pages/admin/CategoryList.jsx
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

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"))
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setCategories(items)
    }
    fetchCategories()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id))
      setCategories(categories.filter((c) => c.id !== id))
      toast.success("Category deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete category")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/edit-category/${category.id}`)}
                >
                  <Pencil size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
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

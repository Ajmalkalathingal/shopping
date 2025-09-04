import { useEffect, useState } from "react"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export default function CreateProduct() {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [sizes, setSizes] = useState("")
  const [colors, setColors] = useState("")

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, "categories"))
      setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetchCategories()
  }, [])

  const handleCreate = async () => {
    if (!name || !price || !categoryId || !imageUrl) {
      toast.error("⚠️ Please fill all required fields")
      return
    }

    const selectedCategory = categories.find((c) => c.id === categoryId)

    await addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      imageUrl,
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name, 
      sizes: sizes.split(",").map((s) => s.trim()), 
      color: colors.split(",").map((c) => c.trim()), 
      createdAt: new Date(),
    })

    toast.success("✅ Product created successfully!")

    // Reset form
    setName("")
    setPrice("")
    setImageUrl("")
    setSizes("")
    setColors("")
    setCategoryId("")
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create Product</h2>

      <Input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Input
        placeholder="Sizes (comma separated, e.g. S, M, L)"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
      />

      <Input
        placeholder="Colors (comma separated, e.g. Red, Blue, Green)"
        value={colors}
        onChange={(e) => setColors(e.target.value)}
      />

      {/* Category Select */}
      <Select onValueChange={setCategoryId} value={categoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleCreate}>💾 Save Product</Button>
    </div>
  )
}

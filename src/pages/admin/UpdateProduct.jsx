import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function UpdateProduct() {
  const { id } = useParams(); // product id from route
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, "categories"));
      setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchCategories();
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setPrice(data.price || "");
        setCategoryId(data.categoryId || "");
        setImage(data.image || "");
        setSize(data.size || "");
        setColor(data.color || "");
      } else {
        toast.error("Product not found!");
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!name || !price || !categoryId) {
      toast.error("Please fill all fields");
      return;
    }

    const selectedCategory = categories.find((c) => c.id === categoryId);

    const ref = doc(db, "products", id);
    await updateDoc(ref, {
      name,
      price: parseFloat(price),
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      image,
      size,
      color,
      updatedAt: new Date(),
    });

    toast.success("✅ Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Update Product</h2>

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
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Input
        placeholder="Size (e.g. M, L, XL)"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <Input
        placeholder="Color (e.g. Red, Blue)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

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

      <Button onClick={handleUpdate}>Update Product</Button>
    </div>
  );
}

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
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([""]);

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
        console.log(data)
        setName(data.name || "");
        setPrice(data.price || "");
        setCategoryId(data.categoryId || "");
        setImages(Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl || ""]);
        setSizes(Array.isArray(data.sizes) ? data.sizes : [data.sizes || ""]);
        setColors(Array.isArray(data.color) ? data.color : [data.color || ""]);

      } else {
        toast.error("Product not found!");
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Handlers for dynamic fields
  const handleChange = (setter, arr, index, value) => {
    const copy = [...arr];
    copy[index] = value;
    setter(copy);
  };

  const handleAddField = (setter, arr) => setter([...arr, ""]);
  const handleRemoveField = (setter, arr, index) =>
    setter(arr.filter((_, i) => i !== index));

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
      imageUrl: images.map((i) => i.trim()).filter((i) => i !== ""),
      sizes: sizes
        .flatMap((s) =>
          s.split(",").map((x) => x.trim()) 
        ),
      color: colors
        .flatMap((c) =>
          c.split(",").map((x) => x.trim()) 
        ),
      updatedAt: new Date(),
    });


    toast.success("✅ Product updated successfully!");
    navigate("/admin/products");
  };
  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Update Product</h2>

      {/* Product Name */}
      <Input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Price */}
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Dynamic Images with Preview */}
      <div className="space-y-2">
        <label className="font-medium">Product Images</label>
        {images.map((img, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            {/* Image Input */}
            <Input
              placeholder={`Image URL ${idx + 1}`}
              value={img}
              onChange={(e) => handleChange(setImages, images, idx, e.target.value)}
            />

            {/* Preview (only if valid URL) */}
            {img && (
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border"
                onError={(e) => (e.currentTarget.style.display = "none")} // hide if broken
              />
            )}

            {/* Remove button */}
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveField(setImages, images, idx)}
            >
              ❌
            </Button>
          </div>
        ))}

        {/* Add New Field */}
        <Button type="button" onClick={() => handleAddField(setImages, images)}>
          ➕ Add Image
        </Button>
      </div>


      {/* Dynamic Sizes */}
      <div className="space-y-2">
        <label className="font-medium">Sizes</label>
        {sizes.map((s, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder={`Size ${idx + 1}`}
              value={s}
              onChange={(e) => handleChange(setSizes, sizes, idx, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveField(setSizes, sizes, idx)}
            >
              ❌
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddField(setSizes, sizes)}>
          ➕ Add Size
        </Button>
      </div>

      {/* Dynamic Colors */}
      <div className="space-y-2">
        <label className="font-medium">Colors</label>
        {colors.map((c, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder={`Color ${idx + 1}`}
              value={c}
              onChange={(e) => handleChange(setColors, colors, idx, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveField(setColors, colors, idx)}
            >
              ❌
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddField(setColors, colors)}>
          ➕ Add Color
        </Button>
      </div>

      {/* Category */}
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

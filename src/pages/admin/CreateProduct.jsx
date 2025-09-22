// import { useEffect, useState } from "react";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { toast } from "react-hot-toast";

// export default function CreateProduct() {
//   const [categories, setCategories] = useState([]);
//   const [categoryId, setCategoryId] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([""]); // <-- array of image URLs
//   const [sizes, setSizes] = useState("");
//   const [colors, setColors] = useState("");

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const snap = await getDocs(collection(db, "categories"));
//       setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };
//     fetchCategories();
//   }, []);

//   const handleCreate = async () => {
//     if (!name || !price || !categoryId || images.length === 0 || images.some((url) => !url)) {
//       toast.error("⚠️ Please fill all required fields and add at least one image");
//       return;
//     }

//     const selectedCategory = categories.find((c) => c.id === categoryId);

//     await addDoc(collection(db, "products"), {
//       name,
//       price: parseFloat(price),
//       imageUrl: images, // <-- already an array
//       categoryId: selectedCategory.id,
//       categoryName: selectedCategory.name,
//       sizes: sizes.split(",").map((s) => s.trim()),
//       color: colors.split(",").map((c) => c.trim()),
//       createdAt: new Date(),
//     });

//     toast.success("✅ Product created successfully!");

//     // Reset form
//     setName("");
//     setPrice("");
//     setImages([""]);
//     setSizes("");
//     setColors("");
//     setCategoryId("");
//   };

//   // Handle changing individual image URLs
//   const updateImage = (index, value) => {
//     const newImages = [...images];
//     newImages[index] = value;
//     setImages(newImages);
//   };

//   // Add a new image input field
//   const addImageField = () => setImages([...images, ""]);

//   // Remove an image input field
//   const removeImageField = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages.length > 0 ? newImages : [""]); // keep at least one
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Create Product</h2>

//       <Input
//         placeholder="Product name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <Input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />

//       {/* Dynamic Image Inputs */}
//       <div className="space-y-2">
//         <label className="font-medium">Product Images</label>
//         {images.map((img, idx) => (
//           <div key={idx} className="flex gap-2">
//             <Input
//               placeholder={`Image URL ${idx + 1}`}
//               value={img}
//               onChange={(e) => updateImage(idx, e.target.value)}
//             />
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={() => removeImageField(idx)}
//             >
//               ❌
//             </Button>
//           </div>
//         ))}
//         <Button type="button" onClick={addImageField}>
//           ➕ Add Image
//         </Button>
//       </div>

//       <Input
//         placeholder="Sizes (comma separated, e.g. S, M, L)"
//         value={sizes}
//         onChange={(e) => setSizes(e.target.value)}
//       />

//       <Input
//         placeholder="Colors (comma separated, e.g. Red, Blue, Green)"
//         value={colors}
//         onChange={(e) => setColors(e.target.value)}
//       />

//       {/* Category Select */}
//       <Select onValueChange={setCategoryId} value={categoryId}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select category" />
//         </SelectTrigger>
//         <SelectContent>
//           {categories.map((cat) => (
//             <SelectItem key={cat.id} value={cat.id}>
//               {cat.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Button onClick={handleCreate}>💾 Save Product</Button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
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

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([""]); // <-- array of image URLs
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, "categories"));
      setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name || !price || !categoryId || images.length === 0 || images.some((url) => !url)) {
      toast.error("⚠️ Please fill all required fields and add at least one image");
      return;
    }

    const selectedCategory = categories.find((c) => c.id === categoryId);

    await addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      imageUrl: images, // <-- already an array
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      sizes: sizes.split(",").map((s) => s.trim()),
      color: colors.split(",").map((c) => c.trim()),
      createdAt: new Date(),
    });

    toast.success("✅ Product created successfully!");

    // Reset form
    setName("");
    setPrice("");
    setImages([""]);
    setSizes("");
    setColors("");
    setCategoryId("");
  };

  // Handle changing individual image URLs
  const updateImage = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  // Add a new image input field
  const addImageField = () => setImages([...images, ""]);

  // Remove an image input field
  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : [""]); // keep at least one
  };

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

      {/* Dynamic Image Inputs */}
      <div className="space-y-2">
        <label className="font-medium">Product Images</label>
        {images.map((img, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder={`Image URL ${idx + 1}`}
              value={img}
              onChange={(e) => updateImage(idx, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeImageField(idx)}
            >
              ❌
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addImageField}>
          ➕ Add Image
        </Button>
      </div>

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
  );
}

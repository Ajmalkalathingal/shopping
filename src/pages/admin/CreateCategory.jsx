import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function CreateCategory() {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    await addDoc(collection(db, "categories"), {
      name,
      slug,
      createdAt: new Date(),
    });

    toast.success("✅ Category created successfully!");
    setName("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create Category</h2>

      <Input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={handleCreate}>Save Category</Button>
    </div>
  );
}

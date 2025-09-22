import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import { db } from "../firebase";

// Fetch products with optional category filter + pagination
export const getProductsPage = async (pageSize = 10, lastDoc = null, categoryId = null) => {
  const constraints = [];

  // category filter
  if (categoryId) {
    constraints.push(where("categoryId", "==", categoryId));
  }

  // order + pagination
  constraints.push(orderBy("createdAt", "desc"));
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }
  constraints.push(limit(pageSize));

  const q = query(collection(db, "products"), ...constraints);

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    products,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
};

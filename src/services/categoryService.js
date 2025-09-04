import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getCategories() {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

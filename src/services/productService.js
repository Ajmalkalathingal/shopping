import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Assign "admin" role to a user
async function setAdminRole(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`✅ User ${uid} is now an admin`);
}

// Example usage:
setAdminRole("cothqkfLKrRZrqTHs3zUShiXNVn2");

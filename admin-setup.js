
import 'dotenv/config';
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Assign admin role using UID from .env
async function setAdminRole() {
  const uid = process.env.ADMIN_UID;
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`✅ User ${uid} is now an admin`);
}

setAdminRole();

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAIhAaI1y-2PrncpN8Y7pI1zEbxFrcdiUw",
  authDomain: "triviaq-577e2.firebaseapp.com",
  projectId: "triviaq-577e2",
  storageBucket: "triviaq-577e2.appspot.com",
  messagingSenderId: "850033392138",
  appId: "1:850033392138:web:3f806b692638191cedfdf3",
  measurementId: "G-4T8Y6LL2EE",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
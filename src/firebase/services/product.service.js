import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const categoryListService = async () => {
    const q = query(
        collection(db, "productCategory")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const productsByCategoryIdService = async (categoryId) => {
    const q = query(
        collection(db, "storeProducts"), where("categoryId", "==", categoryId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const productsService = async () => {
    const q = query(
        collection(db, "storeProducts")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const deleteRecordFromFirebaseService = async (doc) => {
    await deleteDoc(doc);
}
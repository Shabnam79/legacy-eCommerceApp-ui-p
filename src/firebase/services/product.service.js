import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const getCategoryService = async () => {
    const q = query(
        collection(db, "productCategory")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductsByCategoryIdService = async (categoryId) => {
    const q = query(
        collection(db, "storeProducts"), where("categoryId", "==", categoryId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductsService = async () => {
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
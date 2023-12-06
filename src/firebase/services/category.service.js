import { collection, deleteDoc, doc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";


export const saveCategoryIntoProductCategoryService = async (Category) => {
    return await addDoc(collection(db, "productCategory"), {
        ...Category
    });
}

export const updateCategoryIntoProductCategoryService = async (Category, categoryId, userId) => {
    const categoryDoc = doc(db, "productCategory", categoryId);
    await updateDoc(categoryDoc, {
        Category: Category,
        userId:userId
    });
}

export const getCategoryServiceByUserId = async (userId) => {
    const q = query(
        collection(db, "productCategory"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getCategoryByIdService = async (categoryId) => {
    return doc(db, "productCategory", categoryId);
}

export const deleteRecordFromFirebaseService = async (doc) => {
    await deleteDoc(doc);
}

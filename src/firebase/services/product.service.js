import { collection, doc,deleteDoc, getDocs, query, where, addDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";

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
export const getProductsServiceByUserId = async () => {
    const q = query(
        collection(db, "storeProducts")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductByProductIdService = async (productId) => {
    const q = query(
        collection(db, "storeProducts"), where("productId", "==", productId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const saveProductIntoStoreProductService = async (product) => {
    return await addDoc(collection(db, "storeProducts"), {
        ...product
    });
}
export const getProductByIdService = async (productId) => {
    return doc(db, "storeProducts", productId);
}

export const saveUpdateProductStore = async (addToProductObj) => {
    try {
        // Define the collection and document data
        const myCollection = collection(db, 'storeProducts');

        // Define the document reference
        const myDocRef = doc(myCollection, addToProductObj.id);

        // Add or update the document
        await setDoc(myDocRef, addToProductObj);
    }
    catch (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    }

    // return await addDoc(collection(db, "productReview"), {
    //     ...productReview
    // });
}
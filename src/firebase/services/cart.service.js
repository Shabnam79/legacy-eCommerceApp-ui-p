import { addDoc, collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";

export const addToCartService = async (userId) => {
    const q = query(
        collection(db, "addToCartStore"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const addProductIntoCartService = async (product) => {
    return await addDoc(collection(db, "addToCartStore"), {
        product
    });
}

export const productByIdService = async (productId) => {
    return doc(db, "addToCartStore", productId);
}

export const incrementProductIntoCartService = async (product, counts) => {
    await updateDoc(product, {
        count: counts + 1
    });
}

export const decrementProductIntoCartService = async (product, counts) => {
    await updateDoc(product, {
        count: counts - 1
    });
}

export const placeProductOrderService = async (cartArray) => {
    const collectionRef = collection(db, "productOrders");
    const batch = writeBatch(db);

    cartArray.forEach((data) => {
        const docref = doc(collectionRef);
        batch.set(docref, data);
    });

    batch
        .commit()
        .then(() => {
            console.log("batch write operation completed");
            toast.success(`order placed successfully`, {
                autoClose: 1000,
            });
            // clearCart();
        })
        .catch((error) => {
            console.error("batch write operation failed: ", error);
            toast.error(`${error}`, {
                autoClose: 1000,
            });
        });
}

export const OrderService = async (userId) => {
    const q = query(
        collection(db, "productOrders"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}
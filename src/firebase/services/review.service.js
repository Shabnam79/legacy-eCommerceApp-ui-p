import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const saveProductReview = async (productReview) => {
    return await addDoc(collection(db, "productReview"), {
        ...productReview
    });
}

export const getProductReviewByOrderIdService = async (orderId) => {
    const q = query(
        collection(db, "productReview"), where("orderId", "==", orderId)
    )

    const querysnapshot = await getDocs(q);
    return querysnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));

    // const data = doc(db, "productReview", "VvtZtiloQD8Snv7fCcV4");
    // const data1 = await getDoc(data);
    // console.log(data1.exists());
    // const data2 = data1.exists() ? data1.data() : null
    // console.log(data2);
}


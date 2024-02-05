import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

export const getProductReviewsService = async (orderId) => {
    const q = query(
        collection(db, "productReview")
    )

    const querysnapshot = await getDocs(q);
    return querysnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
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

export const getProductReviewByProductIdService = async (productId) => {
    return await axios.get(variables.API_URL + 'Product/GetAllProductReviewsById',{ params: { "productId": productId } })
    .then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        console.log(error.data);
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
    // const q = query(
    //     collection(db, "productReview"), where("productId", "==", productId)
    // )

    // const querysnapshot = await getDocs(q);
    // return querysnapshot.docs
    //     .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const saveProductReview = async (productReview) => {
    try {
        // Define the collection and document data
        const myCollection = collection(db, 'productReview');

        // Define the document reference
        const myDocRef = doc(myCollection, productReview.orderId);

        // Add or update the document
        await setDoc(myDocRef, productReview);
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

export const updateProductReview = async (productReviewDoc, productReview) => {
    await updateDoc(productReviewDoc, {
        ...productReview
    });
}

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

// export const getProductReviewByOrderIdService = async (orderId) => {
//     const q = query(
//         collection(db, "productReview"), where("orderId", "==", orderId)
//     )

//     const querysnapshot = await getDocs(q);
//     return querysnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getProductReviewByOrderIdService = async (orderId) => {
    return await axios.get(variables.API_URL + 'Product/GetProductReviewByOrderId', { params: { "orderId": orderId } }).then((response) => {
        console.log(response.data);
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const getProductReviewByProductIdService = async (productId) => {
    const q = query(
        collection(db, "productReview"), where("productId", "==", productId)
    )

    const querysnapshot = await getDocs(q);
    return querysnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

// export const saveProductReview = async (productReview) => {
//     try {
//         // Define the collection and document data
//         const myCollection = collection(db, 'productReview');

//         // Define the document reference
//         const myDocRef = doc(myCollection, productReview.orderId);

//         // Add or update the document
//         await setDoc(myDocRef, productReview);
//     }
//     catch (error) {
//         toast.error(error.message, {
//             autoClose: 1000,
//         });
//     }
// }

export const saveProductReview = async (productReview, image) => {
    debugger
    const formData = new FormData();
    if (image != undefined)
    {
      formData.append('image',image);
    }
    
    Object.keys(productReview).forEach((key) => 
    {       
      formData.append(key, productReview[key]);     
    });
     await axios({
        method: 'post',
        url: variables.API_URL + 'Product/AddProductReview',
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data' 
          }
        })
    .then(function(response) {
        
    }).catch(function (error){
      
        console.log(error.code);
        
    });
}

// export const updateProductReview = async (productReviewDoc, productReview) => {
//     await updateDoc(productReviewDoc, {
//         ...productReview
//     });
// }

export const updateProductReview = async (productReviewDoc, image) => {
    debugger
    const formData = new FormData();
    if (image != undefined)
    {
      formData.append('image',image);
    }
    
    Object.keys(productReviewDoc).forEach((key) => 
    {       
      formData.append(key, productReviewDoc[key]);     
    });
     await axios({
        method: 'put',
        url: variables.API_URL + 'Product/UpdateProductReview',
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data' 
          }
        })
    .then(function(response) {
        
    }).catch(function (error){
      
        console.log(error.code);
        
    });
}

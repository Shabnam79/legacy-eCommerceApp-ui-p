import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';

// export const saveProductToWishlistService = async (product) => {
//     return await addDoc(collection(db, "storeWishlist"), {
//         ...product
//     });
// }

export const saveProductToWishlistService = async (product) => {
    axios({
        method: 'post',
        url: variables.API_URL + 'Product/AddProductToWishList',
        data: {...product }, 

    }).then(function(response) {
        //console.log(response);
    
    }).catch(function (error){
        //console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
            
        }
    });
}

export const DeleteProductFromWishList = async (doc) => {
    await axios.delete(variables.API_URL + 'Product/DeleteProductFromWishList', { params: { "id": doc.id } }).then((response) => {
       // return response.data;
     }).catch(error => {
       console.log(error);
     });
}

export const getWishlistService = async (userId) => {
    const q = query(
        collection(db, "storeWishlist"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getWishlistByIdService = async (productId) => {
    return doc(db, "storeWishlist", productId);
}

export const getWishlistByUserIdService = async (userId) => {
    const q = query(
        collection(db, "storeWishlist"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';

// export const getCartProductsService = async (userId) => {
//     const q = query(
//         collection(db, "addToCartStore"), where("userId", "==", userId)
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getCartProductsService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/GetYourCart', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}



// export const saveProductIntoCartService = async (product) => {
//     return await addDoc(collection(db, "addToCartStore"), {
//         ...product
//     });
// }

export const saveProductIntoCartService = async (product) => {
    axios({
        method: 'post',
        url: variables.API_URL + 'Product/AddToCart',
        data: {...product }, 

    }).then(function(response) {
        //console.log(response);
    
    }).catch(function (error){
        //console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
            
        }
    });
}

export const getProductByIdService = async (productId) => {
    return doc(db, "addToCartStore", productId);
}

export const incrementCartProductsService = async (product, counts) => {
    await updateDoc(product, {
        count: counts + 1
    });
}

export const decrementCartProductsService = async (product, counts) => {
    await updateDoc(product, {
        count: counts - 1
    });
}

export const getCartProductByProductIdService = async (productId) => {
    const q = query(
        collection(db, "addToCartStore"), where("productId", "==", productId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

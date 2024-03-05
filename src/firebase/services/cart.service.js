import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const getCartProductsService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/GetYourCart', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const DeleteItemFromYourCart = async (id) => {
    await axios.delete(variables.API_URL + 'Product/DeleteItemFromYourCart', { params: { "id": id } }).then((response) => {
        toast.success(response.message, {
            autoClose: 1000,
          });
     }).catch(error => {
        toast.error(error.message, {
            autoClose: 1000,
          });
     });
}

export const saveProductIntoCartService = async (product) => {
    axios({
        method: 'post',
        url: variables.API_URL + 'Product/AddToCart',
        data: {...product }, 

    }).then(function(response) {
        toast.success(response.message, {
            autoClose: 1000,
          });
    }).catch(function (error){
        toast.error(error.message, {
            autoClose: 1000,
          });
    });
}

export const getProductByIdService = async (productId) => {
    return doc(db, "addToCartStore", productId);
}

export const incrementCartProductsService = async (counts) => {    
    return await counts + 1; 
}

export const UpdateItemQuantity = async (id, counts) => {
    return await axios.put(variables.API_URL + `Product/UpdateItemQuantity?id=${id}&count=${counts}`).then((response) => {

      }).catch(error => {
        console.log(error);
      });
}

export const decrementCartProductsService = async (counts) => {
    return await counts - 1; 
}

export const getCartProductByProductIdService = async (productId) => {
    const q = query(
        collection(db, "addToCartStore"), where("productId", "==", productId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

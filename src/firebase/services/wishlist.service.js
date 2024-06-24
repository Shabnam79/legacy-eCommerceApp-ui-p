import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const saveProductToWishlistService = async (product) => {
  axios({
    method: 'post',
    url: variables.API_URL_NEW + 'Product/AddProductToWishlist',
    data: { ...product },

  }).then(function (response) {
    toast.success(response.message, {
      autoClose: 1000,
    });
  }).catch(function (error) {
    toast.error(error.message, {
      autoClose: 1000,
    });
  });
}

export const DeleteProductFromWishList = async (id) => {
    await axios.delete(variables.API_URL_NEW + 'Product/RemoveProductWishlist', { params: { "id": id } }).then((response) => {
     }).catch(error => {
       console.log(error);
     });
}

export const getWishlistService = async (userId) => {
    return await axios.get(variables.API_URL_NEW + 'Product/YourWishList', { params: { "UserId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

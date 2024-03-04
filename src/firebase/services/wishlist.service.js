import { variables } from "../../utils/variables";
import axios from 'axios';
<<<<<<< HEAD

=======
import { toast } from "react-toastify";
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab

export const saveProductToWishlistService = async (product) => {
  axios({
    method: 'post',
    url: variables.API_URL + 'Product/AddProductToWishList',
    data: { ...product },

<<<<<<< HEAD
    }).then(function(response) {
    
    }).catch(function (error){
        if (error.code === "ERR_BAD_REQUEST") {
            
        }
=======
  }).then(function (response) {
    toast.success(response.message, {
      autoClose: 1000,
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
    });
  }).catch(function (error) {
    toast.error(error.message, {
      autoClose: 1000,
    });
  });
}

export const DeleteProductFromWishList = async (id) => {
<<<<<<< HEAD
    await axios.delete(variables.API_URL + 'Product/DeleteProductFromWishList', { params: { "id": id } }).then((response) => {
     }).catch(error => {
       console.log(error);
     });
}

export const getWishlistService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/YourWishList', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}
=======
  await axios.delete(variables.API_URL + 'Product/DeleteProductFromWishList', { params: { "id": id } }).then((response) => {
    toast.success(response.message, {
      autoClose: 1000,
    });
  }).catch(error => {
    toast.error(error.message, {
      autoClose: 1000,
    });
  });
}

export const getWishlistService = async (userId) => {
  return await axios.get(variables.API_URL + 'Product/YourWishList', { params: { "userId": userId } }).then((response) => {
    return response.data;
  }).catch(error => {
    toast.error(error.message, {
      autoClose: 1000,
    });
  });
}
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab

import { variables } from "../../utils/variables";
import axios from 'axios';


export const saveProductToWishlistService = async (product) => {
    axios({
        method: 'post',
        url: variables.API_URL + 'Product/AddProductToWishList',
        data: {...product }, 

    }).then(function(response) {
    
    }).catch(function (error){
        if (error.code === "ERR_BAD_REQUEST") {
            
        }
    });
}

export const DeleteProductFromWishList = async (id) => {
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

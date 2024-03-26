import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

export const saveCartOrderService = async (cartArray) => {
        let payload = {
            productOrders: cartArray
          };
        return await axios({
            method: 'post',
            url: variables.API_URL + 'Product/PlaceOrder',
            data: payload , 
    
        }).then(function(response) {
            toast.success(`order placed successfully`, {
                                autoClose: 1000,
                            });
        
        }).catch(function (error){
            if (error.code === "ERR_BAD_REQUEST") {
                
            }
        });   
}

export const getOrderService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/YourOrders', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}
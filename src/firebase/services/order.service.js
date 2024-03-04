import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

export const saveCartOrderService = async (cartArray) => {
<<<<<<< HEAD
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
            //console.log(error.code);
            if (error.code === "ERR_BAD_REQUEST") {
                
            }
        });   
=======
    let payload = {
        productOrders: cartArray
    };
    return await axios({
        method: 'post',
        url: variables.API_URL + 'Product/PlaceOrder',
        data: payload,

    }).then(function (response) {
        toast.success(response.message, {
            autoClose: 1000,
        });
    }).catch(function (error) {
        if (error.code === "ERR_BAD_REQUEST") {
            toast.error(error.message, {
                autoClose: 1000,
            });
        }
    });
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
}

export const getOrderService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/YourOrders', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}
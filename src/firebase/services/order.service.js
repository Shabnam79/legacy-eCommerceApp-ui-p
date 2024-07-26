import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

export const saveCartOrderService = async (cartArray) => {
    return await axios({
        method: 'post',
        url: variables.API_URL_NEW + 'Product/PlaceOrder',
        data: cartArray,

    }).then(function (response) {
        toast.success(`Your order has been successfully placed!`, {
            autoClose: 1000,
        });

    }).catch(function (error) {
        if (error.code === "ERR_BAD_REQUEST") {

        }
    });
}

export const getOrderService = async (userId) => {
    return await axios.get(variables.API_URL_NEW + 'Product/GetYourOrder', { params: { "UserId": userId } }).then((response) => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
}
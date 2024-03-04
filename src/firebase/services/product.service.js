import { doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';

export const getCategoryService = async () => {
    return await axios.get(variables.API_URL + 'Category/GetProductsCategory').then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const getProductsByCategoryIdService = async (categoryId) => {
    return await axios.get(variables.API_URL + 'Product/GetProductsByCategoryId', { params: { "categoryId": categoryId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const getProductsService = async () => {
    return await axios.get(variables.API_URL + 'Product/StoreProducts').then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const DeleteItemFromProduct = async (id) => {
    await axios.delete(variables.API_URL + 'Admin/DeleteProduct', { params: { "itemId": id } }).then((response) => {
     }).catch(error => {
       console.log(error);
     });
}

export const getProductByProductIdService = async (productId) => {
    return await axios.get(variables.API_URL + 'Product/GetProductDetailbyId', { params: { "productId": productId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

export const saveProductIntoStoreProductService = async (product, image) => {
    const formData = new FormData();
    formData.append('image',image);

    Object.keys(product).forEach((key) => 
    {       
      formData.append(key, product[key]);     
    });
     await axios({
        method: 'post',
        url: variables.API_URL + 'Admin/AddProduct',
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

export const getProductByIdService = async (productId) => {
    return doc(db, "storeProducts", productId);
}

export const saveUpdateProductStore = async (product, image) => {
    const formData = new FormData();
    if (image != undefined)
    {
      formData.append('image',image);
    }

    Object.keys(product).forEach((key) => 
    {       
      formData.append(key, product[key]);    
    });
     await axios({
        method: 'put',
        url: variables.API_URL + 'Admin/UpdateProduct',
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
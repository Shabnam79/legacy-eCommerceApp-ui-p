import { doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const getCategoryService = async () => {
  return await axios.get(variables.API_URL_NEW + 'Admin/GetAllCategory').then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error.message);
  });
}

export const getProductsByCategoryIdService = async (categoryId) => {
  return await axios.get(variables.API_URL + 'Product/GetProductsByCategoryId', { params: { "categoryId": categoryId } }).then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error.message);
  });
}

export const getProductsService = async (pageNumber,productsPerPage,searchQuery) => {
  // return await axios.get(variables.API_URL + 'Product/StoreProducts').then((response) => {
  return await axios.get(variables.API_URL_NEW + 'Admin/ProductList', { params: { "pageNumber": pageNumber ,"pageSize": productsPerPage , "searchKeyword": searchQuery }  }).then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error.message);
  });
}

export const DeleteItemFromProduct = async (id) => {
  await axios.delete(variables.API_URL_NEW + 'Admin/DeleteProduct', { params: { "id": id } }).then((response) => {
  }).catch(error => {
    console.log(error);
  });
}

export const getProductByProductIdService = async (id) => {
  return await axios.get(variables.API_URL_NEW + 'Admin/GetByProductId', { params: { "id": id } }).then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error.message);
  });
}

export const saveProductIntoStoreProductService = async (product, image) => {
  const formData = new FormData();
  formData.append('pictures', image);

  Object.keys(product).forEach((key) => {
    formData.append(key, product[key]);
  });
  await axios({
    method: 'post',
    url: variables.API_URL_NEW + 'Admin/AddProduct',
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(function (response) {
      toast.success(response.message, {
        autoClose: 1000,
      });
    }).catch(function (error) {
      console.error(error.message);
    });
}

export const getProductByIdService = async (productId) => {
  return doc(db, "storeProducts", productId);
}

export const saveUpdateProductStore = async (product, image) => {
  const formData = new FormData();
  if (image != undefined) {
    formData.append('pictures', image);
  }

  Object.keys(product).forEach((key) => {
    formData.append(key, product[key]);
  });
  await axios({
    method: 'put',
    url: variables.API_URL_NEW + 'Admin/EditProduct',
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(function (response) {
      toast.success(response.message, {
        autoClose: 1000,
      });
    }).catch(function (error) {
      console.error(error.message);
    });
}
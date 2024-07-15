import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const getProductReviewsService = async (orderId) => {
  const q = query(
    collection(db, "productReview")
  )

  const querysnapshot = await getDocs(q);
  return querysnapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductReviewByOrderIdService = async (OrderItemId) => {
  return await axios.get(variables.API_URL_NEW + 'Product/GetProductReviewByOrderItemId', { params: { "OrderItemId": OrderItemId } }).then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error);
  });
}

export const getProductReviewByProductIdService = async (productId) => {
  return await axios.get(variables.API_URL_NEW + 'Product/GetProductReviewByProductId', { params: { "productId": productId } }).then((response) => {
    return response.data;
  }).catch(error => {
    console.error(error);
  });
}

export const saveProductReview = async (productReview, image) => {
  const formData = new FormData();
  if (image != undefined) {
    formData.append('image', image);
  }

  Object.keys(productReview).forEach((key) => {
    formData.append(key, productReview[key]);
  });
  await axios({
    method: 'post',
    url: variables.API_URL_NEW + 'Product/AddRatingReviews',
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
      toast.error(error.message, {
        autoClose: 1000,
      });
    });
}

export const updateProductReview = async (productReviewDoc, image) => {
  const formData = new FormData();
  if (image != undefined) {
    formData.append('Pictures', image);
  }

  Object.keys(productReviewDoc).forEach((key) => {
    formData.append(key, productReviewDoc[key]);
  });
  await axios({
    method: 'put',
    url: variables.API_URL_NEW + 'Product/EditRatingReviews',
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
      toast.error(error.message, {
        autoClose: 1000,
      });
    });
}
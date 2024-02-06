import { collection, deleteDoc, doc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const saveCategoryIntoProductCategoryService = async (category) => {
    // return await addDoc(collection(db, "productCategory"), {
    //     ...Category
    // });
    return await 
    axios({
        method: 'post',
        url: variables.API_URL + 'Category/AddCategory',
        data: category
    }) .then(function (response) {
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const updateCategoryIntoProductCategoryService = async (Category, categoryId, userId) => {
    // const categoryDoc = doc(db, "productCategory", categoryId);
    // await updateDoc(categoryDoc, {
    //     Category: Category,
    //     userId:userId
    // });
    const postData = {
        id: categoryId,
        category: category,
        userId:userId
    };
    axios({
        method: 'put',
        url: variables.API_URL + 'Category/UpdateCategory',
        data: postData
    }) .then(function (response) {
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const getAllCategoryService  = async () => {
    // const q = query(
    //     collection(db, "productCategory")
    // )

    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs
    //     .map((doc) => ({ ...doc.data(), id: doc.id }));
    return await axios.get(variables.API_URL + 'Category/GetProductsCategory')
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

// export const getCategoryByIdService = async (categoryId) => {
//     return doc(db, "productCategory", categoryId);
// }

export const DeleteCategoryByIdService = async (doc) => {
   // await deleteDoc(doc);
   return await axios.delete(variables.API_URL + 'Category/DeleteCategory', { params: { "id": doc.id } })
    .then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });

}

export const getCategoryByCategoryIdService = async (id) => {
    // const q = query(
    //     collection(db, "storeProducts"), where("categoryId", "==", id)
    // )

    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs
    //     .map((doc) => ({ ...doc.data(), id: doc.id }));

    return await axios.get(variables.API_URL + 'Category/GetCategoryById', { params: { "id": id } })
    .then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });

}

export const updateBillingAddressService = async (payload) => {
    return await axios({
        method: 'put',
        url: variables.API_URL + 'Address/UpdateBillingAddress',
        data: payload,
    }).then(function (response) {
        toast.success(`Billing Address Updated Successfully`, {
            autoClose: 3000,
        });
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const addBillingAddressService = async (payload) => {
    return await axios({
        method: 'post',
        url: variables.API_URL + 'Address/AddBillingAddress',
        data: payload,

      }).then(function (response) {
        toast.success(`Billing Address Added Successfully`, {
          autoClose: 3000,
        });
      }).catch(function (error) {
        toast.error(error.message, {
          autoClose: 1000,
      });
    });
}

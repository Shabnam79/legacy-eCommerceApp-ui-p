import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const saveCategoryIntoProductCategoryService = async (category) => {
    return await
        axios({
            method: 'post',
            url: variables.API_URL + 'Category/AddCategory',
            data: category
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const updateCategoryIntoProductCategoryService = async (Category, categoryId, userId) => {
    const postData = {
        id: categoryId,
        category: Category,
        userId: userId
    };
    axios({
        method: 'put',
        url: variables.API_URL + 'Category/UpdateCategory',
        data: postData
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const getAllCategoryService = async () => {
    return await axios.get(variables.API_URL + 'Category/GetProductsCategory')
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const DeleteCategoryByIdService = async (doc) => {
    return await axios.delete(variables.API_URL + 'Category/DeleteCategory', { params: { "id": doc.id } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const getCategoryByCategoryIdService = async (id) => {
    return await axios.get(variables.API_URL + 'Category/GetCategoryById', { params: { "id": id } })
        .then(function (response) {
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
        toast.success(response.message, {
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
        toast.success(response.message, {
            autoClose: 3000,
        });
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

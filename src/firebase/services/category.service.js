import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const saveCategoryIntoProductCategoryService = async (category) => {
    return await
        axios({
            method: 'post',
            url: variables.API_URL_NEW + 'Admin/AddCategory',
            data: category
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const updateCategoryIntoProductCategoryService = async (Category, categoryId) => {
    const postData = {
        id: categoryId,
        name: Category,
    };
    axios({
        method: 'put',
        url: variables.API_URL_NEW + 'Admin/EditCategory',
        data: postData
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const getAllCategoryService = async (pageNumber, pageSize) => {
    return await axios.get(variables.API_URL_NEW + 'Admin/CategoryList', { params: { "pageNumber": pageNumber, "pageSize": pageSize } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const DeleteCategoryByIdService = async (doc) => {
    return await axios.delete(variables.API_URL_NEW + 'Admin/DeleteCategory', { params: { "id": doc.id } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
        });

}

export const getCategoryByCategoryIdService = async (id) => {

    return await axios.get(variables.API_URL_NEW + 'Admin/GetByCategoryId', { params: { "id": id } })
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
        url: variables.API_URL_NEW + 'Product/EditShippingAddress',
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
        url: variables.API_URL_NEW + 'Product/AddShippingAddress',
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

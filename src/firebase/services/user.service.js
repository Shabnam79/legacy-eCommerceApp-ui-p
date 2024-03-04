import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const getUserData = async () => {
    return await axios.get(variables.API_URL + 'User/GetUsers')
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const getRolesByEmailService = async (email) => {
    return await axios.get(variables.API_URL + 'User/GetUserByEmailId', { params: { "email": email } })
        .then(function (response) {
            if (response?.data?.UID) {
                return response.data;
            }
            return undefined;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const getRolesService = async () => {
    return await axios.get(variables.API_URL + 'User/GetRoles')
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const getUserDataByIdService = async (UserRoleId) => {
    return await axios.get(variables.API_URL + 'User/GetUserById', { params: { "userId": UserRoleId } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const updateRoleUsersService = async (addToUserRoleObj) => {
    return await
        axios({
            method: 'put',
            url: variables.API_URL + 'User/UpdateUser',
            data: addToUserRoleObj
        })
            .then(function (response) {
                toast.success('Role Updated in admin list ', {
                    autoClose: 1000,
                });
                return response.data;
            }).catch(function (error) {
                toast.error(error.message, {
                    autoClose: 1000,
                });
            });
}

export const createUsersService = async (payload) => {
    return await
        axios({
            method: 'post',
            url: variables.API_URL + 'User/AddUser',
            data: payload,
        }).then(function (response) {
            toast.success(`User Detail Added Successfully`, {
                autoClose: 3000,
            });
        }).catch((error) => {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}
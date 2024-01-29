import { collection,where, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { variables } from "../../utils/variables";
import axios from 'axios';
import { toast } from "react-toastify";

export const getUserData = async () => {
    return await axios.get(variables.API_URL + 'User/GetUsers')
        .then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
}

export const getRolesService = async () => {
   return await axios.get(variables.API_URL + 'User/GetRoles')
        .then(function(response) {
        return response.data;
    }).catch(function (error){
        toast.error(error.message, {
            autoClose: 1000,
        });
    });
}

export const updateIsActiveUsersService = async (Id, isActiveValue) => {
    const UserRoleDoc = doc(db, "userroles", Id);
    await updateDoc(UserRoleDoc, {
        isActive: isActiveValue
});
}

export const getUserDataByIdService = async (UserRoleId) => {
    const q = query(
        collection(db, "userroles"), where("UID", "==", UserRoleId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const updateRoleUsersService = async (addToUserRoleObj) => {
    const UserRoleDoc = doc(db, "userroles", addToUserRoleObj.id);
    await updateDoc(UserRoleDoc, {
        roleId : addToUserRoleObj.roleId,
        role: addToUserRoleObj.role
    });
}
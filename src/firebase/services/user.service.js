import { collection,where, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const getUserData = async () => {
    const q = query(
        collection(db, "userroles")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getRolesService = async () => {
    const q = query(
        collection(db, "roles")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
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
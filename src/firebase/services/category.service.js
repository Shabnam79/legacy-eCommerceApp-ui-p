import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";


export const saveCategoryIntoProductCategoryService = async (category) => {
    return await addDoc(collection(db, "productCategory"), {
        ...category
    });
}
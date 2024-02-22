import { collection, doc,deleteDoc, getDocs, query, where, addDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

// export const getCategoryService = async () => {
//     const q = query(
//         collection(db, "productCategory")
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getCategoryService = async () => {
    return await axios.get(variables.API_URL + 'Category/GetProductsCategory').then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

// export const getProductsByCategoryIdService = async (categoryId) => {
//     const q = query(
//         collection(db, "storeProducts"), where("categoryId", "==", categoryId)
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getProductsByCategoryIdService = async (categoryId) => {
    return await axios.get(variables.API_URL + 'Product/GetProductsByCategoryId', { params: { "categoryId": categoryId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

// export const getProductsService = async () => {
//     const q = query(
//         collection(db, "storeProducts")
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getProductsService = async () => {
    return await axios.get(variables.API_URL + 'Product/StoreProducts').then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

// export const deleteRecordFromFirebaseService = async (doc) => {
//     await deleteDoc(doc);
// }

export const DeleteItemFromProduct = async (id) => {
    await axios.delete(variables.API_URL + 'Admin/DeleteProduct', { params: { "itemId": id } }).then((response) => {
       // return response.data;
     }).catch(error => {
       console.log(error);
     });
}

// export const getProductsServiceByUserId = async () => {
//     const q = query(
//         collection(db, "storeProducts")
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }



// export const getProductByProductIdService = async (productId) => {
//     const q = query(
//         collection(db, "storeProducts"), where("productId", "==", productId)
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getProductByProductIdService = async (productId) => {
    return await axios.get(variables.API_URL + 'Product/GetProductDetailbyId', { params: { "productId": productId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

// export const saveProductIntoStoreProductService = async (product) => {
//     return await addDoc(collection(db, "storeProducts"), {
//         ...product
//     });
// }

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

// export const saveUpdateProductStore = async (addToProductObj) => {
//     try {
//         // Define the collection and document data
//         const myCollection = collection(db, 'storeProducts');

//         // Define the document reference
//         const myDocRef = doc(myCollection, addToProductObj.id);

//         // Add or update the document
//         await setDoc(myDocRef, addToProductObj);
//     }
//     catch (error) {
//         toast.error(error.message, {
//             autoClose: 1000,
//         });
//     }

// }

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
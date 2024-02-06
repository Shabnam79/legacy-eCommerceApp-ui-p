import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
//import { deleteRecordFromFirebaseService } from "./product.service";
import { variables } from "../../utils/variables";
import axios from 'axios';

// export const saveCartOrderService = async (cartArray) => {
//     const collectionRef = collection(db, "productOrders");
//     const batch = writeBatch(db);

//     cartArray.forEach((data) => {
//         const addToCartDoc = doc(db, "addToCartStore", data.id);
//         deleteRecordFromFirebaseService(addToCartDoc)
//         const docref = doc(collectionRef);
//         batch.set(docref, data);
//     });

//     batch
//         .commit()
//         .then(() => {
//             console.log("batch write operation completed");
//             toast.success(`order placed successfully`, {
//                 autoClose: 1000,
//             });
//             // clearCart();
//         })
//         .catch((error) => {
//             console.error("batch write operation failed: ", error);
//             toast.error(`${error}`, {
//                 autoClose: 1000,
//             });
//         });
// }

export const saveCartOrderService = async (cartArray) => {
        let payload = {
            productOrders: cartArray
          };
        // return await cartArray.forEach((item) => {
        return await axios({
            method: 'post',
            url: variables.API_URL + 'Product/PlaceOrder',
            data: payload , 
    
        }).then(function(response) {
            toast.success(`order placed successfully`, {
                                autoClose: 1000,
                            });
        
        }).catch(function (error){
            //console.log(error.code);
            if (error.code === "ERR_BAD_REQUEST") {
                
            }
        });   
    // });  
}

// export const getOrderService = async (userId) => {
//     const q = query(
//         // collection(db, "productOrders"), where("userId", "==", userId)
//         collection(db, "productOrders"), where("userId", "==", userId)
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }

export const getOrderService = async (userId) => {
    return await axios.get(variables.API_URL + 'Product/YourOrders', { params: { "userId": userId } }).then((response) => {
        return response.data;
      }).catch(error => {
        console.log(error);
      });
}

// export const getAllOrdersService = async () => {
//     const q = query(
//         collection(db, "productOrders")
//     )

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }));
// }
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { detailProduct } from "../data";

const initialState = {
    allproducts: [],
    status: "",
    detailProduct: detailProduct,
    modalProduct: detailProduct,
    modalOpen: false
};

const productSlice = createSlice({
    name: "allproducts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "LOADING";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.allproducts = action.payload;
                state.status = "IDLE";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "ERROR";
            });
    },
    reducers: {
        openModal(state, action) {
            state.modalProduct = action.payload;
            state.modalOpen = true;
        },

        closeModal(state, action) {
            state.modalOpen = false;
        },

        handleDetail(state, action) {
            state.detailProduct = action.payload;
        }
    }
});

export const fetchProducts = createAsyncThunk("fetch/prodcuts", async () => {
    const collectionRef = collection(db, 'storeProducts');
    return await getDocs(collectionRef).then((storeProduct) => {
        const allproducts = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        return allproducts;
    })
});

export const { openModal, closeModal, handleDetail } = productSlice.actions;

export default productSlice.reducer;
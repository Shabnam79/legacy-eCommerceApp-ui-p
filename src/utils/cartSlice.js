import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartProductsService } from "../firebase/services/cart.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : [],
        subTotal: localStorage.getItem("subTotal") != null ? localStorage.getItem("subTotal") : 0,
        tax: localStorage.getItem("tax") != null ? localStorage.getItem("tax") : 0,
        total: localStorage.getItem("total") != null ? localStorage.getItem("total") : 0,
        totalCost: localStorage.getItem("totalCost") != null ? localStorage.getItem("totalCost") : 0,
        status: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartProducts.pending, (state, action) => {
                state.status = "LOADING";
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.status = "IDLE";
                getTotals(state);
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.status = "ERROR";
            });
    },
    reducers: {
        addToCart(state, action) {
            //if that action product has already in cart then if block will work
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cart[itemIndex].quantity += 1;
            } else {
                const product = { ...action.payload, quantity: 1 };
                state.cart.push(product);
            }

            getTotals(state);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeFromCart(state, action) {
            const updatedCart = state.cart.filter((p) => p.id !== action.payload.id);
            state.cart = updatedCart;
            getTotals(state);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeAll(state, action) {
            state.cart = [];
            getTotals(state);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        reduceProduct(state, action) {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cart[itemIndex].quantity > 1) {
                state.cart[itemIndex].quantity -= 1;
            } else if (state.cart[itemIndex].quantity === 1) {
                const updatedCart = state.cart.filter(
                    (p) => p.id !== action.payload.id
                );
                state.cart = updatedCart;
            }
            getTotals(state);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        incrementProduct(state, action) {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (state.cart[itemIndex].quantity >= 1) {
                state.cart[itemIndex].quantity += 1;
            }
            getTotals(state);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        updateProductQuantity: (state, action) => {
            const item = state.cart.find(product => product.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                state.subTotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                state.tax = state.subTotal * 0.1; // Assume 10% tax
                state.total = state.subTotal + state.tax;
                state.totalCost = state.total + 10;
            }
        },
    }
});

export const fetchCartProducts = createAsyncThunk("fetch/cartProducts", async (userId) => {
    if (userId != '') {
    return await getCartProductsService(userId);
    }
});

function getTotals(state) {

    const totalPrice = state.cart.reduce(
        (a, c) => a + c.quantity * c.price,
        0
    );
    const tempTax = totalPrice * 0.1;
    const total = totalPrice + tempTax;

    state.subTotal = totalPrice;
    state.tax = tempTax.toFixed(2);
    state.total = total;
    state.totalCost = total + 10;

    localStorage.setItem("subTotal", state.subTotal);
    localStorage.setItem("tax", state.tax);
    localStorage.setItem("total", state.total);
    localStorage.setItem("totalCost", state.totalCost);
}

export const { addToCart, removeFromCart, removeAll, reduceProduct, updateProductQuantity, incrementProduct } = cartSlice.actions;

export default cartSlice.reducer;

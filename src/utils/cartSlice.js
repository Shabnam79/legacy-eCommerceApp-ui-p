import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : [],
        subTotal: localStorage.getItem("subTotal") != null ? localStorage.getItem("subTotal") : 0,
        tax: localStorage.getItem("tax") != null ? localStorage.getItem("tax") : 0,
        total: localStorage.getItem("total") != null ? localStorage.getItem("total") : 0,
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
    }
});

export const { addToCart, removeFromCart, removeAll, reduceProduct, incrementProduct } = cartSlice.actions;

export default cartSlice.reducer;

function getTotals(state) {
    // let subTotal = 0;
    // const tempTax = subTotal * 0.1;

    const totalPrice = state.cart.reduce(
        (a, c) => a + c.quantity * c.price,
        0
    );

    state.subTotal = totalPrice;
    state.tax = totalPrice;
    // state.tax = parseFloat(tempTax.toFixed(2));
    state.total = state.subTotal + state.tax;

    localStorage.setItem("subTotal", state.subTotal);
    localStorage.setItem("tax", state.tax);
    localStorage.setItem("total", state.total);
}

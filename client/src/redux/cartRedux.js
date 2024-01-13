import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload)
        },
        calculateProductTotals: (state) => {
            let quantity = 0;
            let total = 0;
           state.products.forEach((item) => {
            quantity += item.quantity;
            total += item.quantity * item.price
           })
           state.quantity = quantity;
           state.total = total
        }
    }
});

export const { addProduct, removeProduct, calculateProductTotals } = cartSlice.actions;
export default cartSlice.reducer;
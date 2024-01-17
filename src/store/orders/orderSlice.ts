import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	order_id: undefined
};

const orderSlice = createSlice({
	name: 'draftOrder',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateSpares(state, action){
			state.order.spares = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		}
	}
})

export const {updateOrder, updateSpares, updateOrderId} = orderSlice.actions;

export default orderSlice.reducer;
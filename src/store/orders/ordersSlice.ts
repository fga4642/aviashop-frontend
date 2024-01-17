import {createSlice} from "@reduxjs/toolkit"

const initialState= {
	queryPageIndex: 0,
	queryPageSize: 5,
	totalCount: 0,
	status: -1,
	date_start: "2013-10-12",
	date_end: "2024-10-12",
	user: ""
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState: initialState,
	reducers: {
		pageChanged(state, action) {
			state.queryPageIndex = action.payload
		},
		pageSizeChanged(state, action) {
			state.queryPageSize = action.payload
		},
		totalCountChanged(state, action) {
			state.totalCount = action.payload
		},
		updateStatus(state, action) {
			state.status = action.payload
		},
		updateDateStart(state, action) {
			state.date_start = action.payload
		},
		updateDateEnd(state, action) {
			state.date_end = action.payload
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	}
})

export const {pageChanged, pageSizeChanged, totalCountChanged, updateStatus, updateDateStart, updateDateEnd, updateUser} = ordersSlice.actions;

export default ordersSlice.reducer;
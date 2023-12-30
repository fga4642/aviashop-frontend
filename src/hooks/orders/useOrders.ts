import {useDispatch, useSelector} from 'react-redux';
import {
	pageChanged,
	pageSizeChanged,
	totalCountChanged,
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/orders/ordersSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useOrders() {
	const queryPageIndex = useSelector(state => state.orders.queryPageIndex)
	const queryPageSize = useSelector(state => state.orders.queryPageSize)
	const totalCount = useSelector(state => state.orders.totalCount)
	const status = useSelector(state => state.orders.status)
	const date_start = useSelector(state => state.orders.date_start)
	const date_end = useSelector(state => state.orders.date_end)
	const user = useSelector(state => state.orders.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setOrdersPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setOrdersPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setOrdersPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchOrders = async (page, pageSize) => {

		const offset = page * pageSize

		const {data} = await api.get(`orders/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end),
				offset: offset,
				limit: pageSize
			},
			headers: {
				'authorization': access_token
			}
		})

		data["orders"] = data["orders"].filter(order => order.owner.name.includes(user))

		return data

	}

	return {
		queryPageIndex,
		queryPageSize,
		totalCount,
		status,
		date_start,
		date_end,
		setOrdersPage,
		setOrdersPageSize,
		setOrdersPageTotalCount,
		setStatus,
		searchOrders,
		setDateStart,
		setDateEnd,
		setUser
	};
}
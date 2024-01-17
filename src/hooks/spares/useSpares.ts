import {useDispatch, useSelector} from 'react-redux';
import {
	updateSpares,
	updateQuery,
	pageChanged,
	pageSizeChanged,
	totalCountChanged
} from "../../store/spares/sparesSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";
import {useOrder} from "../orders/useOrder";

export function useSpares() {
	const spares = useSelector(state => state.spares.spares);
	const query = useSelector(state => state.spares.query);
	const queryPageIndex = useSelector(state => state.spares.queryPageIndex);
	const queryPageSize = useSelector(state => state.spares.queryPageSize);
	const totalCount = useSelector(state => state.spares.totalCount);

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const {setOrderId} = useOrder()

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}
	
	const setSparesPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setSparesPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setSparesPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}
	
	const searchSpares = async (pageNumber = queryPageIndex, pageSize = queryPageSize) => {

		const offset = pageNumber * pageSize

		const {data} = await api.get(`spares/search/`, {
			params: {
				query: query,
				offset: offset,
				limit: pageSize
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data.draft_order_id
		setOrderId(draft_order_id)

		return data

	}

	const deleteSpare = async (spare) => {
		await api.delete(`spares/${spare.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		spares,
		setSpares,
		query,
		setQuery,
		searchSpares,
		queryPageIndex,
		setSparesPage,
		queryPageSize,
		setSparesPageSize,
		totalCount,
		setSparesPageTotalCount,
		deleteSpare
	};
}
import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateSpares,
	updateOrderId
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.draftOrder.order)
	const order_id = useSelector(state => state.draftOrder.order_id)

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response: Response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {
		try {

			await api.put(`http://localhost:8000/api/orders/${order.id}/update/`, order, {
				headers: {
					'authorization': access_token
				}
			})

		} catch (e) {
			console.log(e)
		}
	}


	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)

	}

	const addSpareToOrder = async (spare) => {

		api.post(`spares/${spare.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			},
		})

	}

	const deleteSpareFromOrder = async (spare) => {
		await api.delete(`orders/${order.id}/delete_spare/${spare.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		await fetchOrder(order_id)
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	return {
		order,
		order_id,
		is_draft,
		setOrder,
		setSpares,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addSpareToOrder,
		deleteSpareFromOrder,
		setOrderId
	};
}
import React from "react";
import "./OrdersTable.sass"
import {STATUSES} from "/src/Consts";
import {useToken} from "../../../hooks/users/useToken";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useOrders} from "../../../hooks/orders/useOrders";
import {useQuery} from "react-query";
import {api} from "../../../utils/api";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import {useAuth} from "../../../hooks/users/useAuth";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {pluralDeliveryDate} from "../../../utils/plural";
import {useNavigate} from "react-router-dom"

export const OrdersTable = () => {

	const navigate = useNavigate()

	const {is_moderator} = useAuth()

	const COLUMNS = [
		{
			Header: "№",
			accessor: "id"
		},
		{
			Header: "Статус",
			accessor: "status",
			Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
		},
		{
			Header: "Пользователь",
			accessor: "owner",
			Cell: ({ value }) => { return value.name }
		},
		{
			Header: "Дата формирования",
			accessor: "date_of_formation",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		},
		{
			Header: "Доставка",
			accessor: "delivery_date",
			Cell: ({ value }) => {
				if (value > 0) {
					return pluralDeliveryDate(value)
				}

				return "Нет"
			}
		}
	]

	if (is_moderator) {
		COLUMNS.push({
			Header: "Действие",
			accessor: "accept_button",
			Cell: ({ cell }) => (
				is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptOrder(cell.row.values.id)}>Принять</CustomButton>
			)
		})

		COLUMNS.push({
			Header: "Действие",
			accessor: "dismiss_button",
			Cell: ({ cell }) => (
				is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissOrder(cell.row.values.id)}>Отклонить</CustomButton>
			)
		})
	}

	const {queryPageIndex, queryPageSize, totalCount, setOrdersPage, setOrdersPageSize, setOrdersPageTotalCount, searchOrders, status, date_start, date_end, user} = useOrders()

	const {access_token} = useToken()

	const acceptOrder = async (order_id) => {

		const formData = new FormData()

		formData.append("status", "3")

		const response = await api.put(`orders/${order_id}/update_status_admin/`, formData, {
			headers: {
				'authorization': access_token
			}
		});

		if (response.status == 200) {
			refetch()
		}
	}

	const dismissOrder = async (order_id) => {

		const formData = new FormData()

		formData.append("status", "4")

		const response = await api.put(`orders/${order_id}/update_status_admin/`, formData, {
			headers: {
				'authorization': access_token
			}
		});

		if (response.status == 200) {
			refetch()
		}
	}

	const openOrderPage = async (order_id) => {
		navigate(`/orders/${order_id}`)
	}

	const { isLoading, data, isSuccess, refetch } = useQuery(
		['orders', queryPageIndex, queryPageSize, status, date_start, date_end, user],
		() => searchOrders(queryPageIndex, queryPageSize),
		{
			refetchInterval: 2000,
			refetchOnWindowFocus: false,
			cacheTime: 0,
			keepPreviousData: false,
		}
	);

	const {
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		canNextPage,
		previousPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		pageIndex,
		pageSize,
		prepareRow
	} = useCustomTable(
		"orders",
		COLUMNS,
		queryPageIndex,
		queryPageSize,
		totalCount,
		isSuccess,
		data,
		setOrdersPage,
		setOrdersPageSize,
		setOrdersPageTotalCount
	)

	return (
		<div>

			<CustomTable
				getTableBodyProps={getTableBodyProps}
				headerGroups={headerGroups}
				page={page}
				nextPage={nextPage}
				canNextPage={canNextPage}
				previousPage={previousPage}
				canPreviousPage={canPreviousPage}
				gotoPage={gotoPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				pageSize={pageSize}
				prepareRow={prepareRow}
				isLoading={isLoading}
				onClick={openOrderPage}
			/>

		</div>
	)
}
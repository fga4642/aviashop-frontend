import SpareImage from "../SpareImage/SpareImage";
import {Spare} from "../../Types.js";
import {useParams} from "react-router-dom";
import {Dispatch, useEffect, useState} from "react";
import "./SparePage.sass"
import {iSparesMock} from "../../Consts";
import icon from "./test.jpg"

const SparePage = ({ selectedSpare, setSelectedSpare }: { selectedSpare:Spare | null, setSelectedSpare: Dispatch<Spare | null> }) => {
	const { id } = useParams<{id?: string | undefined}>();

	const [isMock, setIsMock] = useState<boolean>(true);

	const fetchData = async () => {

		try {

			const response = await fetch("http://127.0.0.1:8000/api/spares/" + id);

			if (!response.ok){
				CreateMock()
			}

			const spare: Spare = await response.json()

			setSelectedSpare(spare)
			setIsMock(false)

		} catch {
			CreateMock()
		}

	}

	if (id == undefined) {
		return (
			<div>

			</div>
		)
	}

	const CreateMock = () => {
		setSelectedSpare(iSparesMock.filter((spare:Spare) => spare.id == parseInt(id))[0])
		setIsMock(true)
	}

	useEffect(() => {
		fetchData()
	}, )


	if (selectedSpare == undefined) {
		return  (
			<div>

			</div>
		)
	}


	if (isMock){
		return (
			<div className="spare-details-wrapper">

				<div className="left">
					<img src={icon} />
				</div>

				<div className="right">

					<div className="details-container">
						<span className="name">Название: {selectedSpare.name}</span>

						<span className="description">Описание: {selectedSpare.description}</span>

						<span className="condition">Состояние: {selectedSpare.condition == 1 ? "Новое" : "Б/У"}</span>

						<span className="price">Цена: {selectedSpare.price}₽</span>

						<span className="weight">Вес: {selectedSpare.weight}кг</span>

					</div>

					<div className="buttons-container">

						<a href="/">
							<button className="order-button">Заказать<i className="fa fa-shopping-cart"></i></button>
						</a>

						<a href="/">
							<button className="message-button">Написать сообщение<i className="fa fa-envelope"></i></button>
						</a>

					</div>
				</div>

			</div>
		)
	}

	return (
		<div className="spare-details-wrapper">

			<div className="left">
				<SpareImage spare_id={parseInt(id)} />
			</div>

			<div className="right">

				<div className="details-container">
					<span className="name">Название: {selectedSpare.name}</span>

					<span className="description">Описание: {selectedSpare.description}</span>

					<span className="condition">Состояние: {selectedSpare.condition}</span>

					<span className="price">Цена: {selectedSpare.price}₽</span>

				</div>

				<div className="buttons-container">

					<a href="/">
						<button className="order-button">Заказать<i className="fa fa-shopping-cart"></i></button>
					</a>

					<a href="/">
						<button className="message-button">Написать сообщение<i className="fa fa-envelope"></i></button>
					</a>

				</div>
			</div>

		</div>
	)
}

export default SparePage;
import {useEffect, useState} from "react";
import logo from "./test.jpg"
import {requestTime} from "../../Consts";

const SpareImage = ({spare_id}:{spare_id:number}) => {

	const [img, setImg] = useState<string>()

	const fetchImg = async () => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/spares/${spare_id}/image`, {
				method: "GET",
				signal: AbortSignal.timeout(requestTime)
			});

			if (!response.ok){
				createMock();
				return;
			}

			const imageBlob = await response.blob()

			const imageObjectURL = URL.createObjectURL(imageBlob)

			setImg(imageObjectURL)
		} catch {
			createMock();
		}
	}

	const createMock = () => {
		setImg(logo)
	}

	useEffect(() => {

		fetchImg()

	}, [])


	return (
		<img src={img}/>
	)
}

export default SpareImage;
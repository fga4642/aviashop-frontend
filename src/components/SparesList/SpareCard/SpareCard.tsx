import "./SpareCard.sass"
import {Spare} from "../../../Types.js";
import {Link} from "react-router-dom";
import SpareImage from "../../SpareImage/SpareImage";
import {motion} from "framer-motion"
import {FaTrash} from "react-icons/fa";
import {iSparesMock, requestTime} from "../../../Consts";
import {Dispatch} from "react";

const SpareCard = ({ spare, setSpares }: { spare:Spare, setSpares:Dispatch<Spare[]> }) => {

    const onDelete = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/spares/${spare.id}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok){
                deleteMockGroup()
            }

            const spares: Spare[] = await response.json()

            setSpares(spares)

        } catch (e) {

            deleteMockGroup()

        }
    }

    const deleteMockGroup = () => {

        spare.status = 2

        setSpares(iSparesMock.filter(group => group.status == 1))

    }


    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="spare-card-wrapper"
            key={spare.id}>

            <div className="top">
                <SpareImage spare_id={spare.id} />

                <div className="delete-btn-wrapper" onClick={onDelete}>
                    <FaTrash />
                    <span>Удалить</span>
                </div>
            </div>

            <div className="center">
                <span>{spare.name}</span>
                <span>Цена: {spare.price}₽</span>
            </div>

            <div className="bottom">
                <Link to={"/spares/" + spare.id}>Подробнее</Link>
            </div>

        </motion.div>
    )

}

export default SpareCard;
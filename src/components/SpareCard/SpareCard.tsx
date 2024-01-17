import "./SpareCard.sass"
import {Link} from "react-router-dom";
import {Spare} from "../../Types";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import {useSpares} from "../../hooks/spares/useSpares";
import {variables} from "../../utils/variables";
import CustomButton from "../CustomButton/CustomButton";


const SpareCard = ({ spare, refetch }: {spare:Spare }) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addSpareToOrder, deleteSpareFromOrder} = useOrder()


    const {deleteSpare, searchSpares} = useSpares()

    const handleAddSpareToOrder = async () => {
        await addSpareToOrder(spare)
        await searchSpares()
    }

    const handleDeleteSpareFromOrder = async () => {
        await deleteSpareFromOrder(spare)
    }

    const handleDeleteSpare = async () => {
        await deleteSpare(spare)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={spare.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {spare.name} </h3>

                </div>

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/spares/${spare.id}`}>
                            <CustomButton bg={variables.primary}>Подробнее</CustomButton>
                        </Link>
                    }

                    {is_authenticated && !is_moderator && location.pathname.includes("spares") &&
                        <CustomButton bg={variables.green} onClick={handleAddSpareToOrder}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton bg={variables.red} onClick={handleDeleteSpareFromOrder}>Удалить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("spares-list") &&
                        <Link to={`/spares/${spare.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("spares-list") &&
                        <CustomButton onClick={handleDeleteSpare} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default SpareCard;
import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {useSpare} from "../../hooks/spares/useSpare";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useOrder} from "../../hooks/orders/useOrder";

const Breadcrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const { spare, setSpare } = useSpare()

    const { order } = useOrder()

    const resetSelectedSpare = () => setSpare(undefined)

    const topics = {
        "spares-list": "Авиазапчасти",
        "create": "Новая авиазапчасть",
        "orders": "Заказы",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Профиль"
    }

    const exclude_topics = ["edit"]

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (exclude_topics.find(x => x == crumb)) {
            return
        }

        if (crumb == "spares") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to="spares-list" onClick={resetSelectedSpare}>
                        Авиазапчасти
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (Object.keys(topics).find(x => x == crumb)) {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedSpare}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }


        if (currentLink.match(new RegExp('orders/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Заказ №{order?.id}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('spares/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {spare?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;
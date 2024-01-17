import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const {is_authenticated, auth, user_name} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const {is_moderator} = useAuth()

    useEffect(() => {
        auth()
    }, []);

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/spares-list" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span>Авиазапчасти</span>
                </Link>

                {is_moderator &&
                    <Link to="/spares-table" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span>Таблица авиазапчастей</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/orders" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span>Заказы</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span>{user_name}</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;
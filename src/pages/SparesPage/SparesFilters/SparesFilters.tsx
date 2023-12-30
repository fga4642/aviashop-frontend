import SearchBar from "../../../components/SearchBar/SearchBar";
import "./SparesFilters.sass"
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {useAuth} from "../../../hooks/users/useAuth";
import {Link} from "react-router-dom";
import {useSpares} from "../../../hooks/spares/useSpares";


const SparesFilters = () => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useSpares()

    return (
        <div className="top">

            <h2>Поиск авизапчастей</h2>

            <div className="filters-container">

                {is_moderator &&
                    <Link to="/spares/create" style={{textDecoration: "none"}}>
                        <CustomButton bg={variables.primary}>
                            Добавить авиазапчасть
                        </CustomButton>
                    </Link>
                }

                <SearchBar query={query} setQuery={setQuery} placeholder="Поиск..."/>

                <CustomButton bg={variables.primary}>
                    Поиск
                </CustomButton>
            </div>

        </div>
    )
}

export default SparesFilters
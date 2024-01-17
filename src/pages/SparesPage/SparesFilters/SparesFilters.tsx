import SearchBar from "../../../components/SearchBar/SearchBar";
import "./SparesFilters.sass"
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {useAuth} from "../../../hooks/users/useAuth";
import {Link} from "react-router-dom";
import {useSpares} from "../../../hooks/spares/useSpares";


const SparesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useSpares()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="top">

            <h2>Поиск авизапчастей</h2>

            <div className="right-container">
                {is_moderator &&
                    <Link to="/spares/create" style={{textDecoration: "none"}}>
                        <CustomButton bg={variables.primary}>
                            Добавить авиазапчасть
                        </CustomButton>
                    </Link>
                }

                <form className="filters-container" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder="Поиск..."/>

                    <CustomButton bg={variables.primary}>
                        Поиск
                    </CustomButton>

                </form>
            </div>


        </div>
    )
}

export default SparesFilters
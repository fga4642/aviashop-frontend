import "./OrdersFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {ADMIN_STATUSES, USER_STATUSES} from "../../../Consts";
import {useAuth} from "../../../hooks/users/useAuth";
import {useOrders} from "../../../hooks/orders/useOrders";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";

const OrdersFilters = () => {

    const {is_moderator} = useAuth()

    const {status, setStatus, date_start, setDateStart, date_end, setDateEnd, user, setUser} = useOrders()

    return (
        <div className="filters-wrapper">

            <div className="top-container">

                <h3>Список заказов</h3>

            </div>

            <div className="bottom-container">

                {is_moderator && <SearchBar query={user} setQuery={setUser} placeholder="Поиск по пользователям..."/>}

                <CustomDatePicker placeholder="От" value={date_start} setValue={setDateStart}/>

                <CustomDatePicker placeholder="До" value={date_end} setValue={setDateEnd}/>
                
                <DropdownMenu
                    width={175}
                    options={is_moderator ? ADMIN_STATUSES : USER_STATUSES}
                    selectedOption={status}
                    setSelectedOption={(id) => {
                        setStatus(id)
                    }}
                />

                <CustomButton bg={variables.primary}>
                    Применить
                </CustomButton>

            </div>

        </div>
    )
}

export default OrdersFilters
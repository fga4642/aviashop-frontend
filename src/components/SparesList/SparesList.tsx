import SpareCard from "./SpareCard/SpareCard";
import "./SparesList.sass"
import {useEffect, useState} from "react";
import {Spare} from "../../Types.js";
import SearchBar from "./SearchBar/SearchBar";
import {iSparesMock, requestTime} from "../../Consts";

const SparesList = () => {

    const [spares, setSpares] = useState<Spare[]>([])

    const [searchQuery, setSearchQuery] = useState<string>("")

    const searchSpares = async () => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/spares/search?query=${searchQuery}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const spares:Spare[] = await response.json()

            setSpares(spares)

        } catch {
            createMock()
        }

    }

    useEffect(() => {
        searchSpares()
    }, [searchQuery])


    const createMock = () => {

        let filteredSpares:Spare[] = iSparesMock.filter(spare => spare.status == 1)

        filteredSpares = filteredSpares.filter((spare) => spare.name.toLowerCase().match(searchQuery))

        setSpares(filteredSpares)
    }

    const sparesCards = spares.map(spare => {
        return <SpareCard spare={spare} setSpares={setSpares} key={spare.id}/>
    })

    return (
        <div className="spares-list-container">

            <div className="filters-container">

                <SearchBar setSearchQuery={setSearchQuery} />

            </div>

            <div className="cards-container">

                {sparesCards}

            </div>

        </div>
    )
}

export default SparesList;
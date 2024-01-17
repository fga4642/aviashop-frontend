import {useSpares} from "../../../hooks/spares/useSpares";
import SpareCard from "../../../components/SpareCard/SpareCard";
import "./SparesList.sass"
import {useEffect, useState} from "react";
import SparesFilters from "../SparesFilters/SparesFilters";

const SparesList = () => {

    const [fetching, setFetching] = useState(true)

    const { spares, query, searchSpares, setSpares, queryPageIndex, setSparesPage } = useSpares()

    const refetch = () => {
        setSpares([])
        setSparesPage(0)
        setFetching(!fetching)
    }

    const pageSize = 8

    useEffect(() => {
        if (fetching) {

            searchSpares(queryPageIndex, pageSize).then(data => {
                setSpares([...spares, ...data["spares"]])
                setSparesPage(queryPageIndex + 1)
            }).finally(() => setFetching(false))

        }
    }, [fetching])

    useEffect(() => {
        setSpares([])
        setSparesPage(0)
        setFetching(!fetching)
    }, [])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
            setFetching(true)
        }
    }

    const cards = spares.map(spare => (
        <SpareCard spare={spare} key={spare.id} refetch={refetch}/>
    ))

    return (
        <div className="spares-list-wrapper">

            <SparesFilters refetch={refetch}/>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default SparesList
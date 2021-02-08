import React, { useContext, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { countriesQueryFilterSelector, fetchCountries } from '../redux/countries/countries'
import './Home.css'
import BoxBackground from '../components/themed/BoxBackground'
import { Link } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import Text from '../components/themed/Text'
import Loader from 'react-spinners/DotLoader'
import { ThemeContext } from '../context/ThemeContext'
import useWindowSize from '../hooks/useWindowSize'

export default function Home() {

    const dispatch = useDispatch()
    const winSize = useWindowSize()
    const itemsPerPage = useMemo(() => {
        if ((winSize.width * winSize.height) / (300 * 300) < 10) return 10;
        return (winSize.width * winSize.height) / (300 * 300);
    }, [winSize])
    const [count, setCount] = useState({
        prev: 0,
        next: itemsPerPage
    })
    const [hasMore, setHasMore] = useState(true);
    const countries = useSelector(countriesQueryFilterSelector)
    const countriesArr = useMemo(() => {
        let c_arr = []
        countries.ids.map((id, i) => {
            c_arr.push(countries.entities[id])
            return id;
        })
        return c_arr;
    }, [countries])
    const [current, setCurrent] = useState([])
    const { darkMode } = useContext(ThemeContext)


    const getMoreData = () => {
        if (!hasMore) return
        setCurrent(current.concat(countriesArr.slice(count.prev + itemsPerPage, count.next + itemsPerPage)))
        setCount((prevState) => ({ prev: prevState.prev + itemsPerPage, next: prevState.next + itemsPerPage }))
    }

    React.useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    React.useEffect(() => {
        setCount({ prev: 0, next: itemsPerPage })
    }, [countriesArr])
    React.useEffect(() => {
        countriesArr && count.prev === 0 && setCurrent(countriesArr.slice(count.prev, count.next))
    }, [countriesArr, count])
    React.useEffect(() => {

        setHasMore((countriesArr.length > current.length))

    }, [current, countriesArr])

    return (
        <BoxBackground className="homeContainerWrapper">
            <div className="homeContainer">

                {countriesArr && current && <InfiniteScroll
                    style={{
                        overflow: 'visible'
                    }}
                    dataLength={current.length}
                    hasChildren={(current.length > 0)}
                    endMessage={(current.length === 0) &&
                        <BoxBackground style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}>
                            <Text>No Contry Found</Text>
                        </BoxBackground>}
                    next={getMoreData}
                    hasMore={hasMore}
                    loader={
                        <BoxBackground style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}>
                            <Loader style={{ height: '50%' }} color={!darkMode ? 'black' : "white"}></Loader>
                        </BoxBackground>}
                >
                    <BoxBackground className="homeBody">
                        {current.map((country, i) => (
                            <Link key={i} style={{ textDecoration: 'none' }} to={`/detail/${country.alpha3Code}`}>
                                <CountryCard
                                    imgUrl={country.flag}
                                    title={country.name}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                ></CountryCard>

                            </Link>
                        )
                        )}
                    </BoxBackground>
                </InfiniteScroll>}
            </div>

        </BoxBackground>
    )
}
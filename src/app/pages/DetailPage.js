
import React, { Suspense, useContext, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import { fetchCountries } from '../redux/countries/countries'
import './DetailPage.css'
import BoxBackground from '../components/themed/BoxBackground'

import RotateLoader from "react-spinners/RotateLoader";
import { Link, useRouteMatch } from 'react-router-dom'
import Text from '../components/themed/Text'
import BoxElement from '../components/themed/BoxElement'
import NumberFormat from 'react-number-format'



export default function DetailPage() {

    const dispatch = useDispatch()
    const match = useRouteMatch()
    const countries = useSelector(state => state.countries)
    const [country, setCountry] = useState(undefined)
    React.useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    React.useEffect(() => {
        countries.entities[match.params.id] &&
            setCountry(countries.entities[match.params.id])
    }, [match, match.params, match.params.id, countries, countries.entities])

    function getCurrencies() {

        let curr = ''
        country.currencies.map(c => {
            curr += c.name + ", "
        })
        return curr;

    }
    return (
        <BoxBackground className="detailsContainerWrapper">
            {
                country && (
                    <div className="detailPageContainer">
                        <div className="detailImgContainer">
                            <img loading="lazy" src={country.flag}></img>
                        </div>
                        <div className="leftContainer">
                            <div className="ttlContainer">
                                <Text className="detailTitle">{country.name}</Text>
                            </div>
                            <div className="detailsContainer" >
                                <div className="detail">
                                    <Text className="detailName">Native Name: </Text>
                                    <Text className="detailValue">{country.nativeName}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Population: </Text>
                                    <Text className="detailValue"> <NumberFormat displayType={'text'} thousandSeparator value={country.population} /> </Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Region: </Text>
                                    <Text className="detailValue">{country.region}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Sub Region: </Text>
                                    <Text className="detailValue">{country.subregion}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Capital: </Text>
                                    <Text className="detailValue">{country.capital}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Top Level Domain: </Text>
                                    <Text className="detailValue">{country.topLevelDomain}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName">Currencies: </Text>
                                    <Text className="detailValue">{getCurrencies()}</Text>
                                </div>
                                <div className="detail">
                                    <Text className="detailName"></Text>
                                    <Text className="detailValue"></Text>
                                </div>
                            </div>
                            <div className="borderCountriesContainer">
                                <Text className="detailName detailBorderCountries">Border Countries: </Text>
                                {country.borders.map((b, i) => {
                                    let border = countries.entities[b];
                                    return (
                                        <Link key={i} className="link" to={`/detail/${b}`}>
                                            <BoxElement className="borderCountriesCard">
                                                <Text className="borderCountriesText">{border.name}</Text>
                                            </BoxElement>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                )
            }


        </BoxBackground >
    )
}
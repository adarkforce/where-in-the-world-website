import React, { useContext } from 'react'
import Text from './themed/Text';
import './CountryCard.css'
import BoxElement from './themed/BoxElement';
import NumberFormat from 'react-number-format';

export default function CountryCard({
    imgUrl, title, population, region, capital, ...props
}) {

    return (
        <div   {...props}  >
            <BoxElement className="countryCard">
                <div className="cardImageWrapper">
                    <img loading="eager"
                        className="cardImage" src={imgUrl}></img>
                </div>
                <div className="cardBody">
                    <Text className="cardTitle">{title}</Text>
                    <div className="cardBodyRow">
                        <Text className="cardBodyRowTitle">Population: </Text>
                        <Text className="cardBodyRowValue"> {<NumberFormat displayType={'text'} thousandSeparator value={population} />}</Text>
                    </div>
                    <div className="cardBodyRow">
                        <Text className="cardBodyRowTitle">Region: </Text>
                        <Text className="cardBodyRowValue">{region}</Text>
                    </div>
                    <div className="cardBodyRow">
                        <Text className="cardBodyRowTitle">Capital: </Text>
                        <Text className="cardBodyRowValue">{capital}</Text>
                    </div>
                </div>
            </BoxElement>
        </div>
    )
}
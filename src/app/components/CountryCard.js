import React, { useContext, useState } from 'react'
import Text from './themed/Text';
import './CountryCard.css'
import BoxElement from './themed/BoxElement';
import NumberFormat from 'react-number-format';
import { animated, useSpring } from 'react-spring';

const AnimatedBoxElement = animated(BoxElement)

export default function CountryCard({
    imgUrl, title, population, region, capital, ...props
}) {
    const [mouseOver, setMouseOver] = useState(false)
    const animatedProps = useSpring({
        boxShadow: mouseOver ? '0px 20px 30px 3px rgba(0, 0, 0, 0.30)' : '0px 0px 20px 3px rgba(0, 0, 0, 0.15)',
        marginTop: mouseOver ? '-20px' : '0px'
    })

    function handleOnMouseOver() {
        setMouseOver(true)
    }

    function handleOnMouseOut() {
        setMouseOver(false)
    }

    return (
        <animated.div onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}   {...props} style={{ ...props.style, position: 'static', marginTop: animatedProps.marginTop }}  >
            <AnimatedBoxElement style={{ boxShadow: animatedProps.boxShadow }} className="countryCard">
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
            </AnimatedBoxElement>
        </animated.div>
    )
}
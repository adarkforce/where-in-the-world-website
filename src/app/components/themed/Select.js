import React, { useContext, useRef, useState } from 'react'

import './Select.css'
import { useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faArrowsAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Text from './Text';
import BoxElement from './BoxElement';
import { ThemeContext } from '../../context/ThemeContext';
import { regionChanged, REGIONS } from '../../redux/countries/countries';
const AnimatedFAIcon = animated(FontAwesomeIcon)

const SelectItem = ({ item, onClick }) => {
    const { theme } = useContext(ThemeContext);

    const [op, setOp] = useState(1)
    const [mouseOver, setMouseOver] = useState(false)

    const handleMouseOver = () => {
        setMouseOver(true)
        setOp(.5)
    }

    function handleMouseOut() {
        setMouseOver(false)
        setOp(1)

    }
    const aP = useSpring({
        backgroundColor: theme.colors.element,
        color: theme.colors.text,
        opacity: op

    })
    return (<BoxElement style={{ opacity: aP.opacity }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => onClick(item)}
        className="selectWindowItem">
        <Text className="selectWindowText">{item}</Text>
    </BoxElement>)
}

export default function Select({ title, initialItems, onSelect,
    ...props
}) {
    const dispatch = useDispatch()
    const { theme } = useContext(ThemeContext);
    const [items] = useState(initialItems)
    const [selected, setSelected] = useState(() => items[0])
    const [toggle, setToggle] = useState(false)
    const animatedProps = useSpring({
        backgroundColor: theme.colors.element,
        color: theme.colors.text,

    })
    const animatedWindowProps = useSpring({
        height: toggle ? '200px' : '0px',
        rotation: toggle ? 180 : 0,

    })

    React.useEffect(() => {
        onSelect(selected)
    }, [selected])

    function handleElementClick(item) {
        setToggle(!toggle)
        setSelected(item)
    }


    return (
        <div {...props} className="selectInputContainer">
            <animated.div onClick={() => setToggle(!toggle)} style={{
                backgroundColor: animatedProps.backgroundColor
            }} className="selectInputWrapper">
                <Text className="selectedItemText" fontSize="16px">{title}</Text>
                <animated.div
                    style={{
                        transform: animatedWindowProps.rotation.interpolate(r => ` rotateX(${r}deg)`)
                    }}
                >
                    <AnimatedFAIcon className="iconArrow" color={animatedProps.color} icon={faAngleUp}></AnimatedFAIcon>
                </animated.div>
            </animated.div>
            <BoxElement className="selectWindow" style={animatedWindowProps}>
                {items.map((item, index) => {
                    return (
                        <SelectItem onClick={handleElementClick} key={index} item={item}></SelectItem>
                    )
                })}
            </BoxElement>
        </div>
    )
}
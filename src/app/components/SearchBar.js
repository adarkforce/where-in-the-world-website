import React, { useContext } from 'react'

import './SearchBar.css'
import { queryFilterChanged } from "./../redux/countries/countries";
import { useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const AnimatedFAIcon = animated(FontAwesomeIcon)

export default function SearchBar({ onChange,
    ...props
}) {
    const dispatch = useDispatch()
    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        backgroundColor: theme.colors.element,
        color: theme.colors.text

    })


    return (
        <div {...props} className={"searchBarInputContainer " + props.className}>
            <animated.div style={{
                backgroundColor: animatedProps.backgroundColor
            }} className="searchBarInputWrapper">
                <AnimatedFAIcon className="iconSearch" color={animatedProps.color} icon={faSearch}></AnimatedFAIcon>
                <animated.input style={animatedProps} placeholder={props.placeholder} onChange={onChange} type="text" className="searchBarInput"></animated.input>
            </animated.div>
        </div>
    )
}
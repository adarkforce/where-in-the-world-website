import React, { useContext, useState } from 'react'
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../../context/ThemeContext';
import BoxElement from './BoxElement';

import './Button.css'

export default function Button({ children, fontSize, ...props }) {
    const [mouseOver, setMouseOver] = useState(false)

    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
        zoom: mouseOver ? '105%' : '100%'
    })

    function handleOnMouseOver() {
        setMouseOver(true)
    }

    function handleOnMouseOut() {
        setMouseOver(false)
    }
    return (
        <BoxElement onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut} className="button"
            {...props}
            style={{
                ...props.style,
                ...animatedProps
            }}
        >
            {children}
        </BoxElement >
    )
}

import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../../context/ThemeContext';
import './BoxBackground.css'


export default function BoxBackground({ children, fontSize, ...props }) {
    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        backgroundColor: theme.colors.background,

    })
    return (
        <animated.div

            {...props}
            style={{ ...animatedProps, ...props.style, }}
        >
            {children}
        </animated.div>
    )
}
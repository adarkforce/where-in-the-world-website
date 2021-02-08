
import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../../context/ThemeContext';



export default function BoxElement({ children, fontSize, ...props }) {
    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        backgroundColor: theme.colors.element,

    })
    return (
        <animated.div
            {...props}
            style={{ ...props.style, ...animatedProps }}

        >
            {children}
        </animated.div>
    )
}
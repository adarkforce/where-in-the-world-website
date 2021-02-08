import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../../context/ThemeContext';



export default function Text({ children, fontSize, ...props }) {
    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        textColor: theme.colors.text,

    })
    return (
        <animated.h1 className="text"
            style={{
                color: animatedProps.textColor,
                fontSize: fontSize
            }}
            {...props}
        >
            {children}
        </animated.h1>
    )
}


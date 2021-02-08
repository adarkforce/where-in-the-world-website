import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring';
import { ThemeContext } from '../../context/ThemeContext';
import BoxElement from './BoxElement';

import './Button.css'

export default function Button({ children, fontSize, ...props }) {
    const { theme } = useContext(ThemeContext);
    const animatedProps = useSpring({
        color: theme.colors.text,
        backgroundColor: theme.colors.background
    })
    return (
        <BoxElement className="button"
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
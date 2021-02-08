import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { ThemeContext } from "../context/ThemeContext";
import './DarkModeButton.css'
import BoxBackground from "./themed/BoxBackground";
import BoxElement from "./themed/BoxElement";
import Text from "./themed/Text";

const AnimatedFAIcon = animated(FontAwesomeIcon)

export default function DarkModeButton() {
    const { setDarkMode, darkMode } = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode)
    }

    return (

        <BoxElement className="darkModeButtonContainer" onClick={handleClick}>
            <Text fontSize='16px'>
                <AnimatedFAIcon style={{
                    marginRight: 8,
                    transform: 'rotateZ(-20deg)'
                }} icon={darkMode ? faMoonSolid : faMoon}></AnimatedFAIcon>
            </Text>
            <Text className="darkModeButtonText" fontSize="16px">Dark Mode</Text>
        </BoxElement>


    )

}
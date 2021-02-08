import React from 'react'
import { Link } from 'react-router-dom';
import DarkModeButton from './DarkModeButton';
import './Header.css'
import BoxElement from './themed/BoxElement';
import Text from './themed/Text';


export default function Header({
    headerTitle = 'Where in the world?',
    left = <DarkModeButton />,
    ...props
}) {


    return (
        <BoxElement {...props} className="headerContainer" >
            <div className="headerContent">
                <Link style={{ textDecoration: 'none' }} to="/" className="headerTitle">
                    <Text fontSize="22px">Where in the world?</Text>
                </Link>
                <div className="headerLeft">
                    {left}
                </div>
            </div>
        </BoxElement>
    )
}
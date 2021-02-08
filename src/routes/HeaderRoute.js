import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../app/components/Header'
import SearchBar from '../app/components/SearchBar'
import SubHeader from '../app/components/SubHeader'
import BoxBackground from '../app/components/themed/BoxBackground'


export default function HeaderRoute({ children, subheaderMode, ...props }) {
    return (
        <Route {...props}>
            <div>
                <div style={{ position: 'fixed', width: '100%', backgroundColor: 'rgba(0,0,0,0)' }}>
                    <Header style={{ position: 'sticky', zIndex: 4 }} />
                    <SubHeader mode={subheaderMode} />
                </div>
                <BoxBackground >
                    {children}
                </BoxBackground>
            </div>
        </Route>
    )
} 
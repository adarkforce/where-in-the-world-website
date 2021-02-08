import React, { createContext, useMemo, useState } from 'react'
import { darkTheme, whiteTheme } from './themes'

export const ThemeContext = createContext({
    darkMode: false,
    setDarkMode: undefined,
    theme: undefined
})

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false)
    const theme = useMemo(() => {
        if (darkMode) {
            return darkTheme
        } else {
            return whiteTheme
        }
    }, [darkMode])



    React.useLayoutEffect(() => {
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && setDarkMode(true)
    }, [])
    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode,
                theme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

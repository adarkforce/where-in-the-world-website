import React, { useState } from "react";


export default function useWindowSize() {
    const [winSize, setWinSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    React.useEffect(() => {
        function windowListener() {

            setWinSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', windowListener)

        return () => {
            window.removeEventListener('resize', windowListener)
        }
    }, [])

    return winSize;
}
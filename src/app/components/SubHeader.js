import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import BoxBackground from "./themed/BoxBackground";
import Button from "./themed/Button";
import Text from "./themed/Text";
import './SubHeader.css'
import { useSpring } from "react-spring";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Select from "./themed/Select";
import { queryFilterChanged, regionChanged, REGIONS } from "../redux/countries/countries";
import { useDispatch } from "react-redux";


export default function SubHeader({ mode = 'filter' }) {
    let history = useHistory()
    const dispatch = useDispatch()
    const { theme } = useContext(ThemeContext)
    const animatedProps = useSpring({
        background:
            `linear-gradient(to bottom, ${theme.colors.background} 0%,${theme.colors.background}  70%, ${theme.colors.transparentBg} 100%)`
    })

    function handleGoBack() {
        history.goBack()
    }

    function handleRegionSelect(item) {
        dispatch(regionChanged(item))

    }

    function handleSearchBarChange(e) {
        dispatch(queryFilterChanged(e.target.value))
    }

    return (
        <BoxBackground className="bgSubheaderWrapper" style={{
            ...animatedProps
        }}>
            <div className="bgSubheader" >
                <SearchBar
                    onChange={handleSearchBarChange}
                    className="searchBar"
                    placeholder={'Search for a country...'}
                    style={{ display: (mode === 'filter') ? 'flex' : 'none' }} />
                <Select
                    onSelect={handleRegionSelect}
                    initialItems={REGIONS}
                    title="Filter by Region"
                    style={{ display: (mode === 'filter') ? 'inline' : 'none' }} />
                <Button
                    style={{ display: (mode === 'goBack') ? 'flex' : 'none' }}
                    onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon><Text>Go Back</Text>
                </Button>
            </div>
        </BoxBackground>
    )
}
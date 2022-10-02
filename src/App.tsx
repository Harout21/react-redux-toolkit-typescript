import React from 'react';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import Header from "./components/Header";
import InputCity from './components/InputCity';
import {ThemeProvider} from "styled-components";

import {getCityWeatherColorSelector, setColor} from "./redux/slices/getWeatherByCityName";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import {Container} from "./styles/Container.styled";
import {StyledMain} from "./styles/Main.styled";
import {StyledButton} from "./styles/Button.styled";

function App() {
    const getCityWeatherColor = useAppSelector(getCityWeatherColorSelector);
    const isBlack = getCityWeatherColor === 'black';
    const dispatch = useAppDispatch();

    const changeColorHandler = () => {
        dispatch(setColor(isBlack ? '#cecece' : 'black'));
    };

    const theme = {
        colors: {
            main: getCityWeatherColor,
            card: 'grey',
            container: "#cecece",
            headerH1: isBlack ? "#FFFFFF" : "black"
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledMain>
                <Header/>
                <StyledButton onClick={changeColorHandler}>
                    {
                        isBlack ?
                            <WbSunnyIcon/> :
                            <DarkModeIcon/>
                    }
                </StyledButton>
                <Container>
                    <h1>Search By City</h1>
                    <InputCity/>
                </Container>
            </StyledMain>
        </ThemeProvider>
    );
}

export default App;

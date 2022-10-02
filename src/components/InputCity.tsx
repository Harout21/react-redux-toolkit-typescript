import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Dialog} from "@mui/material";

import {
    getWeatherByCity, getWeatherHistoryCityErrorSelector,
    getWeatherHistoryCitySelector,
} from "../redux/slices/getWeatherByCityName";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

import {ItemCity} from "../constants/Types";
import {APP_URL} from "../constants/api_url";
import CloseIcon from "../icons/CloseIcon";

import {StyledDialogDiv, StyledError, StyledLink, StyledSVG} from "../styles/Dialog.styled";
import {StyledButton} from "../styles/Button.styled";
import {StyledInput} from "../styles/Input.styled";
import {StyledCardCity} from "../styles/CardCity.styled";
import {StyledSearchContainer} from "../styles/Search.styled";


const InputCity = () => {
    const dispatch = useAppDispatch();
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('city');
    const dayNameSt = new Date().toLocaleDateString('en-us', {weekday: "long", day: 'numeric'});
    const [inputValue, setInputValue] = useState<string>('');
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    const [activeCity, setActiveCity] = useState<ItemCity>();
    const historyWeatherCities = useAppSelector(getWeatherHistoryCitySelector);
    const errorMessageNoCities = useAppSelector(getWeatherHistoryCityErrorSelector);


    function kelvinToCelsius(kelvin: number) {
        return Math.round(kelvin - 273.15) + "º";
    }

    useEffect(() => {
        if (name) {
            dispatch(getWeatherByCity(name as string));
            setOpenPopUp(true)
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        setActiveCity(historyWeatherCities[0]);
    }, [historyWeatherCities]);

    return (
        <>
            <StyledSearchContainer>
                <StyledInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <StyledButton
                    onClick={() => {
                        if (inputValue &&
                            !historyWeatherCities.filter((city: ItemCity) =>
                                city?.name.toLowerCase() === inputValue).length) {
                            dispatch(getWeatherByCity(inputValue));
                        }
                    }}
                >
                    submit
                </StyledButton>
            </StyledSearchContainer>

            <StyledError>
                {errorMessageNoCities}
            </StyledError>

            {
                <StyledCardCity>
                    {
                        historyWeatherCities.map((item: ItemCity) => {
                            return (
                                <div key={item.id} onClick={() => {
                                    setOpenPopUp(true);
                                    setActiveCity(item)
                                }}>
                                    <h3>{item.name}</h3>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                                        alt="iconWeather"/>
                                    <div>{dayNameSt}</div>
                                    <div>{item.name}, {item.sys.country}</div>
                                    <div>{kelvinToCelsius(item.main.temp)}</div>
                                    <div>{kelvinToCelsius(item.main.temp_min)} / {kelvinToCelsius(item.main.temp_max)}</div>
                                </div>
                            )
                        })
                    }
                </StyledCardCity>
            }
            <Dialog
                open={openPopUp}
                onClose={() => {
                    setOpenPopUp(false);
                }}
            >
                <StyledSVG
                    onClick={() => setOpenPopUp(false)}
                >
                    <CloseIcon/>
                </StyledSVG>

                <StyledDialogDiv key={activeCity?.id}>
                    <h3>{activeCity?.name}</h3>
                    {
                        activeCity?.weather[0]?.icon &&
                        <img
                            src={`http://openweathermap.org/img/wn/${activeCity?.weather[0]?.icon}@2x.png`}
                            alt="iconWeather"/>
                    }

                    <div>{dayNameSt}</div>
                    <div>{activeCity?.name}, {activeCity?.sys.country}</div>
                    <div>{kelvinToCelsius(activeCity?.main.temp as number)}</div>
                    <div>{kelvinToCelsius(activeCity?.main.temp_min as number)} / {kelvinToCelsius(activeCity?.main.temp_max as number)}</div>
                </StyledDialogDiv>

                <StyledLink
                    href={`${APP_URL}?city=${inputValue || activeCity?.name.toLowerCase()}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </StyledLink>
            </Dialog>
        </>
    );
};

export default InputCity;


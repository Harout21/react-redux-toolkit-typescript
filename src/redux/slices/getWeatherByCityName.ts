import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {API_URL} from "../../constants/api_url";
import {Fetch} from "../fetch"
import {RootState} from "../store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {weatherCityState} from "../../constants/Types";

const name = "WEATHER_BY_CITY";

export const initialState: weatherCityState = {
    weatherByCity: [],
    savedCities: [],
    colorToggle: '',
    error: ''
};

export const getWeatherByCity = createAsyncThunk(
    `${name}/weatherByCity`,
    async (city: string) => (
        Fetch({
            method: 'GET',
            url: `${API_URL}?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`,
        })
    )
);

const getWeatherByCitySlice = createSlice({
    name,
    initialState,
    reducers: {
        setColor: (state, { payload }) => {
            state.colorToggle = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherByCity.fulfilled, (state, action: PayloadAction<any | object>) => {
                state.weatherByCity = action.payload?.list[0] as [];

                if (typeof state.savedCities !== "object") {
                    // It exist check
                    state.savedCities = [];
                }

                if (action.payload?.list?.length) {
                    // save last searched city to the store
                    state.savedCities.push(action.payload?.list[0] as never);
                    state.error = "";
                    state.colorToggle = action.payload?.list[0]?.weather[0]?.icon
                        [action.payload?.list[0]?.weather[0]?.icon.length - 1] === 'd' ?
                        "#cecece" : "black";

                }else {
                    state.error = "No Cities Found"
                }

            })
            .addCase(getWeatherByCity.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
});

export const{ setColor } = getWeatherByCitySlice.actions
export const getWeatherHistoryCitySelector = ((state: RootState) => state.weatherByCity.savedCities);
export const getCityWeatherColorSelector = ((state: RootState) => state.weatherByCity.colorToggle);
export const getWeatherHistoryCityErrorSelector = ((state: RootState) => state.weatherByCity.error);
export default getWeatherByCitySlice.reducer;

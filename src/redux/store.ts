import {combineReducers, configureStore} from "@reduxjs/toolkit";
import getWeatherByCitySlice from "./slices/getWeatherByCityName"

const rootReducer = combineReducers({
    weatherByCity: getWeatherByCitySlice,
});

 const store = configureStore({
    reducer: rootReducer,
});

export default store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
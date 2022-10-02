export interface ItemCity {
    id: number,
    name: string,
    weather: [{ icon: string }],
    sys: { country: string },
    main: { temp: number, temp_min: number, temp_max: number }
}

export interface weatherCityState {
    weatherByCity: [],
    savedCities: [],
    colorToggle: string,
    error: string
}

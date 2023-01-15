interface ICity {
    postal_code: string,
    country_code: string,
    latitude: string,
    longitude: string,
    city: string,
    state: string,
    city_en: string,
    state_en: string,
    state_code: string,
    province: string,
    province_code: string,
}

type IZipCodeCityResult = Record<string, ICity[]>;

export type CityByZipcodeSuccessResponse = {
    query: {
        codes: string[],
        country: string | null,
    },
    results: IZipCodeCityResult;
};
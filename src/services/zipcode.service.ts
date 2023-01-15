import { AxiosError, isAxiosError } from "axios";
import { ZipCodeApi } from "../api/axiosClient";
import { CityByZipcodeSuccessResponse } from "../api/models/CityByZipcodeResponse";

const ZIPCODE_API_KEY = "2b68f0d0-94e2-11ed-8df4-9951e9da6a9d";


export interface IZipCodeError {
    error: string;
}

//TODO: make searchQueryFromObj
export const getCityByZipcode = async (zipCode: string, countryCode?: string) => {
    try {
        const response = await ZipCodeApi.get<CityByZipcodeSuccessResponse>(`/search?apikey=${ZIPCODE_API_KEY}&codes=${zipCode}${countryCode ? `&country=${countryCode}` : ``}`)
       return { isError: false, data: response.data as CityByZipcodeSuccessResponse }
    } catch (err) {
        const errors = err as Error | AxiosError;
        return { isError: true, data: !isAxiosError(errors) ? errors.message : (errors.response?.data as IZipCodeError).error }
    }
};
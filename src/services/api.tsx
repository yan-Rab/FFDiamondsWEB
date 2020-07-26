import axios, { AxiosResponse, AxiosError } from 'axios';
import Toasts from '../components/Toasts';
import iconSuccess from '../assets/tick.png';
import iconError from '../assets/error.png';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL})

const toasts = new Toasts();

api.interceptors.response.use(
    function (response: AxiosResponse){
        if(response.data.message){
            toasts.success(iconSuccess, response.data.message)
        }
       
        return response
    },

    function (err: AxiosError){
        const {message} = err.response?.data

        return toasts.error(iconError, message)
    }
)


export default api;
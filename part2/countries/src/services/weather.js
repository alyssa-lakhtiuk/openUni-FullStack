import axios from "axios"
import {useEffect, useState} from 'react'

const api_key = process.env.REACT_APP_API_KEY

const getWeather = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]

    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)

    return (
        request.then(response => response.data)
    )
}

export default {getWeather}
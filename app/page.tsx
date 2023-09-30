'use client'
import React, { useState } from 'react'
import Input from './component/Input'
import WeatherDetails from './component/WeatherDetails'
import WeekForecast from './component/WeekForecast'
import Current from './component/Current'

const Home = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  const url = `http://api.weatherapi.com/v1/forecast.json?key=10215db8c5f94200996131624232909&q=${location}&days=7&aqi=yes&alerts=yes `

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setData(data)
        setLocation('')
        setError('')
      } catch (error) {
        setError('City not found')
        setData({})
      }
    }
  }

  let content
  if (Object.keys(data).length === 0 && error === '') {
    content = (
      <div>
        <h2 className="font-bold text-center">Welcome to the weather app</h2>
      </div>
    )
  } else if (error !== '') {
    content = (
      <div>
        <p>City not found</p>
        <p>Enter another city</p>
      </div>
    )
  } else {
    content = (
      <>
        <div>
          <Current data={data} />

          <WeekForecast />
        </div>
        <div>
          <WeatherDetails />
        </div>
      </>
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-400 to-blue-200 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/* INPUT AND LOGO */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">
            Weather App.
          </h1>
        </div>
        {/* {data.current ? <div> {data.current.temp_f}</div> : null} */}
        {content}
      </div>
    </div>
  )
}

export default Home

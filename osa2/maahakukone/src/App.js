
import React, { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'

const DetailedCountry = (props) => {

  return (
    <div>
      <h2>{props.country.name.common}</h2>
      capital {props.country.capital[0]}<br />
      area {props.country.area}<br /><br />
      <strong> languages:</strong>
      <ul>
        {Object.values(props.country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={props.country.flags.png}></img>

      </div>
    </div >
  )
}

const MultipleCountries = (props) => {
  const [showOne, setShowOne] = useState()

  const handleClick = (event, country) => {
    event.preventDefault()
    setShowOne(country)
  }

  if (showOne) {
    return (
      <DetailedCountry country={showOne} />
    )
  }

  return (
    <>
      {
        props.countries.length < 10
          ? props.countries.map(country => (
            <li key={country.name.common}>
              <form onSubmit={(event) => handleClick(event, country)}>
                {country.name.common} <button type="submit">show</button>
              </form>

            </li>
          ))
          : <p>Too many matched, specify another filter</p>
      }
    </>
  )
}

function App() {
  const [countries, setCountry] = useState([])

  const [newCondition, setNewCondition] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  const handleConditionChange = (event) => {
    setNewCondition(event.target.value)
  }

  const countriesToShow = newCondition.length === 0
    ? countries
    : countries.filter(country => country.name.common.toUpperCase().startsWith(newCondition.toUpperCase()))


  return (
    <div>
      <form>
        find countries: <input
          value={newCondition}
          onChange={handleConditionChange} />
      </form >
      <div>
        {countriesToShow.length === 1 ? <DetailedCountry country={countriesToShow[0]} /> : <MultipleCountries countries={countriesToShow} />}
      </div>
    </div >
  );
}

export default App;

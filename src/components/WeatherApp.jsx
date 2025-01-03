import {useEffect, useState} from "react";
import axios from "axios";
import Person from "./Person.jsx";


const Country = ({data}) => {
    console.log(data);
    const languages = data.languages;
    const flagURL = data.flags["png"];
    console.log(languages);
    return (
        <>
            <h1>{data.name.common}</h1>
            <h2>{data.name.official}</h2>
            Capital: {data.capital}
            <br/>
            Area: {data.area} km2
            <h3>Languages:</h3>
            {languages &&
                Object.entries(languages).map(([key, value]) => (
                    <div key={key}>
                        {value}
                        <br/>
                    </div>
                ))
            }
            <br/>
            <img src={flagURL} alt={`${data.name.common} flag`}/>
            <br/>
        </>
    )
}

const CountryList = ({data,onShowCountry }) => {
    if(data.length === 0){
        return (
            <>
                No countries found containing search string
            </>
        )
    }
    if(data.length === 1){
        return (
            <>
                <Country data={data[0]}/>
            </>
        )
    }
    if (data.length <= 10) {
        return (
            <>
                {data.map((country) => (
                    <div key={country.name.common}>
                        {country.name.common}{" "}
                        <button onClick={() => onShowCountry(country)}>
                            Show
                        </button>
                    </div>
                ))}
            </>
        );
    }

    return <p>Too many countries in search results.</p>;
}

export const WeatherApp = () => {
    const [countrySearch, setCountrySearch] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {setCountryList(response.data)});

    }, []);

    const countryFilter = countrySearch  ?
        countryList.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase())) :
        []

    useEffect(() => {
        setSelectedCountry(null);
    }, [countrySearch]);
    return (
        <>
            <form>
            Find Countries: <input onChange={(e) => setCountrySearch(e.target.value)} value={countrySearch} />
                <br/>
                {selectedCountry ? (
                    <Country data={selectedCountry} />
                ) : (
                    <CountryList
                        data={countryFilter}
                        onShowCountry={(country) => setSelectedCountry(country)}
                    />
                )}
            </form>
        </>
    )
}
import React, { useState } from 'react'
import axios from 'axios'
import SearchResult from './SearchResult'

const SearchMovies = () => {
    const [searchFormData, setSearchFormData] = useState('')
    const [searchResult, setSearchResult] = useState({})
    const urlforSearch = `http://www.omdbapi.com/?s="${searchFormData}"&type=movie&apikey=9bc37d14`
    const urlforTitle = `http://www.omdbapi.com/?t="${searchFormData}"&type=movie&apikey=9bc37d14`

    const handleChange = async (e) => {
        setSearchFormData(e.target.value)
        const res = await axios.get(urlforSearch)
        if (res.data.Response === 'True') {
            setSearchResult(res)
        }
        else {
            console.log(`Invalid Search...`)
            setSearchResult(res)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.get(urlforTitle)
        if (res.data.Response === 'True') {
            setSearchResult(res)
        }
        else {
            console.log(`Invalid search...`)
            setSearchResult(res)
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Search</label>
                <input type="text" value={searchFormData} onChange={e => handleChange(e)} />
            </form>
            <br />
            {searchFormData ? (
                searchResult.data && searchResult.data.Response === 'True' ?
                    < SearchResult searchresult={searchResult} /> : (
                        searchResult.data && searchResult.data.Response === 'False' &&
                        (<p>{searchResult.data.Error}</p>)
                    )
            ) : <p> Nothing to  search!!! </p>}

        </div>
    )
}

export default SearchMovies 
import React, { useState } from 'react'
import Router from 'next/router'

const SearchResult = ({ searchresult }) => {
    const [currentMovie, setCurrentMovie] = useState('')
    let moviesList = []
    const movies = searchresult.data.Search

    const handleClick = (Id) => {
        setCurrentMovie(Id)
        Router.push(`/movies/[movieId]`, `/movies/${Id}`)
    }

    if (movies) {
        moviesList = movies.map((movie) => {
            return (
                <div key={movie.imdbID} className='movie' >
                    {/* <Link href="/movies/[movieId]" as={`/movies/${movieId}`} > */}
                    <a onClick={() => handleClick(movie.imdbID)}>
                        <img src={movie.Poster} className='moviePoster' alt='Movie poster' />
                        <p className='movieTitle'>{movie.Title} ({movie.Year})</p>
                    </a>
                    {/* </Link > */}
                </div>

            )
        })
    }
    else {
        moviesList.push(searchresult.data)
        moviesList = moviesList.map((movie) => {
            return (
                <div key={movie.imdbID} className='movie' >
                    <a onClick={() => handleClick(movie.imdbID)}>
                        <img src={movie.Poster} className='moviePoster' alt='Movie poster' />
                        <p className='movieTitle'>{movie.Title} ({movie.Year})</p>
                    </a>
                </div>
            )
        })
    }
    return (
        <div>
            <p>
                Search Results...
                </p>
            {moviesList}
        </div >
    )
}

export default SearchResult
import React from 'react'

const SearchResult = ({ searchresult }) => {
    let moviesList = []
    const movies = searchresult.data.Search
    console.log(movies)
    if (movies) {
        moviesList = movies.map((movie) => {
            return (
                <div key={movie.imdbID} className='movie'>
                    <img src={movie.Poster} className='moviePoster' alt='Movie poster' />
                    <span className='movieTitle'>{movie.Title} ({movie.Year})</span>
                </div>
            )
        })
    }
    else {
        moviesList.push(searchresult.data)
        moviesList = moviesList.map((movie) => {
            return (
                <div key={movie.imdbID} className='movie'>
                    <img src={movie.Poster} className='moviePoster' alt='Movie poster' />
                    <span className='movieTitle'>{movie.Title} ({movie.Year})</span>
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
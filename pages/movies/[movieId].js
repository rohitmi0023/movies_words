import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'

const Movies = () => {
    const [currentMovie, setCurrentMovie] = useState('')
    const router = useRouter()
    const { movieId } = router.query
    const fetchData = async () => {
        const res = await axios(`http://www.omdbapi.com/?i=${movieId}&type=movie&apikey=${process.env.OmdbKey}`)
        setCurrentMovie(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    let rating = currentMovie.Ratings
    if (rating) {
        rating = rating.map((each) => {
            return (
                <div>
                    <p>{each.Source}: {each.Value}</p>
                </div>
            )
        })
    }
    return (
        <Fragment>
            <Link href='/movies/[movieId]/dict' as={`/movies/${movieId}/dict`}><a>Go to it's dictionary</a></Link>
            {currentMovie ? < div >
                <p>Movie Name: {currentMovie.Title}</p>
                <p>Released on : {currentMovie.Released}</p>
                <img src={currentMovie.Poster} alt='Movie poster'></img>
                <p>Directed by: {currentMovie.Director}</p>
                <p>Genre: {currentMovie.Genre}</p>
                <span>{rating}</span>
            </div> : <p>Loading...</p>}
        </Fragment>
    )
}

export default Movies

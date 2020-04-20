import { useRouter } from 'next/router'

const dictionary = () => {
    const router = useRouter()
    const { movieId } = router.query
    return (
        <div>
            {movieId}
            <p>Hello dictionary!!!</p>
        </div>
    )
}

export default dictionary
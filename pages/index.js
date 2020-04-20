import Head from 'next/head'
import SearchMovies from '../components/SearchMovies'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Next App</title>
      </Head>
      <p>
        Hello Nextjs
      </p>
      <SearchMovies />
    </div>
  )
}

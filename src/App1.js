import React, {useState, useEffect} from 'react';
import './App.css';
import MoviesList1 from './components/MoviesList1';
import AddMovie1 from './components/AddMovie1';
function App1 () {
    const [movies, setMovies] = useState([]);
    const [moviesFirebase, setMoviesFirebase] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const dummyMovies = [
        {
          id: 1,
          title: 'Some Dummy Movie',
          openingText: 'This is the opening text of the movie',
          releaseDate: '2021-05-18',
        },
        {
          id: 2,
          title: 'Some Dummy Movie 2',
          openingText: 'This is the second opening text of the movie',
          releaseDate: '2021-05-19',
        },
      ];

    const fetchMovies = () => {
        setIsloading(true);
        setError(null);
        fetch('https://swapi.dev/api/films/').then(response => {
            console.log(response, 555);
            if (!response.ok) {
                setError(true);
                throw new Error ('Something went wrong ! ')
            }
            return response.json();
        }).then(data => {
            const transformMovies = data.results.map((movieData) => {
                return {
                    key: movieData.episode_id,
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                }
            })
            console.log(data, 777);
            setMovies(transformMovies);
            setIsloading(false);
        }).catch(error => {
            console.log(error);
            setError(error.message);
            setIsloading(false);
        });
    }
    
    async function fetchFirebase () {
      const responce = await  fetch('https://react-test-http-9a826-default-rtdb.firebaseio.com/movie.json')
      const data = await responce.json();
      const loadedMovies = [];
        console.log(data);
        for (let key in data) {
            console.log(data[key]);
            loadedMovies.push({
                id: key,
                title: data[key].title,
                openingText: data[key].openingText,
                releaseDate: data[key].releaseDate
            })
        }
        setMoviesFirebase(loadedMovies)
    }

    async function addMovieHandler (movie) {
        console.log(movie);
        const responce = await fetch('https://react-test-http-9a826-default-rtdb.firebaseio.com/movie.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
              }
        })
        const data = await responce.json();
        console.log(data, 777);
    }

    let contentFirebase = <MoviesList1 movies={moviesFirebase} />

    let content = <p>Found no movies</p>;
    if (movies.length > 1 ) {
        content = <MoviesList1 movies={movies}/>;
    }
    if (error) {
        content = <p>{error}</p>;
    }
    if (isLoading) {
        content = <p>Loading ...</p>;
    }
    return (
        <div>
            <section>
            <AddMovie1 onAddMovie={addMovieHandler}/>
            </section>
          <section>
             <button onClick={fetchMovies}>Fetch Movies</button>
             <button onClick={fetchFirebase}>Fetch Movies from Firebase</button>
         </section>
         <section>
            {/* {!isLoading && <MoviesList1 movies={movies}/>}
            {isLoading && <p>Loading ...</p>}
            {!isLoading && movies.length <= 0 && !error && <p>No movies found.</p>}
            {!isLoading && error && <p>{error}</p>} */}
            {content}
            {contentFirebase}
         </section>
        </div>
    )
}

export default App1;
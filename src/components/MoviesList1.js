import React from 'react';
import Movie1 from './Movie1';
import classes from './MoviesList.module.css';

const MoviesList1 = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie) => (
                <Movie1
                 key={movie.id}
                 title={movie.title}
                 releaseDate={movie.releaseDate}
                 openingText={movie.openingText}
                 />
            ))}
        </ul>
    )
}

export default MoviesList1;
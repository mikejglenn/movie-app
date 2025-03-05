import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { Movie, readMovies } from '../lib/data';
import { useUser } from '../components/useUser';

export function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    const { user } = useUser();

    useEffect(() => {
        async function load() {
            try {
                if (user) {
                    const movies = await readMovies();
                    setMovies(movies);
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [user]);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        return (
            <div>
                Error Loading Movies:{' '}
                {error instanceof Error ? error.message : 'Unknown Error'}
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container">
            <div className="row">
                <div className="column-full d-flex justify-between align-center">
                    <h1>Movies</h1>
                    <h3>
                        <Link to="/details/new" className="white-text form-link">
                            NEW
                        </Link>
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="column-full">
                    <ul className="entry-ul">
                        {movies.length === 0 && <span>There are no movies.</span>}
                        {movies.map((movie) => (
                            <MovieCard key={movie.movieId} movie={movie} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

type MovieProps = {
    movie: Movie;
};
function MovieCard({ movie }: MovieProps) {
    return (
        <li>
            <div className="row">
                <div className="column-half">
                    <iframe
                        className="input-b-radius form-image"
                        src="https://www.imdb.com/videoembed/vi2025309977"
                    ></iframe>
                </div>
                <div className="column-half">
                    <div className="row">
                        <div className="column-full d-flex justify-between">
                            <h3>{movie.title}</h3>
                            <Link to={`details/${movie.movieId}`}>
                                <FaPencilAlt />
                            </Link>
                        </div>
                    </div>
                    <p>{movie.summary}</p>
                    <p>{movie.link}</p>
                    <p>{movie.rating}</p>
                </div>
            </div>
        </li>
    );
}

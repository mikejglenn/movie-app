import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    type Movie,
    insertMovie,
    readMovie,
    removeMovie,
    updateMovie,
} from '../lib/data';

export function MovieForm() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie>();
    // const [photoUrl, setPhotoUrl] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const isEditing = movieId && movieId !== 'new';

    useEffect(() => {
        async function load(id: number) {
            setIsLoading(true);
            try {
                const movie = await readMovie(id);
                if (!movie) throw new Error(`Movie with ID ${id} not found`);
                setMovie(movie);
                // setPhotoUrl(entry.photoUrl);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        if (isEditing) load(+movieId);
    }, [isEditing, movieId]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newMovie = Object.fromEntries(formData) as unknown as Movie;
        if (isEditing) {
            updateMovie({ ...movie, ...newMovie });
        } else {
            insertMovie(newMovie);
        }
        navigate('/');
    }

    function handleDelete() {
        if (!movie?.movieId) throw new Error('Should never happen');
        removeMovie(movie.movieId);
        navigate('/');
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        return (
            <div>
                Error Loading Movie with ID {movieId}:{' '}
                {error instanceof Error ? error.message : 'Unknown Error'}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="column-full d-flex justify-between">
                    <h1>{isEditing ? 'Edit Movie' : 'New Movie'}</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row margin-bottom-1">
                    <div className="column-half">
                        <iframe
                            className="input-b-radius form-image"
                            src="https://www.imdb.com/videoembed/vi2025309977"
                        ></iframe>
                    </div>
                    <div className="column-half">
                        <label className="margin-bottom-1 d-block">
                            Title
                            <input
                                name="title"
                                defaultValue={movie?.title ?? ''}
                                required
                                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                                type="text"
                            />
                        </label>
                        <label className="margin-bottom-1 d-block">
                            Link
                            <input
                                name="link"
                                defaultValue={movie?.link ?? ''}
                                required
                                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                                type="text"
                                // onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                        <label className="margin-bottom-1 d-block">
                            Rating
                            <input
                                name="rating"
                                defaultValue={movie?.rating ?? ''}
                                required
                                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                                type="text"
                            // onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="row margin-bottom-1">
                    <div className="column-full">
                        <label className="margin-bottom-1 d-block">
                            Summary
                            <textarea
                                name="summary"
                                defaultValue={movie?.summary ?? ''}
                                required
                                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                                cols={30}
                                rows={10}
                            />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="column-full d-flex justify-between">
                        {isEditing && (
                            <button
                                className="delete-entry-button"
                                type="button"
                                onClick={() => setIsDeleting(true)}>
                                Delete Movie
                            </button>
                        )}
                        <button className="input-b-radius text-padding purple-background white-text">
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
            {isDeleting && (
                <div
                    id="modalContainer"
                    className="modal-container d-flex justify-center align-center">
                    <div className="modal row">
                        <div className="column-full d-flex justify-center" style={{ color: 'blue'}}>
                            <p>Are you sure you want to delete this movie?</p>
                        </div>
                        <div className="column-full d-flex justify-between">
                            <button
                                className="modal-button"
                                onClick={() => setIsDeleting(false)}>
                                Cancel
                            </button>
                            <button
                                className="modal-button red-background white-text"
                                onClick={handleDelete}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

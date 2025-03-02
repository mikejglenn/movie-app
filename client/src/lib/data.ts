import { User } from '../components/UserContext';

const authKey = 'um.auth';

type Auth = {
    user: User;
    token: string;
};

export function saveAuth(user: User, token: string): void {
    const auth: Auth = { user, token };
    localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
    localStorage.removeItem(authKey);
}

export function readUser(): User | undefined {
    const auth = localStorage.getItem(authKey);
    if (!auth) return undefined;
    return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
    const auth = localStorage.getItem(authKey);
    if (!auth) return undefined;
    return (JSON.parse(auth) as Auth).token;
}

export type UnsavedMovie = {
    title: string;
    summary: string;
    link: string;
    rating: number;
};
export type Movie = UnsavedMovie & {
    movieId: number;
};

export async function readMovies(): Promise<Movie[]> {
    const req = {
        headers: {
            Authorization: `Bearer ${readToken()}`,
        },
    };
    const res = await fetch('/api/movies', req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return (await res.json()) as Movie[];
}

export async function readMovie(movieId: number): Promise<Movie | undefined> {
    const req = {
        headers: {
            Authorization: `Bearer ${readToken()}`,
        },
    };
    const response = await fetch(`/api/movies/${movieId}`, req);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as Movie;
    return data;
}

export async function insertMovie(movie: UnsavedMovie): Promise<Movie> {
    movie.rating = +movie.rating;
    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${readToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    const res = await fetch('/api/movies', req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return (await res.json()) as Movie;
}

export async function updateMovie(movie: Movie): Promise<Movie> {
    movie.rating = +movie.rating;
    const req = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${readToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    const res = await fetch(`/api/movies/${movie.movieId}`, req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return (await res.json()) as Movie;
}

export async function removeMovie(movieId: number): Promise<void> {
    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${readToken()}`,
        },
    };
    const res = await fetch(`/api/movies/${movieId}`, req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

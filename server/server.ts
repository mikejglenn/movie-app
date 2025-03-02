import "dotenv/config";
import pg from "pg";
import argon2 from 'argon2';
import express from "express";
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware, authMiddleware } from "./lib";

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

type Movie = {
  movieId: number;
  title: string;
  summary: string;
  link: string;
  rating: number
  createdAt: string;
  updatedAt: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  ssl: false,
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt";
    `;
    const result = await db.query<User>(sql, [username, hashedPassword]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select "userId", "hashedPassword"
        from "users"
       where "username" = $1;
    `;
    const result = await db.query<User>(sql, [username]);
    const user = result.rows[0];
    if (!user) throw new ClientError(401, 'invalid login');
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password)))
      throw new ClientError(401, 'invalid login');

    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

app.get("/api/movies", authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select *
        from "movies"
        where "userId" = $1
        order by "movieId";
    `;
    const result = await db.query<Movie>(sql, [req.user?.userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/movies/:movieId', authMiddleware, async (req, res, next) => {
  try {
    const { movieId } = req.params;
    if (!Number.isInteger(+movieId)) {
      throw new ClientError(400, 'movieId needs to be a number');
    }
    const sql = `
      select *
      from "movies"
      where "movieId" = $1 and "userId" = $2;
    `;
    const params = [movieId, req.user?.userId];
    const result = await db.query<Movie>(sql, params);
    const movie = result.rows[0];
    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

app.post("/api/movies", authMiddleware, async (req, res, next) => {
  try {
    const { title, summary, link, rating } = req.body;
    if (!title || !summary || !link || !rating) {
      throw new ClientError(
        400,
        "title, summary, link, and rating are required"
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new ClientError(400, "rating must be an integer 1 to 5");
    }
    const sql = `
      insert into "movies" ("userId", "title", "summary", "link", "rating")
      values ($1, $2, $3, $4, $5)
        returning *;
    `;
    const params = [req.user?.userId, title, summary, link, rating];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

app.put("/api/movies/:movieId", authMiddleware, async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    if (!Number.isInteger(movieId) || movieId < 1) {
      throw new ClientError(400, "movieId must be a positive integer");
    }
    const { title, summary, link, rating } = req.body;
    if (!title || !summary || !link || !rating) {
      throw new ClientError(
        400,
        "title, summary, link, and rating are required"
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new ClientError(400, "rating must be an integer 1 to 5");
    }
    const sql = `
      update "movies"
        set "updatedAt" = now(),
            "title" = $1,
            "summary" = $2,
            "link" = $3,
            "rating" = $4
        where "movieId" = $5 and "userId" = $6
        returning *;
    `;
    const params = [title, summary, link, rating, movieId, req.user?.userId];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    if (!movie) {
      throw new ClientError(404, `cannot find movie with movieId ${movieId}`);
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/movies/:movieId", authMiddleware, async (req, res, next) => {
  try {
    const { movieId } = req.params;
    if (!Number.isInteger(+movieId)) {
      throw new ClientError(400, "movieId needs to be a number");
    }
    const sql = `
      delete from "movies"
      where "movieId" = $1 and "userId" = $2
      returning *;
    `;
    const params = [movieId, req.user?.userId];
    const result = await db.query(sql, params);
    const deletedMovie = result.rows[0];
    if (!deletedMovie) {
      throw new ClientError(404, "Movie not found");
    }
    res.status(204).json(deletedMovie);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});

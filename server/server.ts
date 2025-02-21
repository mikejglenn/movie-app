import "dotenv/config";
import pg from "pg";
import express from "express";
import { ClientError, errorMiddleware } from "./lib";

type Movie = {
  movieId: number;
  title: string;
  summary: string;
  link: string;
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

const app = express();
app.use(express.json());

app.get("/api/movies", async (req, res, next) => {
  try {
    const sql = `
      select *
        from "movies"
        order by "movieId";
    `;
    const result = await db.query<Movie>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post("/api/movies", async (req, res, next) => {
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
      insert into "movies" ("title", "summary", "link", "rating")
      values ($1, $2, $3, $4)
        returning *;
    `;
    const params = [title, summary, link, rating];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

app.put("/api/movies/:movieId", async (req, res, next) => {
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
        where "movieId" = $5
        returning *;
    `;
    const params = [title, summary, link, rating, movieId];
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

app.delete("/api/movies/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    if (!Number.isInteger(+movieId)) {
      throw new ClientError(400, "movieId needs to be a number");
    }
    const sql = `
      delete from "movies"
      where "movieId" = $1
      returning *;
    `;
    const params = [movieId];
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

set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."movies" (
  "movieId"     serial,
  "title"       text           not null,
  "summary"     text           not null,
  "link"        text           not null,
  "rating"      integer        not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("movieId")
);

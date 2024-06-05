
-- LANG
-- 1: English
-- 2: Spanish
-- 3: Italian

CREATE TABLE listener (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL,
  lang INTEGER
);

CREATE TABLE interested_speaker (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  lang INTEGER
)

CREATE TABLE speaker (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  country TEXT NOT NULL,
  team TEXT NOT NULL, -- filliation??
  title TEXT NOT NULL,
  keywords TEXT NOT NULL,
  lang INTEGER NOT NULL,
  theme TEXT NOT NULL
  summary TEXT NOT NULL,
  bibliography TEXT NOT NULL,
  presentation_id TEXT,
  presentation_link TEXT;
)
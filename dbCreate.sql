
-- LANG
-- 1: English
-- 2: Spanish
-- 3: Italian

CREATE TABLE listener (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL,
  lang INTEGER,
  UNIQUE(email)
);

CREATE TABLE speaker (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  authors TEXT NOT NULL,
  country TEXT NOT NULL,
  hosts TEXT NOT NULL, 
  title TEXT NOT NULL,
  lang INTEGER NOT NULL,
  keywords TEXT NOT NULL,
  theme TEXT NOT NULL,
  abstract TEXT NOT NULL,
  bibliography TEXT NOT NULL,
  presentation_id TEXT NOT NULL
);
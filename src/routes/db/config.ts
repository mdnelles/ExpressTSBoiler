import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(
  '/Users/mnells/Library/DBeaverData/workspace6/.metadata/mikes-data/chinook.db'
);

import * as SQLite from "expo-sqlite"

export const getDatabase = () => SQLite.openDatabase("database.db");

/* Migrations */

export const createChallengeTables = (db: SQLite.Database) => {
  const sqlString = `
    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      created_at DATE,
      target_date DATE,
      completed BOOLEAN,
      completed_at DATE
    )
  `

  db.transaction(
    ctx => ctx.executeSql(sqlString),
    ctx => console.error(ctx),
    () => console.log('Challenge table created!')
  )
}

export const createWorkoutTable = (db: SQLite.Database) => {
  const sqlString = `
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      total_weight DOUBLE,
      body_area VARCHAR(255)
    )
  `
  db.transaction(
    ctx => ctx.executeSql(sqlString),
    ctx => console.error(ctx),
    () => console.log('Workout table created!')
  )
}

export const runMigrations = (db: SQLite.Database) => {
  createChallengeTables(db)
  createWorkoutTable(db)
}
/* DOWN MIGRATIONS */
export const deleteChallengesTable = (db: SQLite.Database) => {
  const query = `DROP TABLE challenges`
  db.transaction(
    ctx => ctx.executeSql(query),
    ctx => console.error(ctx),
    () => console.log('Challenge table dropped!')
  )
}

export const deleteWorkoutTable = (db: SQLite.Database) => {
  const query = `DROP TABLE workouts`
  db.transaction(
    ctx => ctx.executeSql(query),
    ctx => console.error(ctx),
    () => console.log('Workout table dropped!')
  )
}

export const runDownMigrations = (db: SQLite.Database) => {
  deleteChallengesTable(db)
  deleteWorkoutTable(db)
}
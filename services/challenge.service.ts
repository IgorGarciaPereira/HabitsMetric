import { SQLError, SQLResultSet } from "expo-sqlite"
import { getDatabase } from "../utils/database"
import { IChallengeCreate } from "../types/challenge"

const db = getDatabase()

export const getChallengesService = (
  challengeId?: number,
  handleSuccess = (array: any[]) => {},
  handleError = (error: SQLError) => {}
) => {
  let params: (string | number | null)[] | undefined = undefined
  let sqlString = 'SELECT * FROM challenges'
  if (challengeId) {
    sqlString += ' WHERE id = ?'
    params = [challengeId]
  }

  db.transaction(ctx => ctx.executeSql(
    sqlString,
    params,
    (_, resultSet) => handleSuccess(resultSet.rows._array),
    (_, error) => {
      handleError(error)
      return false
    }
  ))
}

export const createChallengeService = (
  values: IChallengeCreate,
  handleSuccess = () => {},
  handleError = (error: SQLError) => {}
) => {
  const sqlString = `
    INSERT INTO challenges(name, created_at, target_date)
    VALUES (?, ?, ?)
  `

  db.transaction(
    ctx => ctx.executeSql(sqlString, [values.name, values.created_at, values.target_date], 
      () => handleSuccess(),
      (_, error) => { handleError(error); return false;}
    )
  )

}

export const completeChallengeService = (
  challengeId: number,
  handleSuccess = () => {},
  handleError = (error: SQLError) => {}
) => {
  const completeDate = new Date().toISOString().split('T')[0]
  const sqlString = `
    UPDATE challenges SET completed = true, completed_at = ?
    WHERE id = ?
  `

  db.transaction(
    ctx => ctx.executeSql(sqlString, [completeDate, challengeId], 
      () => handleSuccess(),
      (_, error) => { handleError(error); return false;}
    )
  )

}
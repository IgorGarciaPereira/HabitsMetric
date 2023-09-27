import * as SQLite from "expo-sqlite"
import { getDatabase } from "./database";

interface IBaseCrud {
  table: string;
}

export class BaseCRUD implements IBaseCrud {
  table: string;
  db: SQLite.Database;

  constructor(tableName: string, db: SQLite.Database | undefined = undefined){
    this.table = tableName
    if (db) {
      this.db = db
    } else {
      this.db = getDatabase()
    }
  }

  __convertObjectToQuery(filter: Object = {}){
    const values: string[] = []
    const sql: string[] = []

    Object.entries(filter).map(([key, value]) => {
      sql.push(`${key} = ?`)
      values.push(value)
    })

    return {sql: sql.join(","), values}
  }

  __convertObjectToInsertQuery(dictionary: Object = {}){
    const params: string[] = []
    const values: string[] = []
    const valuesQuery: string[] =[]

    Object.entries(dictionary).map(([key, value]) => {
      params.push(key)
      values.push(value)
      valuesQuery.push("?")
    })
    return { params: params.join(","), values, valuesQuery: valuesQuery.join(",")}
  }

  create(
    props: Object = {},
    handleSuccess = (array: any[]) => {},
    handleError = (error: SQLite.SQLError) => {}
  ){
    const { params, values, valuesQuery } = this.__convertObjectToInsertQuery(props)
    const sql = `INSERT INTO ${this.table}(${params}) VALUES (${valuesQuery})`

    this.db.transaction(
      ctx => ctx.executeSql(
        sql,
        values,
        (_, resultSet) => handleSuccess(resultSet.rows._array),
        (_, error) => {handleError(error); return false}
      )
    )
  }

  get(
    filter: Object = {},
    handleSuccess = (array: any[]) => {},
    handleError = (error: SQLite.SQLError) => {}
  ){
    let sql = `SELECT * FROM ${this.table}`
    let paramsQuery: (string | number | null)[] | undefined = undefined
    if (Object.keys(filter).length) {
      const {sql: criteria, values} = this.__convertObjectToQuery(filter)
      sql += ` WHERE ${criteria}`
      paramsQuery = values
    }

    this.db.transaction(
      ctx => ctx.executeSql(
        sql,
        paramsQuery,
        (_, resultSet) => handleSuccess(resultSet.rows._array),
        (_, error) => {handleError(error); return false}
      )
    )
  }

  delete(
    filter: Object = {},
    handleSuccess = (array: any[]) => {},
    handleError = (error: SQLite.SQLError) => {}
  ){
    const {sql, values} = this.__convertObjectToQuery(filter)
    const query = `DELETE FROM ${this.table} WHERE ${sql}`

    this.db.transaction(
      ctx => ctx.executeSql(
        query,
        values,
        (_, resultSet) => handleSuccess(resultSet.rows._array),
        (_, error) => {handleError(error); return false}
      )
    )
  }

  update(
    params: Object = {},
    objectId: number,
    handleSuccess = (array: any[]) => {},
    handleError = (error: SQLite.SQLError) => {}
  ){
    const { sql, values} = this.__convertObjectToQuery(params)
    const query = `UPDATE ${this.table} SET ${sql} WHERE id = ?`

    this.db.transaction(
      ctx => ctx.executeSql(
        query,
        [...values, objectId],
        (_, resultSet) => handleSuccess(resultSet.rows._array),
        (_, error) => {handleError(error); return false}
      )
    )
  }
}
import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: 'localhost',
    database: 'db_project',
    user: 'root',
    password: '',
  },
})

export async function sql_query(query_string,values = []) {
  try {
    const results = await db.query(query_string, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
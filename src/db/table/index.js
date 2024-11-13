import { pool } from "~/config/postgresql"
import fs from "fs"
import path from "path"


const createProductTable  = async(client)  => {

}

export const  initDBTable = async() => {
    const client = await pool.connect()
    const initScript = await  fs.readFileSync(path.join(__dirname,"initDBTable.sql"), "utf-8")

    // console.log("🚀 ~ file: index.js:14 ~ initScript:", initScript)
    try {
      await client.query(initScript)
      console.log('Database initialized successfully')
      await client.release()
  } catch (error) {
      console.error('Error initializing database', error)
  }

}

import { pool } from '~/config/postgresql'
import fs from 'fs'
import path from 'path'

// const { pool } = require("../../config/postgresql")
// const fs = require("fs")
// const path = require("path")

export const initDBTable = async () => {
  const client = await pool.connect()
  const initScript = await fs.readFileSync(
    path.join(__dirname, 'initDBTable.sql'),
    'utf-8'
  )
  // console.log("🚀 ~ file: index.js:14 ~ initScript:", initScript)
  try {
    await client.query(initScript)
    console.log('Database initialized successfully')
    await client.release()
  } catch (error) {
    console.error('Error initializing database', error)
  }
}

export const dropAllTables = async () => {
  const client = await pool.connect()
  const queryDropTable = ` 
    DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE'; END LOOP; END $$; 
    `
  const queryDropType = `
    DO $$ DECLARE r RECORD; BEGIN FOR r IN ( SELECT n.nspname as schema, t.typname as type FROM pg_catalog.pg_type t LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE t.typtype = 'e'  AND n.nspname NOT IN ('pg_catalog', 'information_schema') ) LOOP EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.schema) || '.' || quote_ident(r.type) || ' CASCADE'; END LOOP; END $$;
    `
  try {
    await client.query(queryDropTable)
    await client.query(queryDropType)
    await client.release()
    console.log('All tables dropped successfully')
  } catch (err) {
    console.error('Error dropping tables:', err)
  }
}

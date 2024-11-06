import pg from 'pg'
import { env } from './enviroments.js'
const { Pool } = pg

export const pool = new Pool
    ({
        user: env.DATABASE_USER,
        host: env.LOCAL_DEV_APP_HOST,
        database: env.DATABASE_NAME,
        password: env.DATABASE_PASSWORD,
        port: env.DATABASE_PORT
    })





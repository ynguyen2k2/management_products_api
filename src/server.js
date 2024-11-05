import express from 'express'
import { env } from './config/enviroments.js'
import { pool } from './config/postgresql.js'
const START_SERVER = () => {
    const app = express()
    app.use(express.json())
    if (env.BUILD_MODE === 'production') {
        app.listen(process.env.PORT, () => {
            // eslint-disable-next-line no-console
            console.log(
                `3. Production: Hi ${env.AUTHOR}, Back-end Server is running successfully at Port: ${process.env.PORT}/`
            )
        })
    } else {
        app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {


            // eslint-disable-next-line no-console
            console.log(
                `3. Local DEV Hi ${env.AUTHOR}, Back-end Server is running successfully at Host http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
            )
        })
    }
}


(async () => {
    try {
        START_SERVER();
        // const client = new pool.connect()
    } catch (error) {
        console.error(error)
    }
})()
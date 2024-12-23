import express from 'express'
import morgan from 'morgan'
import { env } from '~/config/enviroments'
import { APIs_V1 } from '~/routes/v1'
import { initDBTable, dropAllTables } from '~/db/table/index'
import swaggerUI from 'swagger-ui-express'
// import swaggerDocument from
const START_SERVER = () => {
  const app = express()

  if (env.BUILD_MODE === 'dev') {
    app.use(morgan('tiny'))
  }

  app.use(express.json())
  app.use('/v1', APIs_V1)

  if (env.BUILD_MODE === 'production') {
    app.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3. Production: Hi ${env.AUTHOR}, Back-end Server is running successfully at Port: ${env.PORT}/`
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
;(async () => {
  try {
    // initDBTable()
    START_SERVER()
    // dropAllTables()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
})()

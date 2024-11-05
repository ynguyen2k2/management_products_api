import 'dotenv/config'

export const env = {

    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

    BUILD_MODE: process.env.BUILD_MODE,

    LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
    LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,

    AUTHOR: process.env.AUTHOR
}


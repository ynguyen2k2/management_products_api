import express from 'express'

const hostname = 'localhost'
const port = 8017
app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
})
const START_SERVER = () => {
    const app = express()
}
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})
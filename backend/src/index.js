import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: "./src/.env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server connected at port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log('MongoDB connection failed: ', error)
    })
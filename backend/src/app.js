import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();


app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        credentials:true
    }
))
app.use(express.urlencoded({ extended: false, limit:"16kb" }))
app.use(express.json({ limit: "16kb" }))
app.use(express.static('public'))
app.use(cookieParser());

// import routes
import userRoute from './routes/user.routes.js'

// define routes
app.use('/api/v1/user', userRoute)

export { app };
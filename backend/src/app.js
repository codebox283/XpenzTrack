import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();


app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
))
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:false}))

// app.use('/api/v1/user', userRoute)

export { app };
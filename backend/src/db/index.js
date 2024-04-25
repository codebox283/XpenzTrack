import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        const instance = await mongoose.connect("mongodb+srv://user1:sahil1234@sahil.4snuw2q.mongodb.net/expenztrack")
        console.log('MongoDB Connected: ',instance.connection.host)
    } catch (error) {
        console.log(`MongoDB error : ${error.message}`)
        process.exit(1);
    }
}

export {connectDB}
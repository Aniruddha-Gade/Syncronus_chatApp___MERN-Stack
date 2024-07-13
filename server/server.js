
import express from 'express'
import dontenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/database.js';
import authRoutes from './routes/AuthRoutes.js';

dontenv.config() 

const PORT = process.env.PORT || 5000;
const app = express()

// middleware 
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.ORIGIN], // frontend link
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
        credentials: true
    })
);




const server = app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});


// connect Database
connectDB()


// mount routes
app.use('/api/auth', authRoutes)


// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK 😉👍 </p>
    </div>`);
})
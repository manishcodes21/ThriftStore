import express  from 'express'
import colors  from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
//.js is important in backend
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors"
//configure env
dotenv.config()

//database config
connectDB();

//rest oobject
const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
//rest api 
app.get('/',(req,res) => {
    res.send('<h1>Hello</h1>' )
})

const port=process.env.PORT 

//listen on port
app.listen(port,()=>{
    console.log(`Server is running on ${port}`.bgYellow.black)
})
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.js";
import { connectToCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectToCloudinary();

// middlewares
app.use(express.json());
app.use(cors());


// endpoints
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Backend API working');
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

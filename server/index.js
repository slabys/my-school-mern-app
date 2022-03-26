import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config({ path: "server/config.env" });

const app = express();
const PORT = process.env.PORT || 5000

import postsRoutes from './routes/posts.js'

app.use('/posts', postsRoutes)
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));

mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    }))
    .catch((err) => console.log(err));




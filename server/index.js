import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config({ path: "config.env" });

const app = express();
const PORT = process.env.PORT || 5000

import postsRoutes from './routes/posts.js'
import signUpRoutes from './routes/signUp.js'

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());

/**
 * ROUTES
 */

app.use('/posts', postsRoutes)
app.use('/signup', signUpRoutes)

/**
 * END ROUTES
 */

mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}/`);
    }))
    .catch((err) => console.log(err));

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from "dotenv"
import {fileURLToPath} from 'url';
dotenv.config({ path: "server/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000

import postsRoutes from './routes/posts.js'

app.use('/posts', postsRoutes)

mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
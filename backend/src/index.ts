import cors from "cors";
import express from "express";
import {routes} from "./routes";

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3005

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
    console.log(`Sellpy API listening on port ${PORT}!`);

    routes(app);
})

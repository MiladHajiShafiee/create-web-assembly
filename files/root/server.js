import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static("./"));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

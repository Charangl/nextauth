import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/userRoutes.js"


const corsOptions = {
    origin: [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();
const port = process.env.PORT || 8080;

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/APIROUTES/user', userRoutes);


app.listen(port, () => {
    console.log(`Serveur du Back (API) en cours d'exécution sur le port ${port}`);
});

// Gestion de l'erreur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`${err.message}`);
});

// Redirection de public sur uploads
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*ini adalah file utama untuk menjalankan server backend */
import express, { Request, Response, query, response } from "express";
import routeAdmin from "./router/adminrout";
import routeCar from "./router/carrout";
import routeRent from "./router/rentrout";

const app = express();
const PORT = 8000;
app.use(express.json());

app.use(routeAdmin);
app.use(routeCar);
app.use(routeRent);

app.listen(PORT, () => {
    console.log(`😋 Server running on port ${PORT}`)
});
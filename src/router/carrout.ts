import express from "express";
import { createCar, deleteCar, readCar, updateCar } from "../controller/car";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/car`, readCar);

// adress for add new event
app.post(`/car`, createCar);

app.put(`/car/:id_car`,updateCar);

app.delete(`/car/:id_car`, deleteCar);


export default app;

import express from "express";
import {  updateRent, deleteRent,login } from "../controller/rent";
import { createRent, readRent } from "../controller/rent";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/rent`, readRent);

// adress for add new event
app.post(`/rent`, createRent);

app.put(`/rent/:rent_id`,updateRent);

app.delete(`/rent/:rent_id`,deleteRent);

export default app;
import express from "express";
import { createAdmin, readAdmin,updateAdmin, deleteAdmin, login, } from "../controller/admin";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/admin`, readAdmin);

// adress for add new event
app.post(`/admin`, createAdmin);

app.put(`/admin/:id`,updateAdmin);

app.delete(`/admin/:id`, deleteAdmin);

app.post(`/admin/login`, login);


export default app;

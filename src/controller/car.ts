import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
const prisma = new PrismaClient();
import { sign } from "jsonwebtoken";

// create a function to "create" new seats
// asyncronous = fungsi yang berjalan secara pararel
const createCar = async (request: Request, response: Response) => {
    try {
        // read a request from body
        // const eventID = request.body.eventID;
        const nopol = request.body.nopol;
        const merk_mobil = request.body.merk_mobil;
        const harga_perhari = request.body.harga_perhari;

        //insert to seats table using prisma
        const newData = await prisma.car.create({
            data: {
                // eventID: eventID,
                nopol: nopol,
                merk_mobil: merk_mobil,
                harga_perhari: harga_perhari
            },
        });
        return response.status(200).json({
            status: true,
            message: `Cars been logged`,
            data: newData,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};


const readCar = async (request: Request, response: Response) => {
    try {
        const dataCar = await prisma.car.findMany();
        return response.status(200).json({
            status: true,
            message: `Car been logged in`,
            data: dataCar,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};
const updateCar = async (request: Request, response: Response) => {

    try {
        const id_car = request.params.id_car
        const nopol = request.body.nopol;
        const merk_mobil = request.body.merk_mobil;
        const harga_perhari = request.body.harga_perhari;
        const findCar = await prisma.car.findFirst({
            where: { id_car: Number(id_car) }
        })
        if (!findCar) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })  }
        const dataCar = await prisma.car.update({
            where: { id_car: Number(id_car) },
            data: {
                nopol: nopol || findCar.nopol,
                merk_mobil: merk_mobil || findCar.merk_mobil,
                harga_perhari: harga_perhari || findCar.harga_perhari
            }
        })
        return response.status(200).json({
            status: true,
            message: `Car has been updated`,
            data: dataCar
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
// create a function to delete event
const deleteCar = async (request: Request, response: Response) => {
    try {
        const id = request.params.id
        const findCar = await prisma.car.findFirst({
            where: { id_car: Number(id) }
        })
        if (!findCar) {
            return response.status(400).json({
                status: false,
                message: `Admin not found`
            })
        }
        const dataUser = await prisma.car.delete({
            where: { id_car: Number(id) }
        })
        return response.status(200).json({
            status: true,
            message: `Data Car has been deleted `
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
const login = async (request: Request, response: Response) => {
    try {
        const harga_perhari = request.body.harga_perhari
        const merk_mobil = request.body.merk_mobil
        const car = await prisma.car.findFirst(
            {
                where: { harga_perhari:harga_perhari, merk_mobil:merk_mobil}
            }
        )
        if (car) {
            const payload = car
            const secretkey = 'yummyyy'
            const token = sign(payload, secretkey)

            return response.status(200).json({
                status: true,
                message: "login success 😁",
                token: token
            })
        }
        else {
            return response.status(200).json({
                status: false,
                message: "Failed to LogIn 💀"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
export { createCar, readCar, updateCar, deleteCar, login };


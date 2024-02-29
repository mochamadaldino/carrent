import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
const prisma = new PrismaClient();
import { sign } from "jsonwebtoken";

// create a function to "create" new seats
// asyncronous = fungsi yang berjalan secara pararel
const createRent = async (request: Request, response: Response) => {
    try {
        // read a request from body
        // const eventID = request.body.eventID;
        const id_car = Number(request.body.id_car)
        const nama_penyewa = request.body.nama_penyewa;
        const lama_sewa = Number(request.body.lama_sewa);

        //insert to seats table using prisma

        const car = await prisma.car.findFirst({ where: { id_car: id_car } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: 'Data car not found'
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa

        const newData = await prisma.rent.create({
            data: {
                // eventID: eventID,
                nama_penyewa: nama_penyewa,
                lama_sewa: lama_sewa,
                total_bayar: total_bayar
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


const readRent = async (request: Request, response: Response) => {
    try {
        const dataRent = await prisma.rent.findMany();
        return response.status(200).json({
            status: true,
            message: `Rent been logged in`,
            data: dataRent,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};
const updateRent = async (request: Request, response: Response) => {

    try {
        const id_rent = request.params.id_rent
        const nama_penyewa = request.body.nama_penyewa;
        const lama_sewa = request.body.lama_sewa;


        // make sure that data has existed
        const findRent = await prisma.rent.findFirst({
            where: { id_rent: Number(id_rent) }
        })

        if (!findRent) {
            return response.status(400).json({
                status: false,
                message: `Data rent not found`
            })
        }

        const dataRent = await prisma.rent.update({
            where: { id_rent: Number(id_rent) },
            data: {
                nama_penyewa: nama_penyewa || findRent.nama_penyewa,
                lama_sewa: lama_sewa || findRent.lama_sewa
            }
        })

        return response.status(200).json({
            status: true,
            message: `Car has been updated`,
            data: dataRent
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
// create a function to delete event
const deleteRent = async (request: Request, response: Response) => {
    try {

        // get event id from url 
        const id_rent = request.params.id_rent

        // make sure that event is exist 
        const findRent = await prisma.rent.findFirst({
            where: { id_rent: Number(id_rent) }
        })

        if (!findRent) {
            return response.status(400).json({
                status: false,
                message: `Admin not found`
            })
        }

        // execute for delete event
        const dataUser = await prisma.rent.delete({
            where: { id_rent: Number(id_rent) }
        })

        // return response 
        return response.status(200).json({
            status: true,
            message: `Data Rent has been deleted `
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
        const lama_sewa = request.body.lama_sewa;
        const nama_penyewa = await prisma.rent.findFirst(
            {
                where: { lama_sewa:lama_sewa}
            }
        )
        if (nama_penyewa) {
            const payload = nama_penyewa
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
export { createRent, readRent, updateRent, deleteRent, login };


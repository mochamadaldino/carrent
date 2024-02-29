import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import md5 from "md5"
import { sign } from "jsonwebtoken";

// create a function to "create" new seats
// asyncronous = fungsi yang berjalan secara pararel
const createAdmin = async (request: Request, response: Response) => {
    try {
        // read a request from body
        // const eventID = request.body.eventID;
        const nama_admin = request.body.nama_admin;
        const email = request.body.email;
        const password = md5(request.body.password);

        //insert to seats table using prisma
        const newData = await prisma.admin.create({
            data: {
                // eventID: eventID,
                nama_admin,
                email,
                password
            },
        });
        return response.status(200).json({
            data : {
                status: true,
            message: `Admins been logged`,
            data: newData
            }
            
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};


const readAdmin = async (request: Request, response: Response) => {
    try {
        const dataUsers = await prisma.admin.findMany();
        return response.status(200).json({
            status: true,
            message: `Admins been logged in`,
            data: dataUsers,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};
const updateAdmin = async (request: Request, response: Response) => {

    try {
        const id = request.params.id
        const nama_admin = request.body.nama_admin;
        const email = request.body.email;
        const password = md5(request.body.password);


        // make sure that data has existed
        const findUser = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findUser) {
            return response.status(400).json({
                status: false,
                message: `Data admin not found`
            })
        }

        const dataUser = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                nama_admin: nama_admin || findUser.nama_admin,
                email: email || findUser.email,
                password: password || findUser.password
            }
        })

        return response.status(200).json({
            status: true,
            message: `Admin has been updated`,
            data: dataUser
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        });
    }
}
// create a function to delete event
const deleteAdmin = async (request: Request, response: Response) => {
    try {
        const id = request.params.id
        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findAdmin) {
            return response.status(400).json({
                status: false,
                message: `Admin not found`
            })
        }
        const dataUser = await prisma.admin.delete({
            where: { id: Number(id) }
        })

        return response.status(200).json({
            status: true,
            message: `Data Admin has been deleted `
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
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(
            {
              where: { email: email, password: password }
            }
          )
if (admin) {
    const payload = admin
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
export { createAdmin, readAdmin, updateAdmin, deleteAdmin, login };


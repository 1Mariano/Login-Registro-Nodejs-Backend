import {Request, Response} from 'express';
import bcrypt from 'bcrypt'
import {User} from "../models/user";
import jwt from 'jsonwebtoken';
export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username: username }
    })

    if (user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre: ${username}`
        })
    }
    const hastedPassoword = await bcrypt.hash(password, 10)

    try{
        await User.create({
            username: username,
            password: hastedPassoword
        })

        res.json({
            msg: `Usuario ${username} creado exitosamente`
        })
    }catch (error){
        res.status(400).json({
            msg: 'Upss ocurrio un error', error
        })
    }

}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: any = await User.findOne({where: { username: username }})
    if (!user){
        return res.status(400).json({
            msg: `no existe un usuario con el nombre ${username} en la BDD`
        })
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid){
        return res.status(400).json({
            msg: 'Password Incorrecto'
        })
    }

    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123');
    res.json(token)
}
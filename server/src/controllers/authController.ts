import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'

const loginController = (req: Request, res: Response) => {
    const {email, password} = req.body
} 
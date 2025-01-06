import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User, IUser } from '../models/User'
// import { validateToken } from '../middleware/validateToken'

const router: Router = Router()

router.post("/register",
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({min: 5}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if(!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({errors: errors.array()})
            return
        }
    try {
        const existingUser: IUser | null = await User.findOne({ email: req.body.email })
        console.log(existingUser)
        if (existingUser) {
            res.status(403).json({email: "Email already in use"})
            return
        }

        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(req.body.password, salt)

        await User.create({
            email: req.body.email,
            password: hash
        })

        res.status(200).json({message: "User registered successfully"})
        return 

    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
        return 
    }

    }
)

router.get('/list', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
        return 
    } catch (error: any) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return 
    }
});



export default router
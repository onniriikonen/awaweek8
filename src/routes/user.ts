import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
// import { validateToken } from '../middleware/validateToken'

const router: Router = Router();

const userList: IUser[] = [];

interface IUser {
    email: string;
    password: string;
}


router.post("/register",
    body("email").isEmail(),
    body("password").isLength({min: 3}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if(!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({errors: errors.array()})
            return
        }
    try {
        const existingUser = userList.find(user => user.email === req.body.email)
        if (existingUser) {
            res.status(403).json({email: "Email already in use"})
            return
        }

        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(req.body.password, salt)

        const user: IUser = {
            email: req.body.email,
            password: hash
        }

        userList.push(user)

        res.status(200).json({
            email: user.email,
            password: user.password,
        })

        return 

    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
        return 
    }

    }
)


router.post("/login",
    body("email").isEmail(),
    body("password").exists(),
    async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            const user  = userList.find(user => user.email === email)

            if (!user) {
                res.status(401).json({message: "Login failed"})
                return
            }

            const valid = bcrypt.compareSync(password, user.password);

            if (!valid) {
                res.status(401).json({ message: "Invalid email or password" });
                return
            } 

            const jwtPayload: JwtPayload = {
                email: user.email,
            };

            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: "2m"})

            res.status(200).json({success: true, token})

            return


        } catch(error: any) {
            console.error(`Error during user login: ${error}`)
            res.status(500).json({ error: 'Internal Server Error' })
            return
        }
    }
)




router.get('/list', async (req: Request, res: Response) => {
    try {
        const formattedUsers = userList.map(user => ({
                 email: user.email,
                 password: user.password,
             }))

        res.json(formattedUsers);
        return 
    } catch (error: any) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return 
    }
});



export default router
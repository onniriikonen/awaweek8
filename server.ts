import dotenv from "dotenv"
import express, { Express } from "express"
import morgan from "morgan"
import path from "path"
import userRouter from "./src/routes/user"

dotenv.config()


const app: Express = express()



const port : number = parseInt(process.env.PORT as string) || 8001



app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/api/user", userRouter)



app.listen(port, () => {
    console.log(`Server running on ${port}`)
});
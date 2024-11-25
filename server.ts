import express, { Express } from "express"
import path from "path"
import morgan from "morgan"
import router from "./src/index"

const app: Express = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)



app.listen(port, () => {
    console.log("server running")
})
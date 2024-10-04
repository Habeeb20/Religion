import express from "express"
import { getAllReport, registerReport } from "../controllers/report.controller.js"

const reportrouter = express.Router()

reportrouter.get("/getreports", getAllReport)
reportrouter.post("/postreports", registerReport)


export default reportrouter
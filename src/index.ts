import express from 'express'
import cors from 'cors'

import { createCompany } from './controllers/createCompany'

// Create a new express app instance
const port: number = 3000
const app: express.Application = express()

app.use(cors())
app.use(express.json())

app.post('/create-company', createCompany)
app.listen(port, () => console.log('App is listening on port 3000!'))
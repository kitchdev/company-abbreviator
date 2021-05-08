const express = require('express')
const cors = require('cors')

const createCompany = require('./controllers/createCompany')

const app = express()

const port = 3000

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/create-company', createCompany)

app.listen(port,  () => console.log(`app listening on port ${port}`))
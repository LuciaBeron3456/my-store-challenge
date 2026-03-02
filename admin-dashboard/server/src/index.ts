import express from 'express'
import cors from 'cors'
import reviewRoutes from './routes/reviews'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// You'll add your proxy routes here in Task B1
app.use('/api/reviews', reviewRoutes)

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})
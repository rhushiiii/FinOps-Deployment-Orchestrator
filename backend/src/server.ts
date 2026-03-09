// backend/src/server.ts
import dotenv from 'dotenv'
import { createApp } from './app.js'

dotenv.config({ override: true })

const PORT = process.env.PORT || 3000
const app = createApp()

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API: http://localhost:${PORT}/api/investigate`)
  console.log(`💚 Health: http://localhost:${PORT}/health`)
})
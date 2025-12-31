import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './config/db.js';

dotenv.config()

connectDb()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(
    `server is running on port ${port}`
)
})
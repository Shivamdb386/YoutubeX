import { app } from './app.js';
import dotenv from "dotenv"
import connectdb from './db/dbconnect.js'

dotenv.config({
  path: './env'
})


connectdb()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Backend app listening on port ${process.env.PORT}`)
      })
})
.catch((error)=>{
    console.log(error)
})


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/login',(req,res)=>{
//   res.send('<h1>You entered login page</h1>')
// })


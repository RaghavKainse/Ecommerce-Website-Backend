const app=require('./app')
const pool=require('./config/db')
require('dotenv').config();


async function startServer() {
    try{
        const connectionn =await pool.getConnection()
        console.log('Database Connect Successfully')
        connectionn.release()

        const PORT=process.env.PORT || 5000
        app.listen(PORT,()=>{
            console.log(`server Listen on http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.log('Some error to connect', error)
        process.exit(1)

    }
}

startServer()




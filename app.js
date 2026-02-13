const express =require('express')
const app=express()
const productRouter=require('./routes/product.routes')
const cors=require('cors')
const authRoutes=require('./routes/auth.routes')

// Body Parser Middleware



app.use(cors())
app.use(express.json())
app.use(express.urlencoded(true))
app.get('/',(req,res)=>{
    res.send('Api Working....')
})

app.use("/api/auth",authRoutes)
app.use("/api/admin",authRoutes)

app.use('/api/products',productRouter)


module.exports=app
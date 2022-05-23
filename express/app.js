const express = require('express')
const userRouter = require('./routes/user.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.get('/kotenok',(req,res)=>{
    res.send('Kotenok')
})

app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log('сервер запущен на порту ' + PORT))
const express = require('express')
const app = express()

// rutas
app.get('/', (req, res) => {
    res.send('Hola Node API')
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})
require('dotenv').config()
//Producto
const Product = require('./models/productModel');

//Express
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Mongodb
const mongoose = require('mongoose')
mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Conectado a mongoDB')
    app.listen(3000,()=>{
        console.log('listening on port 3000')
    })
}).catch((error) =>{
    console.log(error)
})

// Rutas
    //Añadir Productos
app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch{
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

    //Fetch Todos Los Productos
app.get('/products', async(req, res) => {
    try {
        //Empty {} para que haga fetch de todos
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

    //Fetch Un Solo Producto
 app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(400).json({message: `Producto con la ID ${id} no encontrado`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
    //Update Product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        //No encuentra el producto
        if(!product){
            return res.status(400).json({message: `Producto con la ID ${id} no encontrado`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

    //Delete Product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(400).json({message:`Producto con la ID ${id} no encontrado`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
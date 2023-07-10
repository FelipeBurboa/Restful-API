const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Porfavor ingrese el nombre del producto']
        },
        quantity:{
            type: Number,
            required: [true,'Porfavor ingrese la cantidad de producto'],
            default: 0
        },
        price:{
            type: Number,
            required: [true,'Porfavor ingrese el precio del producto'],
        },
        image:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
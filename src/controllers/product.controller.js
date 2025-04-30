const {AppDataSource} = require("../data-source");
const productRepo = AppDataSource.getRepository("Product");
const bcrypt = require('bcrypt');

// Get all Products

const getAllProducts = async (req, res) => {
    try {
        const Products = await productRepo.find();
    
        res.status(200).json(Products);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Create a new product
const createProducts = async (req, res) => {
    try {
        const {name, price, stock, unit, imageUrl, description} = req.body;
        if (name) {
            const newProduct = productRepo.create({name, price, stock, unit, imageUrl, description});
            await productRepo.save(newProduct);
            res.status(201).json({message: "Product created successfully", product: newProduct.product});
        }
    } catch (error) {
        res.status(500).json({message: "Error creating product", error: error.message});
    }
};

// Delete products by ID
const deleteProducts = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await userRepo.findOneBy({id: parseInt(productId)});
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        } else {
            await userRepo.delete(productId);
            res.status(200).json({message: "Product deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Error deleting product", error: error.message});
    }
}

// Update user by ID
const updateProducts = async (req, res) => {
    try {

        const {productId} = req.params;
        const {name, price, stock, unit, imageUrl, description} = req.body;
        const product = await productRepo.findOneBy({id: parseInt(productId)});
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        } else {
            if (product !== undefined) product.name = name;
            if (usprice !== undefined) product.price = price;
            if (stock !== undefined) product.stock = stock;
            if (unit !== undefined) product.unit = unit;
            if (imageUrl !==undefined) product.imageUrl = imageUrl;
            if (description !== undefined) product.description = description;

            const updatedUser = await productRepo.save(product);
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({message: "Error updating product", error: error.message});
    }
};

module.exports = {
    getAllProducts, createProducts, deleteProducts, updateProducts
};


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


// Get product by id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productRepo.findOne({ where: { id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new product
const createProducts = async (req, res) => {
    try {
        const products = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid input, expected array of products" });
        }
        const newProducts = productRepo.create(products);
        const savedProducts = await productRepo.save(newProducts);
        res.status(201).json({ message: "Products created successfully", products: savedProducts });
    } catch (error) {
        res.status(500).json({ message: "Error creating products", error: error.message });
    }
};

// Delete products by ID
const deleteProducts = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await productRepo.findOneBy({id: parseInt(productId)});
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        } else {
            await productRepo.delete(productId);
            res.status(200).json({message: "Product deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Error deleting product", error: error.message});
    }
}

// Update Product by ID
const updateProducts = async (req, res) => {
    try {

        // const {productId} = req.params;

        const {productId,name, price, stock, unit, imageUrl, description} = req.body;
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

            const updatedProduct = await productRepo.save(product);
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({message: "Error updating product", error: error.message});
    }
};

module.exports = {
    getAllProducts, createProducts, deleteProducts, updateProducts, getProductById
};


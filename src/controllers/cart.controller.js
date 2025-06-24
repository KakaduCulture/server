const {AppDataSource} = require("../data-source");
const cartRepo = AppDataSource.getRepository("Cart");
const bcrypt = require('bcrypt');

// Get cart by user id
const getCartByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const carts = await cartRepo.find({ where: { user_id } });

        if (!carts) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new cart
const createCart = async (req, res) => {
    try {
        const {user_id, name_product, product_id, price, imageUrl} = req.body;
        if (user_id && product_id) {
            const newCart = cartRepo.create({user_id, name_product, product_id, price, imageUrl});
            await cartRepo.save(newCart);
            res.status(201).json({message: "Cart created successfully", cart: newCart.name_product});
        }
    } catch (error) {
        res.status(500).json({message: "Error creating cart", error: error.message});
    }
};

// Delete products by ID
const deleteCarts = async (req, res) => {
    try {
        const {cartId} = req.params;
        const cart = await cartRepo.findOneBy({id: parseInt(cartId)});
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        } else {
            await cartRepo.delete(cartId);
            res.status(200).json({message: "Cart deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Error deleting cart", error: error.message});
    }
}


// Delete all cart items by user ID
const deleteCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await cartRepo.delete({ user_id: parseInt(userId) });

        res.status(200).json({ message: "All cart items deleted for user", deleted });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cart", error: error.message });
    }
};

// Update Product by ID
// const updateProducts = async (req, res) => {
//     try {

//         // const {productId} = req.params;

//         const {productId,name, price, stock, unit, imageUrl, description} = req.body;
//         const product = await productRepo.findOneBy({id: parseInt(productId)});
//         if (!product) {
//             return res.status(404).json({message: "Product not found"});
//         } else {
//             if (product !== undefined) product.name = name;
//             if (usprice !== undefined) product.price = price;
//             if (stock !== undefined) product.stock = stock;
//             if (unit !== undefined) product.unit = unit;
//             if (imageUrl !==undefined) product.imageUrl = imageUrl;
//             if (description !== undefined) product.description = description;

//             const updatedProduct = await productRepo.save(product);
//             res.status(200).json(updatedProduct);
//         }
//     } catch (error) {
//         res.status(500).json({message: "Error updating product", error: error.message});
//     }
// };

module.exports = {
    getCartByUserId , createCart, deleteCarts, deleteCartByUserId
};


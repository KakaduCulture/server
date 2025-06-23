const { AppDataSource } = require("../data-source");
const orderRepo = AppDataSource.getRepository("Order");
const itemRepo = AppDataSource.getRepository("Item");
const productRepo = AppDataSource.getRepository("Product");

//Handle logic to get all orders by payment status
const getOrderByPayment = async (req, res, paymentStatus) => {
    const { userId } = req.params;
    const Orders = await orderRepo.find({ where: { userId: parseInt(userId), payment: paymentStatus } });
    const orderInfo = [];
    if (!Orders) {
        return res.status(404).json({ message: "Order is not found" });
    }
    for(const order of Orders){
        const item = await itemRepo.find({ where: { orderId: order.id } });
        orderInfo.push({
            order: order,
            items: item 
        })     
    }
    res.status(200).json({orderInfo});

}

//Display the unpaid order 
const getUnpaidOrder = async (req, res) => {
    return getOrderByPayment(req, res, 0);
}

//Display all paid order to manage
const getPaidOrder = async (req, res) => {
    return getOrderByPayment(req, res, 1);
}


//Create a new unpaid order 
const createUnpaidOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { products } = req.body;

        //check unpaid order before creating
        const checkUnpaidOrder = await orderRepo.find({ where: { userId: parseInt(userId), payment: 0 } });
        if (!checkUnpaidOrder.length) {
            const newOrder = orderRepo.create({ userId, payment: 0 });
            const savedUser = await orderRepo.save(newOrder);

            //Save products in the order to item table
            for (const p of products) {
                await itemRepo.save({
                    orderId: newOrder.id,
                    productId: p.id,
                    quantity: p.quantity,
                    price: p.price
                })
            }
            if (savedUser != null) {
                return res.status(201).json({ message: "Order created successfully", newOrder });
            } else {
                res.status(500).json({ message: "Try latter", newOrder });
            }
        }
        res.status(500).json({ message: "You have an unpaid order." });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
}


// Cancel unpaid order
const deleteUnpaidOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        //check unpaid order before creating
        const checkUnpaidOrder = await orderRepo.findOne({ where: { userId: parseInt(userId), payment: 0 } });
        if (!checkUnpaidOrder) {
            res.status(500).json({ message: "You don't have unpaid order" });
        } else{
            const items = await itemRepo.find({ where: { orderId: checkUnpaidOrder.id } });
            await itemRepo.delete(items);
            await orderRepo.delete(checkUnpaidOrder.id);
            return res.status(201).json({ message: "Cancel order successfully" });
        }
       
    }
    catch (error) {
        res.status(500).json({ message: "Error cancelling order", error: error.message });
    }
}



// Modify the unpaid order
const modifyOrderInformation = async (req, res) => {
    const { address, mobileNumber, email } = req.body;
    const { userId } = req.params;
    const unpaidOrder = await orderRepo.findOne({ where: { userId: parseInt(userId), payment: 0 } });
    if (!unpaidOrder) {
        return res.status(404).json({ message: "Order not found" });
    } else {
        if (address !== undefined) unpaidOrder.address = address;
        if (mobileNumber !== undefined) unpaidOrder.mobileNumber = mobileNumber;
        if (email !== undefined) unpaidOrder.email = email;

        const updateUnpaidOrder = await orderRepo.save(unpaidOrder);

        if (updateUnpaidOrder != null) {
            return res.status(201).json({ message: "Order is updated" });
        } else {
            res.status(500).json({ message: "Error undating order" });
        }

    }

}

//Add more product in the  unpaid order
const addProduct = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.params;
    const unpaidOrder = await orderRepo.findOne({ where: { userId: parseInt(userId), payment: 0 } });
    const product = await productRepo.findOne({ where: { id: productId } });
    console.log("nhìn đây" + userId);
    if (!unpaidOrder || !product) {
        return res.status(404).json({ message: "Error updating order" });
    } else {
        await itemRepo.save({
            orderId: unpaidOrder.id,
            productId: productId,
            quantity: 1,
            price: product.price
        })
        return res.status(201).json({ message: "Item added successfully" });
    }

}

//Remove a product from unpaid order
const removeProduct = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.params;
    const unpaidOrder = await orderRepo.findOne({ where: { userId: parseInt(userId), payment: 0 } });
    const items = await itemRepo.find({ where: { orderId: unpaidOrder.id, productId: productId } });
    await itemRepo.delete(items)
    return res.status(201).json({ message: "Remove item successfully" });
}


//Change state of order from unpaid to paid
const payment = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentOrder = await orderRepo.findOne({ where: { userId: parseInt(userId), payment: 0 } });
        const items = await itemRepo.find({ where: { orderId: currentOrder.id } });
        for (const i of items) {
            const product = await productRepo.findOne({ where: { id: i.productId } });
            if (product.stock < i.quantity || !product) {
                console.log(i.quantity);
                return res.status(409).json({ message: "Product " + product.name + " out of stock" });
            } else {
                product.stock -= i.quantity;
            }
        }
        for (const i of items) {
            const product = await productRepo.findOne({ where: { id: i.productId } });
            product.stock -= i.quantity;
            await productRepo.save(product);
        }
        currentOrder.payment = 1;
        await orderRepo.save(currentOrder);
        res.status(200).json({ message: "Order paid" });
    } catch (error) {
        return res.status(500).json({ message: "Internal error", error: error.message });
    }
}



module.exports = {
    getUnpaidOrder, 
    getPaidOrder, 
    createUnpaidOrder,
    deleteUnpaidOrder, 
    modifyOrderInformation, 
    addProduct,
    removeProduct, 
    payment

};



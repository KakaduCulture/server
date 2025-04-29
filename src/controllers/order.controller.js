const { AppDataSource } = require("../data-source");
const orderRepo = AppDataSource.getRepository("Order");
const itemRepo = AppDataSource.getRepository("Item");



//Display the unpaid order (user login successfull)
const getUnpaidOrder = async (req, res) => {
    const { userId } = req.params;
    const currentOrder = await orderRepo.find({ where: { userId: parseInt(userId), payment: 0 } });
    if (!currentOrder.length) {
        return res.status(404).json({ message: "Your Shopping Bag is empty." });
    }
    res.json(currentOrder);
}

//Display all paid order to manage
const getPaidOrder = async (req, res) => {
    const { userId } = req.params;
    const paidOrders = await orderRepo.find({ where: { userId: parseInt(userId), payment: 1 } });
    if (!paidOrders.length) {
        return res.status(404).json({ message: "You didn't order before" });
    }
    res.json(paidOrders);
}

//Create a new order (haven't check stock and get price of the product yet)
const createOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const checkUnpaidOrder = await orderRepo.find({ where: { userId: parseInt(userId), payment: 0 } });
        if (!checkUnpaidOrder.length) {
            const newOrder = orderRepo.create({ userId, payment: 0 });
            const savedUser = await orderRepo.save(newOrder);
            console.log("length: ", savedUser.length);
            if (savedUser!= null) {
                return res.status(201).json({ message: "Order created successfully", newOrder });
            } else {
                res.status(500).json({ message: "Try latter", newOrder });
            }
        }
        res.status(500).json({ message: "You hava an unpaid order." });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
}

// Modify the unpaid order
const modifyOrder = async(req,res)=>{
    
}


// //Add products on a unpaid order
// const addOrder = async(req, res) =>{
//     const userId = req.user.id;
//     const currentOrder = await orderRepo.find({ where: { userId, payment:0 } });
//     //delete product component (should handle in order controller or product controller?)
// }


module.exports = {
    getUnpaidOrder, getPaidOrder, createOrder
    // , addOrder
};



const { AppDataSource } = require("../data-source");
const userRepo = AppDataSource.getRepository("User");

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepo.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (name) {
            const newUser = userRepo.create({ name,email });
            await userRepo.save(newUser);
            res.status(201).json(newUser);
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
};
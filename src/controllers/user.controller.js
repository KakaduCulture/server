const {AppDataSource} = require("../data-source");
const userRepo = AppDataSource.getRepository("User");
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userRepo.find();
        const safeUsers = users.map(({ password, ...rest }) => rest);
        res.json(safeUsers);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        if (name) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepo.create({name, username, password: hashedPassword});
            await userRepo.save(newUser);
            res.status(201).json({message: "User created successfully", username: newUser.username});
        }
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error.message});
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await userRepo.findOneBy({id: parseInt(userId)});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        } else {
            await userRepo.delete(userId);
            res.status(200).json({message: "User deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Error deleting user", error: error.message});
    }
}

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const {name, email} = req.body;
        const user = await userRepo.findOneBy({id: parseInt(userId)});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        } else {
            if (name !== undefined) user.name = name;
            if (email !== undefined) user.email = email;

            const updatedUser = await userRepo.save(user);
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({message: "Error updating user", error: error.message});
    }
};

module.exports = {
    getAllUsers, createUser, deleteUser, updateUser
};
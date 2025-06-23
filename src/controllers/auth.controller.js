const {AppDataSource} = require("../data-source");
const userRepo = AppDataSource.getRepository("User");
const {generateToken} = require('../middlewares/auth');
const bcrypt = require('bcrypt');

//User Log in
const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await userRepo.findOneBy({username: username});
        if (!user) {
            return res.status(401).json({message: "Username not exists"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid password"});
        }
        const token = generateToken(user);
        res.status(200).json({message: "Login successful", token: token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
              }
        });
    } catch (error) {
        res.status(500).json({message: "Error logging in", error: error.message});
    }
}

module.exports = {
    login
}
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

router.post('/create', (req, res) => {
    const { username, name, email, mobno, password, agree } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error("Error generating salt :", err);
            return res.status(500).json({ error: "Error generating Salt" });
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error("Error hashing password : ", err);
                return res.status(500).json({ error: "Error hashing Password" });
            }

            try {
                const createdUser = await userModel.create({
                    username,
                    name,
                    email,
                    mobno,
                    password: hash,
                    agree
                });

                const token = jwt.sign({ username, email }, process.env.JWT_SECRET);
                res.cookie("token", token);

                return res.status(200).json({
                    username: createdUser.username
                })
            } catch (err) {
                console.error("User Created error", err);
                return res.status(500).json({ err: "Failed to create user" });
            }
        })
    })
});

router.post('/login', async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }

        if (result) {
            let token = jwt.sign(
              { username: user.username, email: user.email },
              process.env.JWT_SECRET
            );
            res.cookie("token", token);
            res.status(200).json({ message: "Login Successfull ", username: user.username })
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    });
})

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out Successfully" });
})

module.exports = router;
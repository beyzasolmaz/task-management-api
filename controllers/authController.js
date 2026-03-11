const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkUserSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkUserSql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertUserSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(insertUserSql, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "database error" });
                }

                res.status(201).json({
                    message: "User registered successfully",
                    userId: result.insertId
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "server error" });
        }
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login successful",
                token: token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "server error" });
        }
    });
};
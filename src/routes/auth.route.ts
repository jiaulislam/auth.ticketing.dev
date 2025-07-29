import express, {Request, Response} from "express";
import status from "http-status-codes";

import {body, validationResult} from "express-validator";

const router = express.Router();

router.post("/login",
    [
        body("email").isEmail().withMessage("Must be a valid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    (req: Request, res: Response
    ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(status.BAD_REQUEST).json({ errors: errors.array()});
    }
    const { email, password } = req.body;
    if (email === "test@test.com" && password === "password") {
        res.send("Login successful");
    } else {
        res.status(status.BAD_REQUEST).send("Invalid credentials");
    }
});


router.post("/logout", (req, res) => {
    // Here you would typically clear the session or token
    res.send("Logout successful");
});

router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    // Here you would typically save the user to the database
    res.status(status.CREATED).send(`User ${username} created successfully`);
});

export {router as authRouter};
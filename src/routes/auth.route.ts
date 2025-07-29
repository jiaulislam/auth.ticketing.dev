import express, {Request, Response} from "express";
import status from "http-status-codes";

import {validationResult, body} from "express-validator";

const router = express.Router();

router.post("/login",
    [
        body("username").notEmpty().withMessage("Must be a valid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    (req: Request, res: Response
    ) => {
    const { username, password } = req.body;
    if (username === "test" && password === "password") {
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
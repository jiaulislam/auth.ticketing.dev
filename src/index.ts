import express from "express";
import {json} from "body-parser";

// Importing routes
import {authRouter, userRouter} from "./routes"

const app = express();


app.use(json())
app.use("/api/v1/users", userRouter);
app.use("/api/v1", authRouter); // this must be after userRouter to avoid conflicts


app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Auth Server is running on port ${process.env.SERVER_PORT || 3000}`);
})
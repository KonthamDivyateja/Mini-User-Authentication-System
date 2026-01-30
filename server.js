import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});

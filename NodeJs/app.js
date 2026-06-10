
import express from "express";
import expenseRoute from "./routes/expense.routes.js";
import connectDb from "./library/db.js";
const app = express();
const port = 2345;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connectDb();
app.get("/",(req,res) => {
    res.json({msg:"Hello World"})
})
app.use('/expense',expenseRoute)
app.listen(port, () => {
    console.log(`Hello Sakthi http://localhost:${port}`);
})
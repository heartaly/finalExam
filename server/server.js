const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let mongoConnection;

async function connectToDatabase(req, res, next) {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not configured");
        }

        mongoConnection ??= mongoose.connect(process.env.MONGO_URI);
        await mongoConnection;
        next();
    } catch (error) {
        mongoConnection = undefined;
        console.error("MongoDB connection failed:", error);
        res.status(503).json({ error: "Database is unavailable" });
    }
}

app.get("/",(req, res)=>{
    res.send("Server is running!");
});

app.use("/api", connectToDatabase);

app.get("/api/students", async (req, res)=>{
    const students = await Student.find();
    
    res.json(students);
});
 
app.post("/api/students", async (req, res) => {
    const { name, course, age } = req.body;
    const newStudent = new Student({ name, course, age });

    await newStudent.save();
    res.json(newStudent);
});


app.delete("/api/students/:id", async (req, res) => {
    const id = req.params.id;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted" });
}
);


app.put("/api/students/:id", async (req, res) => {
    const id = req.params.id;
    const { name, course, age } = req.body; 

    const updateStudent = await Student.findByIdAndUpdate(id,
        { name, course, age },
    )

    res.json(updateStudent);
});



app.listen(5000, () =>{
    console.log("Server running on port 5000");
});

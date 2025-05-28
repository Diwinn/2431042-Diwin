import express from "express";
import cors from "cors";
import connectDB from "./dbsetting.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let connection;

async function initialize() {
  try {
    connection = await connectDB();
  } catch (error) {
    console.error("Gagal Sambung", error);
  }
}

app.get("/", (req, res) => {
  res.send("Jalan Bang!");
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM Products");
    res.json(rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

initialize();
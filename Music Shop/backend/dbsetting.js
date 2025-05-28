import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "music",
  port: 3306,
};

async function connectDB() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("Connected");
    return connection;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default connectDB;
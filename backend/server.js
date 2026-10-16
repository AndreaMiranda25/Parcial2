const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const config = {
  user: "sa",
  password: "Password123!",
  server: "localhost",
  port: 1433,
  database: "ListadoClientes",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

//select
app.get("/api/clientes", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Clientes");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error SELECT:", err);
    res.status(500).json({ error: err.message });
  }
});

//insert
app.post("/api/clientes", async (req, res) =>{
  try {
    const { Nombre, Apellido, Correo, Direccion, DPI } = req.body;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellido", sql.VarChar, Apellido)
      .input("Correo", sql.VarChar, Correo)
      .input("Direccion", sql.VarChar, Direccion)
      .input("DPI", sql.VarChar, DPI)
      .query(`
        INSERT INTO Clientes (Nombre, Apellido, Correo, Direccion, DPI)
        VALUES (@Nombre, @Apellido, @Correo, @Direccion, @DPI)
      `);
    res.status(201).json({ mensaje: "Cliente insertado correctamente" });
  } catch (err) {
    console.error("Error INSERT:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});
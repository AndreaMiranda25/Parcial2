import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Direccion: "",
    DPI: "",
  });

  // ===== SELECT =====
  useEffect(() => {
    fetch("http://localhost:3000/api/clientes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al consultar la API");
        }
        return response.json();
      })
      .then(data => {
        setClientes(data);
        setCargando(false);
      })
      .catch(error => {
        console.error(error);
        setError("No se pudieron cargar los clientes");
        setCargando(false);
      });
  }, []);

  // ===== INSERT =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, DPI: form.DPI }),
      });

      if (!response.ok) {
        throw new Error("Error al insertar");
      }

      setForm({ Nombre: "", Apellido: "", Correo: "", Direccion: "", DPI: "" });
      setCargando(true);

      fetch("http://localhost:3000/api/clientes")
        .then(response => response.json())
        .then(data => {
          setClientes(data);
          setCargando(false);
        });

    } catch (error) {
      console.error(error);
      alert("No se pudo insertar el cliente");
    }
  };

  if (cargando) return <h2>Cargando clientes...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">

      <h1>Listado de Clientes</h1>

      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Agregar cliente</h2>

        <input name="Nombre" placeholder="Nombre" value={form.Nombre} onChange={handleChange} required />
        <input name="Apellido" placeholder="Apellido" value={form.Apellido} onChange={handleChange} required />
        <input name="Correo" placeholder="Correo" value={form.Correo} onChange={handleChange} required />
        <input name="Direccion" placeholder="Direccion" value={form.Direccion} onChange={handleChange} required />
        <input name="DPI" placeholder="DPI" value={form.DPI} onChange={handleChange} required />

        <button type="submit">Agregar</button>
      </form>

      <p className="total">
        Total de clientes: <strong>{clientes.length}</strong>
      </p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>DPI</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.ClienteID}>
              <td>{cliente.ClienteID}</td>
              <td>{cliente.Nombre}</td>
              <td>{cliente.Apellido}</td>
              <td>{cliente.Correo}</td>
              <td>{cliente.Direccion}</td>
              <td>{cliente.DPI}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_BACKEND_URL;

    try {
      const resp = await fetch(`${API}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      if (!resp.ok) {
        const data = await resp.json();
        setError(data.msg || "Error al registrar");
        return;
      }

      // Registro exitoso
      navigate("/login"); // redirige al Home

    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

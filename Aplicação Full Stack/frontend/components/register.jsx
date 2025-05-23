import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Usuário registrado com sucesso!");
      } else {
        setMsg(data.error || "Erro no registro");
      }
    } catch (err) {
      setMsg("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleRegister}>
        <input placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;

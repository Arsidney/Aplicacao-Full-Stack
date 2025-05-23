import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setError("");
        alert("Login realizado com sucesso!");
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {token && <p>Token: {token}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

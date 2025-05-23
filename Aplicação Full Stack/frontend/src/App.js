import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });

  const register = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers(); // Atualiza lista após cadastro
    } catch (err) {
      console.error("Erro ao registrar:", err.response?.data || err.message);
      alert("Erro ao registrar");
    }
  };

  const doLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      alert("Preencha email e senha!");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, login);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setLogin({ email: "", password: "" }); // Limpa campos
    } catch (err) {
      console.error("Erro ao fazer login:", err.response?.data || err.message);
      alert("Login inválido");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  if (!token) {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={doLogin}>
          <input
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            placeholder="Senha"
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Usuários</h1>

      {/* Botão de logout */}
      <button onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
      }}>
        Sair
      </button>

      <form onSubmit={register}>
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = "segredo_super_secreto";

// Conexão com o banco de dados PostgreSQL (ajuste se necessário)
const pool = new Pool({
  user: 'myappuser',
  host: 'postgres_db', // Nome do serviço no docker-compose
  database: 'myappdb',
  password: 'strongpassword',
  port: 5432,
});

// Middlewares
app.use(express.json());
app.use(cors());

// Criação/verificação da tabela 'users'
async function criarTabelaUsers() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("Tabela 'users' verificada/criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar/verificar a tabela 'users':", err);
  }
}

// Rota de registro
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (err) {
    console.error("Erro no registro:", err);
    if (err.code === "23505") {
      res.status(400).json({ error: "Usuário já existe." });
    } else {
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  }
});

// Rota de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro ao efetuar login." });
  }
});

// Middleware para autenticar token JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rota protegida (exemplo)
app.get("/api/protegida", autenticarToken, (req, res) => {
  res.json({ message: "Acesso autorizado à rota protegida!" });
});

// Rota pública para listar usuários (sem senhas)
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Inicializa o servidor
app.listen(port, async () => {
  await criarTabelaUsers();
  console.log(`Servidor backend rodando na porta ${port}`);
});

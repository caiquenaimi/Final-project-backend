const pool = require("../config/dbConfig");
const hash = require("bcrypt");
const { sign } = require("jsonwebtoken");
const dayjs = require("dayjs");
const crypto = require('crypto');


async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({
      total: result.rowCount,
      users: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar usuários",
    });
  }
}

async function getUserByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(name) LIKE $1",
      [`%${name.toLowerCase()}%`]
    );
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Usuário com nome ${name} não encontrado`,
      });
    }
    res.json({
      status: "success",
      message: "Usuário encontrado",
      usuários: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao buscar usuário",
    });
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const passwordHash = await hash.hash(password, 8);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, passwordHash]
    );
    res.status(201).json({
      status: "success",
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar usuário",
    });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const passwordHash = await hash.hash(password, 8);
    await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
      [name, email, passwordHash, id]
    );
    res.status(200).json({
      status: "success",
      message: `Usuário ${name} atualizado com sucesso`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(204).send(`Usuário com id ${id} deletado com sucesso`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByEmail(req, res) {
  const { email } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res){
  try {
    const { name, email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (user.rowCount === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
    const userAlreadyExists = await pool.query( 
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userAlreadyExists.rowCount === 0) {
      res.status(404).json({ message: "Usuário já existe" });
    }

    const passwordMatch = await hash.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Senha incorreta" });
  }
  const token = sign({}, "d2093a95-ed12-46fb-9bb4-8c16d28e6013", {
    subject: user.rows[0].id,
    expiresIn: "5m",
  });
  
  // expirar o login depois de 14 dias e ser obrigado a logar novamente
  const expiresIn = dayjs().add(14, "day").unix();
  const generateToken = () => {
    return crypto.randomBytes(15).toString('hex');
  }
  const generatertoken = generateToken();
  const generateRefreshToken = await pool.query('INSERT INTO rtoken (rtoken, expires, user_id) VALUES ($1, $2, $3) RETURNING *', [generatertoken, expiresIn, user.rows[0].id]);
  return res.status(200).json({
    token,
    refreshToken: generateRefreshToken.rows[0].rtoken,
  })}
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};

const pool = require("../config/dbConfig");
const hash = require("bcrypt");
const { sign } = require("jsonwebtoken");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt")
const crypto = require("crypto");

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
  let { name, email, password, birthdate } = req.body;

  const today = new Date();
  const birthdateDate = new Date(birthdate);
  const age = today.getFullYear() - birthdateDate.getFullYear();

  try {
    password = await bcrypt.hash(password, 8)
    await pool.query(
      "INSERT INTO users (name, email, password, birthdate, age) VALUES ($1, $2, $3, $4, $5)",
      [name, email, password, birthdate, age]
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
  console.log('Password before hash:', password);

}



async function loginUser(req, res) {
  
  try {
    const { email, password } = req.body;
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userQuery.rowCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const user = userQuery.rows[0];
    const userId = user.id.toString();

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = sign({}, "d2093a95-ed12-46fb-9bb4-8c16d28e6013", {
      subject: userId,
      expiresIn: "5m",
    });

    // expirar o login depois de 14 dias e ser obrigado a logar novamente
    const expiresIn = dayjs().add(14, "day").unix();
    const generateToken = () => {
      return crypto.randomBytes(15).toString("hex");
    };
    const generatertoken = generateToken();
    const generateRefreshToken = await pool.query(
      "INSERT INTO rtoken (rtoken, expires, user_id) VALUES ($1, $2, $3) RETURNING *",
      [generatertoken, expiresIn, user.id]
    );

    return res.status(200).json({
      token,
      refreshToken: generateRefreshToken.rows[0].rtoken,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    const token = await pool.query('SELECT * FROM rtoken WHERE rtoken = $1', [refreshToken]);

    if (!token.rows[0]) {
      return res.status(404).send({ message: "Token inválido ou expirado" });
    }

    const newToken = sign({}, 'ao6Al-mR50ruM4-vq231Vs-gO418uibMe', {
      subject: token.rows[0].token.toString(),
      expiresIn: '15m'
    });

    return res.status(200).send({ token: newToken, refreshToken: token.rows[0] });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar refresh", error: error.message });
  }
};

async function logOut (req, res) {
  try {
    const { refreshToken } = req.body;

    await pool.query('DELETE FROM rtoken WHERE rtoken = $1', [refreshToken]);

    return res.status(200).send({ message: "Usuário deslogado com sucesso" });
  }
  catch (error) {
    return res.status(500).send({ message: "Erro ao deslogar", error: error.message });
  }
}


async function updateUser(req, res) {
  const { id } = req.params;
  let { name, email, password, birthdate } = req.body;

  const today = new Date();
  const birthdateDate = new Date(birthdate);
  const age = today.getFullYear() - birthdateDate.getFullYear();

  try {
    password = await bcrypt.hash(password, 8)
    await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, birthdate = $4, age = $5 WHERE id = $6",
      [name, email, password, birthdate, age, id]
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


module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  loginUser,
  logOut,
  refreshToken
};

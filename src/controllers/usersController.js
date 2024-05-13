const pool = require("../config/dbConfig");

async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({
      status: "success",
      message: "Lista de usuários",
      quantity: result.rowCount,
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
      "SELECT * FROM heroes WHERE LOWER(name) LIKE $1",
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
      heroi: result.rows,
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
  try {
    const { name, email, password } = req.body;
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
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
    await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
      [name, email, password, id]
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
    res.status(204).send(
      `Usuário com id ${id} deletado com sucesso`
    );
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
};

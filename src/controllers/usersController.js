const pool = require("../config/dbConfig");

async function getAllUsers(req, res) {
  const query = `SELECT * FROM users`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM users WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  const { name, email } = req.body;
  const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;

  try {
    const result = await pool.query(query, [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`;

  try {
    const result = await pool.query(query, [name, email, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deleteUser = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};

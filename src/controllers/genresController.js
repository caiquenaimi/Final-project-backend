const pool = require("../config/dbConfig");

async function getAllGenres(req, res) {
  const query = `SELECT * FROM genres`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGenreByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM genres WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createGenre(req, res) {
  const { name } = req.body;
  const query = `INSERT INTO genres (name) VALUES ($1) RETURNING *`;

  try {
    const result = await pool.query(query, [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updateGenre = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const query = `UPDATE genres SET name = $1 WHERE id = $3 RETURNING *`;

  try {
    const result = await pool.query(query, [name, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deleteGenre = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM genres WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGenres,
  getGenreByName,
  createGenre,
  updateGenre,
  deleteGenre,
};

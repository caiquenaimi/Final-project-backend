const pool = require("../config/dbConfig");

async function getAllArtists(req, res) {
  const query = `SELECT * FROM artists`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getArtistByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM artists WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createArtist(req, res) {
  const { name, description } = req.body;
  const query = `INSERT INTO artists (name, description) VALUES ($1, $2) RETURNING *`;

  try {
    const result = await pool.query(query, [name, description]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updateArtist = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const query = `UPDATE artists SET name = $1, description = $2 WHERE id = $3 RETURNING *`;

  try {
    const result = await pool.query(query, [name, description, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deleteArtist = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM artists WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllArtists,
  getArtistByName,
  createArtist,
  updateArtist,
  deleteArtist,
};

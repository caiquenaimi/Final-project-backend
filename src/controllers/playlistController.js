const pool = require("../config/dbConfig");

async function getAllPlaylists(req, res) {
  const query = `SELECT * FROM playlists`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlaylistByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM playlists WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPlaylist(req, res) {
  const { name, description } = req.body;
  const query = `INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *`;

  try {
    const result = await pool.query(query, [name, description]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updatePlaylist = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const query = `UPDATE playlists SET name = $1, description = $2 WHERE id = $3 RETURNING *`;

  try {
    const result = await pool.query(query, [name, description, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deletePlaylist = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM playlists WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPlaylists,
  getPlaylistByName,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};

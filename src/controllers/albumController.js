const pool = require("../config/dbConfig");

async function getAllAlbums(req, res) {
  const query = `SELECT * FROM albums`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAlbumByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM albums WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createAlbum(req, res) {
  const { name, image, artist_id, release_year } = req.body;
  const query = `INSERT INTO albums (name, image, artist_id, release_year) VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      image,
      artist_id,
      release_year,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updateAlbum = async (req, res) => {
  const { name, image, artist_id, release_year } = req.body;
  const { id } = req.params;
  const query = `UPDATE albums SET name = $1, image = $2, artist_id = $3, release_year = $4 WHERE id = $5 RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      image,
      artist_id,
      release_year,
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM albums WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAlbums,
  getAlbumByName,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};

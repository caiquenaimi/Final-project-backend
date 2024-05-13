const pool = require("../config/dbConfig");

async function getAllMusics(req, res) {
  const query = `SELECT * FROM musics`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getMusicByName(req, res) {
  const { name } = req.params;
  const query = `SELECT * FROM musics WHERE name = $1`;

  try {
    const result = await pool.query(query, [name]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createMusic(req, res) {
  const { name, image, album_id, duration, genre_id } = req.body;
  const query = `INSERT INTO musics (name, image, album_id, duration, genre_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      image,
      album_id,
      duration,
      genre_id,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

updateMusic = async (req, res) => {
  const { name, image, album_id, duration, genre_id } = req.body;
  const { id } = req.params;
  const query = `UPDATE musics SET name = $1, image = $2, album_id = $3, duration = $4, genre_id = $5 WHERE id = $6 RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      image,
      album_id,
      duration,
      genre_id,
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

deleteMusic = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM musics WHERE id = $1`;

  try {
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMusics,
  getMusicByName,
  createMusic,
  updateMusic,
  deleteMusic,
};

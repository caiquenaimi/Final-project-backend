const pool = require("../config/dbConfig");

async function getAllAlbums(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM albums`);
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function getAlbumByName(req, res) {
  const { name } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM albums WHERE name = $1`, [
      name,
    ]);
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function createAlbum(req, res) {
  const { name, artist_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO albums (name, artist_id) VALUES ($1, $2) RETURNING *`,
      [name, artist_id]
    );
    res.json({
      message: "Album created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function updateAlbum(req, res) {
  const { name, artist_id } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE albums SET name = $1, artist_id = $2 WHERE id = $3 RETURNING *`,
      [name, artist_id, id]
    );
    res.json({
      message: "Album updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteAlbum(req, res) {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM albums WHERE id = $1`, [id]);
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllAlbums,
  getAlbumByName,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};

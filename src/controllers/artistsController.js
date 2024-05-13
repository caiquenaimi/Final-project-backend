const pool = require("../config/dbConfig");

async function getAllArtists(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM artists`);
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function getArtistByName(req, res) {
  const { name } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM artists WHERE name = $1`, [
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

async function createArtist(req, res) {
  const { name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO artists (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.json({
      message: "Artist created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function updateArtist(req, res) {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE artists SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );
    res.json({
      message: "Artist updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteArtist(req, res) {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM artists WHERE id = $1`, [id]);
    res.json({
      message: "Artist deleted successfully",
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllArtists,
  getArtistByName,
  createArtist,
  updateArtist,
  deleteArtist,
};

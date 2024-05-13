const pool = require("../config/dbConfig");

async function getAllGenres(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM genres`);
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function getGenreByName(req, res) {
  const { name } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM genres WHERE name = $1`, [
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

async function createGenre(req, res) {
  const { name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO genres (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.json({
      message: "Genre created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function updateGenre(req, res) {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE genres SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );
    res.json({
      message: "Genre updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteGenre(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM genres WHERE id = $1`, [id]);
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllGenres,
  getGenreByName,
  createGenre,
  updateGenre,
  deleteGenre,
};

const pool = require("../config/dbConfig");

async function getAllMembers(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM members`);
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error get all member", error);
    res.status(500).json({ error: error.message });
  }
}

async function getMemberByName(req, res) {
  const { name } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE LOWER(name) LIKE $1`,
      [`%${name.toLowerCase()}%`]
    );
    res.json({
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error get member by name", error);
    res.status(500).json({ error: error.message });
  }
}

async function createMember(req, res) {
  const { name, description, birthdate, image } = req.body;
  try {
    await pool.query(
      `INSERT INTO members (name, description, birthdate, image) VALUES ($1, $2, $3, $4)`,
      [name, description, birthdate, image]
    );
    res.status(201).json({ message: "Member created successfully" });
  } catch (error) {
    console.error("Error create member", error);
    res.status(500).json({ error: error.message });
  }
}

async function updateMember(req, res) {
  const { name, description, birthdate, image } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE members SET name = $1, description = $2, birthdate = $3, image = $4 WHERE id = $5`,
      [name, description, birthdate, image, id]
    );
    res.json({ message: "Member updated successfully" });
  } catch (error) {
    console.error("Error update member", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteMember(req, res) {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM members WHERE id = $1`, [id]);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error delete member", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMembers,
  getMemberByName,
  createMember,
  updateMember,
  deleteMember,
};

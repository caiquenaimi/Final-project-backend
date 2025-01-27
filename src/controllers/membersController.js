const pool = require("../config/dbConfig");

async function getAllMembers(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM members`);

    res.json({
      status: "success",
      message: "All members",
      quantity: result.rowCount,
      members: result.rows,
    });
  } catch (error) {
    console.error("Erro ao obter membros", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao obter membros",
    });
  }
}

async function getMemberByName(req, res) {
  const { name } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE LOWER(name) LIKE $1`,
      [`%${name.toLowerCase()}%`]
    );
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Member with name ${name} not found`,
      });
    }
    res.json({
      status: "success",
      message: "Member found",
      member: result.rows,
    });
  } catch (error) {
    console.error("Erro ao obter musica", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao obter musica",
    });
  }
}

async function createMember(req, res) {
  const { name, description, birthdate, image } = req.body;
  try {
    await pool.query(
      `INSERT INTO members (name, description, birthdate, image) VALUES ($1, $2, $3, $4)`,
      [name, description, birthdate, image]
    );
    res.status(201).json({
      status: "success",
      message: "Member created successfully",
    });
  } catch (error) {
    console.error("Erro ao criar membro", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar membro",
    });
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
    res.json({
      status: "success",
      message: "Member updated successfully",
    });
  } catch (error) {
    console.error("Error update member", error);
    res.status(500).json({
      status: "error",
      message: "Error update member",
    });
  }
}

async function deleteMember(req, res) {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM members WHERE id = $1`, [id]);
    res.json({
      status: "success",
      message: `Member with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error delete member", error);
    res.status(500).json({
      status: "error",
      message: "Error delete member",
    });
  }
}

module.exports = {
  getAllMembers,
  getMemberByName,
  createMember,
  updateMember,
  deleteMember,
};

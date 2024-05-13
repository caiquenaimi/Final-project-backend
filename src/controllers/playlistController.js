const pool = require("../config/dbConfig");

async function getAllPlaylists(req, res) {
  try {
    const result = await pool.query("SELECT * FROM playlists");
    res.status(200).json({
      status: "success",
      message: "Lista de playlists",
      quantity: result.rowCount,
      playlists: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar playlists", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar playlists",
    });
  }
}

async function getPlaylistByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query(
      "SELECT * FROM heroes WHERE LOWER(name) LIKE $1",
      [`%${name.toLowerCase()}%`]
    );
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Playlist com nome ${name} não encontrado`,
      });
    }
    res.json({
      status: "success",
      message: "Playlist encontrada",
      heroi: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar playlist", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao buscar playlist",
    });
  }
}


async function createPlaylist(req, res) {
  const { name, description } = req.body;
  try {
    await pool.query("INSERT INTO playlists (name, description) VALUES ($1, $2)", [name, description]);
    res.status(201).json({
      status: "success",
      message: "Playlist criada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar playlist", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar playlist",
    });
  }
}

async function updatePlaylist(req, res) {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    await pool.query("UPDATE playlists SET name = $1, description = $2 WHERE id = $3", [name, description, id]);
  } catch (error) {
    console.error("Erro ao atualizar playlist", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar playlist",
    });
  }
};

module.exports = {
  getAllPlaylists,
  getPlaylistByName,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};

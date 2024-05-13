const pool = require("../config/dbConfig");
const musicModel = require("../models/musicModel");

async function getAllMusics(req, res) {
  try {
    await pool.query("SELECT * FROM musics");
    res.status(200).json({
      status: "success",
      message: "Lista de músicas",
      quantity: result.rowCount,
      musics: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar músicas", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar músicas",
    });
  }
}

async function getMusicByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query(
      "SELECT * FROM musics WHERE LOWER(name) LIKE $1",
      [`%${name.toLowerCase()}%`]
    );
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Música com nome ${name} não encontrada`,
      });
    }
    res.json({
      status: "success",
      message: "Música encontrada",
      music: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar música", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao buscar música",
    });
  }
}

async function createMusic(req, res) {
  const { name, image, album_id, duration, genre_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO musics (name, image, album_id, duration, genre_id) VALUES ($1, $2, $3, $4, $5)",
      [name, image, album_id, duration, genre_id]
    );
    res.status(201).json({
      status: "success",
      message: "Música criada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar música", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar música",
    });
  }
}

async function updateMusic(req, res) {
  try {
    const { name, image, album_id, duration, genre_id } = req.body;
    const { id } = req.params;
    await pool.query(
      "UPDATE musics SET name = $1, image = $2, album_id = $3, duration = $4, genre_id = $5 WHERE id = $6",
      [name, image, album_id, duration, genre_id, id]
    );
    res.json({
      status: "success",
      message: "Música atualizada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar música", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar música",
    });
  }
}

async function deleteMusic(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM musics WHERE id = $1", [id]);
    res.status(200).json({
      status: "success",
      message: `Música com id ${id} deletada com sucesso`,
    });
  } catch (error) {
    console.error("Erro ao deletar música", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao deletar música",
    });
  }
}


async function addMusicToPlaylist(req, res) {
  const { playlistId, musicId } = req.body;

  try {
    await musicModel.addMusicToPlaylist(playlistId, musicId);
    res.status(201).json({ message: 'Music added to playlist successfully' });
  } catch (error) {
    console.error("Error adding music to playlist:", error);
    res.status(500).json({ error: error.message });
  }
}

async function removeMusicFromPlaylist(req, res) {
  const { playlistId, musicId } = req.body;

  try {
    await musicModel.removeMusicFromPlaylist(playlistId, musicId);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing music from playlist:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMusics,
  getMusicByName,
  createMusic,
  updateMusic,
  deleteMusic,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
};

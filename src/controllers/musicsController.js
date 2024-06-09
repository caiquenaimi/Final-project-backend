const pool = require("../config/dbConfig");
const musicModel = require("../models/musicModel");

async function getAllMusics(req, res) {
  try {
    const result = await pool.query("SELECT * FROM musics");
    const musics = result.rows;
    res.status(200).json({
      status: "success",
      message: "Lista de músicas",
      quantity: musics.length,
      musics: musics,
    });
  } catch (error) {
    console.error("Erro ao buscar músicas", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar músicas",
    });
  }
}
async function updateMusicFavoriteStatus(req, res) {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await pool.query(
      "UPDATE musics SET favorite = $1 WHERE id = $2 RETURNING *",
      [favorite, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Música não encontrada" });
    }

    res.status(200).json({
      status: "success",
      message: `Música ${result.rows[0].name} atualizada com sucesso`,
      music: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar música", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar música",
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

async function getMusicById(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID parameter is missing or invalid",
      });
    }

    const result = await pool.query("SELECT * FROM musics WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: `Música com id ${id} não encontrada`,
      });
    }
    res.json({
      status: "success",
      message: "Música encontrada",
      music: result.rows[0],
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
  const musics = req.body;

  if (!Array.isArray(musics)) {
    return res.status(400).json({
      status: "error",
      message: "O corpo da requisição deve ser um array de músicas",
    });
  }

  try {
    for (const music of musics) {
      const { name, image, duration, file, album, artist } = music;

      await pool.query(
        "INSERT INTO musics (name, image, duration, file, album, artist) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, image, duration, file, album, artist]
      );
    }

    res.status(201).json({
      status: "success",
      message: "Músicas criadas com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar músicas", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar músicas",
    });
  }
}

async function updateMusic(req, res) {
  const { name, image, duration, file, album, artist } = req.body;
  try {
    const { id } = req.params;
    await pool.query(
      "UPDATE musics SET name = $1, image = $2, duration = $3, file = $4, album = $5, artist = $6 WHERE id = $7",
      [name, image, duration, file, album, artist, id]
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
  const { musicId } = req.body;
  const { playlistId } = req.params;

  try {
    await musicModel.addMusicToPlaylist(playlistId, musicId);
    res.status(201).json({ message: "Music added to playlist successfully" });
  } catch (error) {
    console.error("Error adding music to playlist:", error);
    res.status(500).json({ error: error.message });
  }
}

async function removeMusicFromPlaylist(req, res) {
  const { playlistId, id } = req.params;
  try {
    await musicModel.removeMusicFromPlaylist(playlistId, id);
    res
      .status(200)
      .json({ message: "Music removed from playlist successfully" });
  } catch (error) {
    console.error("Error removing music from playlist:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMusics,
  getMusicByName,
  getMusicById,
  createMusic,
  updateMusicFavoriteStatus,
  updateMusic,
  deleteMusic,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
};

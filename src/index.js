require('dotenv').config();
const express = require('express');
const cors = require('cors');
const musicsRoutes = require('./routes/musicsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const genresRoutes = require('./routes/genresRoutes');
const artistsRoutes = require('./routes/artistsRoutes');
const albumRoutes = require('./routes/albumRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/', musicsRoutes);
app.use('/', usersRoutes);
app.use('/', genresRoutes);
app.use('/', artistsRoutes);
app.use('/', albumRoutes);
app.use('/', playlistRoutes);

app.listen(port, () => {
    console.log(`Server is running and routing on port ${port}`);
});

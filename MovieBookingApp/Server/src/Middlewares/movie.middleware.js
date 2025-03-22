const verifyCreateMovieRequest = (req, res, next) => {
    const { title, genre, poster, description, duration, language, releaseDate } = req.body;
    if (!title) {
        return res.status(400).send("Title is required");
    }
    if (!genre || genre.length === 0) {
        return res.status(400).send("Genre is required");
    }
    if (!poster) {
        return res.status(400).send("Poster is required");
    }
    if (!description) {
        return res.status(400).send("Description is required");
    }
    if (!duration) {
        return res.status(400).send("Duration is required");
    }
    if (!language) {
        return res.status(400).send("Language is required");
    }
    if (!releaseDate) {
        return res.status(400).send("Release date is required");
    }

    next();
}

module.exports = {
    verifyCreateMovieRequest
}
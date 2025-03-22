const { getAllMovies, getMovieDetails, createMovie, deleteMovie, updateMovie } = require("../Controllers/movie.controller");
const { verifyJWT, verifyRole } = require("../Middlewares/auth.middleware");
const { verifyCreateMovieRequest } = require("../Middlewares/movie.middleware");


module.exports = (app)=>{
    app.get("/movies", getAllMovies); //all users can access this route
    app.get("/movies/:id", getMovieDetails); //all users can access this route
    app.post("/movies", [verifyJWT, verifyRole, verifyCreateMovieRequest], createMovie); //only logged in users with admin role can access this route
    app.delete("/movies/:id", [verifyJWT, verifyRole], deleteMovie); //only logged in users with admin role can access this route
    app.put("/movies/:id", [verifyJWT, verifyRole], updateMovie); //only logged in users with admin role can access this route
}
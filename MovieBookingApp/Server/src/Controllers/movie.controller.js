const MovieModel = require("../Model/movie.model");
const mongoose = require("mongoose");

const getAllMovies = async (req,res)=>{
    try {
        const allMovies = await MovieModel.find({});
        return res.send({
            sucess:true, 
            message: "All Movies Fetched Successfully",
            data: allMovies
        });
    } catch(err) {
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const getMovieDetails = async (req,res)=> {
    try{
        const movieId = req.params.id;
        console.log(movieId);
        if (mongoose.Types.ObjectId.isValid(movieId) === false) {
            return res.status(400).send({
                sucess:false,
                message:"Invalid Movie ID"
            });
        }
        const movie = await MovieModel.findById(movieId);
        if(!movie){
            return res.status(404).send({
                sucess:false,
                message:"Movie not found"
            });
        }
        return res.send({
            sucess:true, 
            message: "Movie Details Fetched Successfully",
            data: movie
        });
    } catch(err) {
        return res.status(500).send({message:"Internal Server Error", data: err})
    }
}

const createMovie = async (req,res)=>{
    try {
        console.log(req.body);
        const newMovie = new MovieModel(req.body);
        const dbResponse = await newMovie.save();

        if (!dbResponse) {
            return res.status(500).send({ success: false, message: "Internal Server Error", data: dbResponse });
        } 
        return res.status(201).send({
            sucess:true, 
            message: "New Movie Created Successfully",
            data: dbResponse
        });
    } catch(err) {
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const deleteMovie = async (req,res)=> {
    try{
        const movieId = req.params.id;
        console.log(movieId);
        if (mongoose.Types.ObjectId.isValid(movieId) === false) {
            return res.status(400).send({
                sucess:false,
                message:"Invalid Movie ID"
            });
        }
        const movie = await MovieModel.findById(movieId);
        if(!movie){
            return res.status(404).send({
                sucess:false,
                message:"Movie not found"
            });
        }
        const dbResponse = await MovieModel.deleteOne({_id:movieId});
        if (!dbResponse) {
            return res.status(500).send({ success: false, message: "Internal Server Error", data: dbResponse });
        } 
        return res.send({
            sucess:true, 
            message: "Movie Deleted Successfully",
            data: dbResponse
        });
    } catch(err) {
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const updateMovie = async (req,res)=> {
    try{
        const movieId = req.params.id;
        if (mongoose.Types.ObjectId.isValid(movieId) === false) {
            return res.status(400).send({
                sucess:false,
                message:"Invalid Movie ID"
            });
        }
        const updateResponse = await MovieModel.findByIdAndUpdate(movieId, req.body , {new:true});
        if (!updateResponse) {
            return res.status(500).send({ success: false, message: "Internal Server Error", data: updateResponse });
        }
        return res.status(200).send({
            sucess:true, 
            message: "Movie Updated Successfully",
            data: updateResponse
        });
    } catch(err) {
        return res.status(500).send({message:"Internal Server Error", data: err})
    }
}

module.exports = {
    getAllMovies,
    getMovieDetails,
    createMovie,
    deleteMovie,
    updateMovie
}
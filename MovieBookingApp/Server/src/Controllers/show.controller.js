const { default: mongoose } = require("mongoose");
const MovieModel = require("../Model/movie.model");
const showModel = require("../Model/show.model");
const TheatreModel = require("../Model/theatre.model");


const createNewShow = async (req,res)=>{

    const {theatre,movie,showDate, showTime,totalSeats }= req.body;

    try{
        const theatreObj  = await TheatreModel.findById(theatre);

        if(theatreObj==null){
            return res.status(400).send({
                success:false,
                message:"TheatreId passed is invalid"
            })
        }

        const movieObj = await MovieModel.findById(movie);

        if(movieObj==null){
            return res.status(400).send({
                success:false,
                message:"MovieId passed is invalid"
            })
        }

        const newShow = new showModel(req.body);
        await newShow.save();

        return res.status(201).send({
            success:true,
            message:"New Show has been added Successfully"
        })


    }catch(err){
        return res.status(500).send({success:false,message:"Internal Server Error",err});
    }

}


const getAllShows = async (req,res)=>{

    try{
        console.log("Inside getAllShows");
        const allShows = await showModel.find({}).populate('movie').populate('theatre');
        console.log(allShows);

        return res.status(200).send({
            success:true,
            message:"All shows  have been fetched",
            data:allShows
        })

    }catch(err){
        return res.status(500).send({success:false,message:"Internal Server Error",err});
    }

}

const getThetresAndShowsByMovieId = async (req,res)=>{

    const {movieId} = req.params;
    const {date} = req.query;

    console.log("movieId:", movieId);
    console.log("date:", date);

    try{

        const movieObj = await MovieModel.findById(movieId);

        if(movieObj==null){
            return res.status(400).send({
                success:false,
                message:"MovieId passed is invalid"
            })
        }

        //all the shows for a given movie 
        const allShows = await showModel.find({movie:movieId, showDate:date}).populate('theatre').populate('movie');


        let showsByTheatreId = {};

        allShows.forEach((show)=>{

            const theatreId = show.theatre._id;

            if(!showsByTheatreId[theatreId]){
                showsByTheatreId[theatreId] = [];
            }

            showsByTheatreId[theatreId].push(show);

        })

        return res.status(200).send({
            success:true,
            data:showsByTheatreId
        })


    }catch(err){
        return res.status(500).send({success:false,message:"Internal Server Error",err});
    }
}

const getShowDetailsById = async (req,res)=>{
    const {showId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(showId)) {
        return res.status(400).send({
            success: false,
            message: "Invalid showId format"
        })
    }

    try{
        const showObj = await showModel.findById(showId).populate('movie').populate('theatre');

        if(showObj==null){
            return res.status(400).send({
                success:false,
                message:"showId passed is invalid"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Show details fetched successfully",
            data:showObj
        })

    }catch(err){
        return res.status(500).send({success:false,message:"Internal Server Error",err});
    }
}

module.exports = {
    createNewShow, 
    getAllShows,
    getThetresAndShowsByMovieId,
    getShowDetailsById
}
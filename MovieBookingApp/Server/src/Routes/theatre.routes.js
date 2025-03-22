const { createTheatre, getAllTheatres } = require("../Controllers/theatre.controller");
const { verifyJWT, verifyAdminOrPartner, verifyRole } = require("../Middlewares/auth.middleware");


module.exports = (app)=>{


    app.post("/theatres",[verifyJWT, verifyAdminOrPartner],createTheatre);
    app.get("/theatres",[verifyJWT, verifyRole],getAllTheatres);


}
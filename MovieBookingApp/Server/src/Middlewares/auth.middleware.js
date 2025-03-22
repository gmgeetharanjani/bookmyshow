const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user.model");

const verifyJWT = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication" });
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Not Authenticated. Invalid Token" });
            }
            const userId = decoded.userId;
            const userDetails = await UserModel.findById(userId);
            req.userDetails = userDetails;
            next();
        });
    } catch (err) {
        return res.status(401).send({ message: "Not Authenticated. Invalid Token" });
    }
}

const verifyRole = (req, res, next) => {
    if (req.userDetails.role !== "admin") {
        return res.status(403).send({ message: `User with id ${req.userDetails._id} is not authorized to access this resource` });
    }
    next();
}

const verifyAdminOrPartner = (req,res,next)=>{

    const role = req.userDetails.role;

    if(role!="admin" && role !="partner"){
        return res.status(403).send({success:false,message:`User with id:${req.userDetails._id} is unauthorised to access this route`});
    }

    next();
}


module.exports = {
    verifyJWT,
    verifyRole,
    verifyAdminOrPartner
}
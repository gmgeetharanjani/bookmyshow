const UserModel = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const onRegister = async (req,res)=>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).send({sucess:false,message:"Missing Fields for Register"})
    }

    
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const existingUser = await UserModel.findOne({email:email});

        if(existingUser){
            return res.status(400).send({success:false, message:"User with this email already exists"});
        }

        const newUser = new UserModel(req.body);

         await  newUser.save();

         return res.status(201).send({success:true,message:"Registration Successful, Please login"});


    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }


}


const onLogin = async (req,res)=>{

    const {email, password} = req.body;
    console.log(email, password);

    if(!email || !password){
        return res.status(400).send({success:false,message:"Either of Email/Password is missing!"});
    }

    try{

        const existingUser = await UserModel.findOne({email:email});

        
        if(!existingUser){
            return res.status(404).send({success:false, message:`User with email ${email} does not exists`});
        }

        const hashedPassword = existingUser.password;

        // Simplified password validation (assuming passwords are stored in plain text, which is not recommended)
        if(!bcrypt.compareSync(password, hashedPassword)){
            return res.status(400)
            .send({success:false, message:`Sorry! Invalid Password entered!`});
        }

        // generate a new JWT token for the user and send it back to the user

        const token = jwt.sign({userId: existingUser._id}, process.env.SECRET_KEY);

        return res.send({
            success:true,
            message:"You have successfully logged in",
            accessToken:token
        })


    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const getAllUsers = async (req,res)=>{
    try{
        const allUsers = await UserModel.find({});
        return res.send(allUsers);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const getCurrentUser = async (req,res)=>{
    try{
        const token = req.headers['access-token'];
        if (!token) return res.status(403).send({ message: "No token provided!" });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized! Invalid token" });
            }
            console.log(decoded);
            req.userId = decoded.userId;
        });
        const user = await UserModel.findById(req.userId);
        return res.send(user);
    } catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}

module.exports={
    onRegister,
    onLogin,
    getAllUsers,
    getCurrentUser
}
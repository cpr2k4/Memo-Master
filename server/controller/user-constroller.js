import User from "../models/User.js";
// import bcrypt from "bcrypt";

export const handleSignup = async (req, res) => {
    try {
        const {username,email,password} = req.body;
        const userName = await User.findOne({ username });
        const userEmail = await User.findOne({ email });

        if (userName || userEmail) {
        return res.status(409).json({ failure: "User already exists!" });
        }
        // Hash the password before saving it to the database
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();

        return res.status(201).json({ success: "User saved successfully..." });
    }
    catch (err) {
        return res.status(500).json({ failure: "Server error at handleSignup controller Backend..." });
    }
};

export const handleLogin = async(req,res)=>{
    try{
        console.log(req.sessionID);
        // if(req.session.authenticated){
        //     console.log("Arnold");
        //     return res.json(req.session);
        // }
        const {email,password} = req.body;
        const user = await User.findOne({email});
       
        if(!user)
            return res.status(404).json({message:"Failure, User not found!"});
        
        if(password != user.password)
            return res.status(404).json({message:"Incorrect email or password"});
        
        req.session.authenticated = true;
        req.session.name = user.username; //set the session
        return res.status(200).json({message:req.session});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error at handleLogin Controller backend..."});
    }
}

export const handleLogout = (req, res) => {
    try {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          // Handle session destruction error
          return res.status(500).json({ message: 'Failed to logout. Please try again later.' });
        }
  
        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' });
  
        // Send a successful logout response
        res.status(200).json({ message: 'Logout successful.' });
      });
    } catch (err) {
      // Handle unexpected errors
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  };
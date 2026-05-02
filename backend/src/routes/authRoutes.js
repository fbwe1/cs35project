const express = require("express");
const supabase = require('../configs/supabaseClient.js');
const router = express.Router()


// sign up route
router.post("/signup", async (req, res) => {
    //todo: use regex to determine it's a ucla email or another simpler method if possible
    // implemented main logic, but still needs more error handling + bug fixes, maybe login w/ google too
    try{
        //account details
        const {username, ucla_email, password} = req.body;
        const { data, error } = await supabase.auth.signUp(
            {
              email: ucla_email,
              password: password,
              options: {
                data: {
                  first_name: username, 
                }
              }
            }
          )
        if(error){
            return res.json({
                status:false, 
                message: "User Already Exists"})
        }
        else{
            return res.json({
                status:true, 
                message : "User Was Created Successfully"})
        }
    }catch(error){
        console.log(error);
        return res.status(400).send(error.message);
    }

})
// login route
router.post("/login", async (req,res) =>{
    try{
        const {ucla_email, password} = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: ucla_email,
        password: password,
      })
      if (error){
        return res.json({
            status:false, 
            message: "User Not Found"})
      }else{
        return res.status(200).json({success: true})
      }
    } catch(error){ 
        console.log(error)
        return res.status(400).send(error.message)
    }
})

//export so that auth can be used in the app
module.exports=router; 
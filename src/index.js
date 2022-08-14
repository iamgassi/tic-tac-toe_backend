const express=require('express')
const app =express();
const userModel =require('../database/models/user')
const bcrypt=require('bcrypt')
const corsModule=require('cors')
const db=require('../database/index')
db.init()

app.use(corsModule())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json(arr)
})
// getting user
app.route('/user').get((req,res)=>{
    userModel.find( {} )
		.then(function(data)
    {
		res.json(data);
      
      if(data === null)
      {
		res.end("No data")
      } 
      
    }).catch(function(err)
    {
        res.json({msg:err});	
        console.log(err)
    })

})

//for register user

app.post('/register',(req,res)=>{
	const response=req.body
	const username=response.username;
    const email=response.email
	const password=response.password;
	const repeatpass=response.repeatPass;

	if(!username)
	{
			res.json({ msg:"Please Enter Username"})
			return
	}
		if(!password)
	{
        res.json({ msg:"Please Enter Password"})
			
			return
	}
    if(!email)
	{
        res.json({ msg:"Please Enter Email"})
			
			return
	}
    if(!repeatpass)
	{
        res.json({ msg:"Please Enter Confirm Password"})
			
			return
	}

  if(username && (password ===repeatpass))
  {
    // bcrypt.hash(password,10).then(function(hash) {
    // console.log(typeof(hash));
					userModel.create(
						{
							username:username,
							// password:hash,
							password:password,
                            email:email

						}
					)
					.then(()=>
					{  
						 res.json({ msg:"Successfully registered"});
					})
					.catch((err)=>
					{
						console.log(err)
						res.json({ msg:"User Already Exist!!"})
					})
		// })
	}
	else
	{
    res.json({ msg:"Enter a valid detail || Password mismatch"})
	}


})

app.listen(8000,()=>{
    console.log("Listening on 8000")
})
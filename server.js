const express=require('express');
const session=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(session);
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const app=express();
const mongouri="mongodb+srv://new_user:hello123@cluster0.km9qoac.mongodb.net/Sessions?retryWrites=true&w=majority";
const UserModel=require("./models/user");
mongoose.connect(mongouri,{
    useNewUrlParser:true,

useUnifiedTopology:true
}).then((result)=>
{
    console.log('Database connected');
})
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
const store=new MongoDBSession({
    uri:mongouri,
    collection:"Wictronix project"

})
app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
    store: store
}));
app.get('/',(req,res)=>
{
    
    res.render('index');
});
app.get('/login',(req,res)=>
{
    res.render('login');
})
app.get('/register',(req,res)=>
{
    res.render('register');
})

app.post('/register',async(req,res)=>
{
   const {username,email,password}=req.body;
   let user= await UserModel.findOne({email});
   if(user)
   {
    return  res.redirect('/register')
    
   }
   const passw=password;
   const salt=12;
    const hashedPsw=await bcrypt.hash(passw,salt);
   user=new UserModel({
       username,
       email,
       password:hashedPsw
   });
   await user.save();
   res.redirect('/login');
})



app.listen(5000,console.log('Listening for requests on port 5000'));
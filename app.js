const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog')
const { listen } = require('express/lib/application');
const session=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(session);

const bcrypt=require('bcrypt');

const mongouri="mongodb+srv://new_user:hello123@cluster0.km9qoac.mongodb.net/Sessions?retryWrites=true&w=majority";
const AdminModel=require("./models/admin");
const StudentModel=require("./models/student");
const { redirect } = require('express/lib/response');
//express app
const app=express();
//register view engine
app.set('view engine','ejs');
//connect to MongoDb

const dbURI="mongodb+srv://new_user:hello123@cluster0.km9qoac.mongodb.net/node-tuts?retryWrites=true&w=majority"
// mongoose.connect(dbURI).then((err)=>console.log('Database connected')).catch(()=>console.log(err));
//middleware&static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.set('view engine','ejs');
const store=new MongoDBSession({
    uri:mongouri,
    collection:"Wictronix project"
});
// })
// app.get('/',(req,res)=>
// {
// //res.send('<p>Home page</p>');
// res.redirect('/blogs');//It's going to look for an absolute path hence we
//         });        //we pass another object
//         app.get('/blogs',(req,res)=>
// {
// Blog.find().sort({createdAt:-1}).then((result)=>
// {

// res.render('index',{title:'All blogs',blogs:result})


// }).catch((err)=>console.log(err));
// })
// app.get('/about',(req,res)=>
// {
// //res.send('<p>Home page</p>');
// res.render('about',{title:'About'});
// });
// app.get('/about-us',(req,res)=>
// {
// res.redirect('/about',);
// });

// const blogs=[
//         {title:'Hikaru',snippet:"Arrogant Chess Grandmaster"},{title:"PArty",snippet:'Event done for fun'}
// ];
// app.get('/create',(req,res)=>
// {
        
//         res.render('create',{title:'Write blog'});
        

// });
// app.get('/',(req,res)=>
// {
    
//     res.render('index');
// });
app.get('/registeradmin',(req,res)=>
{
    res.render('registeradmin');
})
app.get('/registerstudent',(req,res)=>
{
    res.render('registerstudent');
})
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
    store: store
}));
mongoose.connect(mongouri,{
    useNewUrlParser:true,

useUnifiedTopology:true
}).then((result)=>
{
    console.log('Database connected');
})

app.post('/registeradmin',async(req,res)=>
{
   const {username,email,password}=req.body;
   let admin= await AdminModel.findOne({email});
   if(admin)
   {
    return  res.redirect('/registeradmin')
    
   }
   
   const salt=12;
    const hashedPsw=await bcrypt.hash(password,12);
   admin=new AdminModel({
       username:username,
       email:email,
       password:hashedPsw
   });
   await admin.save();
   res.redirect('/loginadmin');
})

app.post('/registerstudent',async(req,res)=>
{
   const {admisno,email,password}=req.body;
   let student= await StudentModel.findOne({email});
   if(student)
   {
    return  res.redirect('/registerstudent')
    
   }
   
   const salt=12;
    const hashedPsw=await bcrypt.hash(password,12);
   student=new StudentModel({
       admisno:admisno,
       email:email,
       password:hashedPsw
   });
   await student.save();
   res.redirect('/loginstudent');
})

const isAuth=(req,res,next)=>
{
    if(req.session.isAuth)
    {
        next();
    }
    else{
        res.redirect('/loginadmin');
    }
}
const isCorr=(req,res,next)=>
{
    if(req.session.isAuth)
        {
            next();

        }
        else{
            res.redirect('/loginstudent');
        }
}

app.get('/loginadmin',(req,res)=>
{
    res.render('loginadmin');
})
app.post('/loginadmin',async(req,res)=>
{
    const{email,password}=req.body;
const admin=await AdminModel.findOne({email});
if(!admin)
{
    return res.redirect('/registeradmin');
}
const isMatch=await bcrypt.compare(password,admin.password);
if(!isMatch)
{
    return res.redirect('/loginadmin');
}
if(isMatch)
{
    req.session.isAuth=true;
    return res.redirect('/dashboard');
}
})
app.get('/loginstudent',(req,res)=>
{
    res.render('loginstudent');
})
app.post('/loginstudent',async(req,res)=>
{
    const{email,password}=req.body;
const student=await StudentModel.findOne({email});
if(!student)
{
    return res.redirect('/registerstudent');
}
const isMatch=await bcrypt.compare(password,student.password);
if(!isMatch)
{
    return res.redirect('/loginstudent');
}
if(isMatch)
{
    
    return res.redirect('/marks');
}});

app.get('/dashboard',isAuth,(req,res)=>
    {
        
res.render('dashboard');
    })
    app.get('/marks',isCorr,(req,res)=>
    {
        req.session.isAuth=true;
res.render('marks');
    })

app.use((req,res)=>
{
res.status(404).render('404',{title:'error'});
});



// mongoose.connect(mongouri,{
//     useNewUrlParser:true,

// useUnifiedTopology:true
// }).then((result)=>
// {
//     console.log('Database connected');
// })
// app.set('view engine','ejs');





app.listen(3000);
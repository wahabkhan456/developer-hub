const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const passport=require('passport');
const path=require('path');
const keys=require('./config/keys');
const db=keys.mongoURI;
const sendMail=require('./utils/mail/mail');

//Connect MongoDB
mongoose.connect(db)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err));

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
//PORT
const PORT= 5000 || process.env.PORT;

//route constants
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const post=require('./routes/api/post');

app.get('/',(req,res)=>{
    return res.json({msg:'Working'});
});

//routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',post);

//Serve static assets
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'));
    })
}

// sendMail("farrukhehsan90@gmail.com","Farrukh Ehsan",null,"welcome");

//listen
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
});


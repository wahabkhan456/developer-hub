const ExtractJwt=require('passport-jwt').ExtractJwt;
const JwtStrategy=require('passport-jwt').Strategy;
const secretOrKey=require('../config/keys').secretOrKey;
const Users=require('../routes/models/User');
const mongoose=require('mongoose');

const opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=secretOrKey;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{

        Users.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }
                    return done(null,false);
            })
            .catch(err=>console.log(err));

    }))
}
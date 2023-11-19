const express=require('express');
const router=express.Router();
const passport=require('passport');
const Post=require('../models/Post');
const Profile=require('../models/Profile');

router.get('/test',(req,res)=>{
    return res.json({msg:'Posts is Working'});
});

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    const newPost= new Post({
        user:req.user.id,
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar
    });

    newPost.save()
        .then(post=>{
            return res.json(post);
        })
        .catch(err=>res.status(401).json({somethingwentwrong:'Oops! Something Went Wrong'}));
    
});

router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Post.findById(req.params.id)
        .then(post=>{
            if(!post){
                errors.nopostfound="No Post found with that ID";
                return res.status(404).json(errors);
            }

                return res.json(post);
        })

});

router.get('/:post_id',(req,res)=>{
    Post.findById(req.params.post_id)
        .then(post=>{
            if(!post){
                errors.nopostfound="No post found";
                return res.status(404).json(errors);
            }

            return res.json(post);
        })
});

router.get('/',(req,res)=>{
    Post.find()
        .then(posts=>{
            if(!posts){
                errors.noposts="There are no posts";
                return res.status(404).json(errors);
            }

            return res.json(posts);
        })
        .catch(err=>res.status(404).json(errors));
});

router.delete('/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    let errors={};

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.notauthorized="You have no profile!";
                return res.status(404).json(errors);
            }

            Post.findById(req.params.post_id)
                .then(post=>{

                    if(post.user.toString()!==req.user.id){
                        console.log(post.user!==req.user.id);
                        console.log(post.user);
                        console.log(req.user.id);
                        errors.notauthorized="You cannot delete this post!";
                        return res.status(401).json(errors);
                    }
                    else{
                    post.remove()
                        .then(()=>{
                            return res.json({success:true});
                        })
                        .catch(err=>{
                            errors.nopost="Oops! Something went wrong";
                            return res.json(errors);
                        });
                    }
                })
        })
});

router.post('/like/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    let errors={};

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile="The is no profile for this user.Create a profile first!";
                return res.status(404).json(errors);
            }

            Post.findById(req.params.post_id)
                .then(post=>{
                    if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                        errors.alreadyliked="you have already liked this post";
                        return res.status(401).json(errors);
                    }

                    post.likes.unshift({user:req.user.id});

                    post.save()
                        .then(post=>{
                            return res.json(post);
                        })
                        .catch(err=>res.status(404).json("Oops! Something went wrong"));
                })
        })
});

router.post('/unlike/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    let errors={};

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile="There is no profile for this user.Create a profile first!";
                return res.status(404).json(errors);
            }

            Post.findById(req.params.post_id)
                .then(post=>{
                    if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
                        
                        errors.notyetliked="You have not yet liked this post";
                        return res.status(404).json(errors);
                    }

                    const removeIndex=post.likes
                    .map(like=>like.user)
                    .indexOf(req.user.id);

                    post.likes.splice(removeIndex,1);

                    post.save()
                        .then(post=>res.json(post))
                        .catch(err=>res.status(400).json({somethingwentwrong:"Oops! Somethiing went wrong"}));
                });
        })
});

router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors={};

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile="There is no profile for this user.Create a profile first!";
                return res.status(404).json(errors);
            }

            Post.findById(req.params.post_id)
                .then(post=>{
                    if(!post){
                        errors.nopost="This post is no more available";
                        return res.status(404).json(errors);
                    }

                    const newComment={
                        user:req.user.id,
                        text:req.body.text,
                        name:req.body.name,
                        avatar:req.body.avatar

                    }

                    post.comments.unshift(newComment);

                    post.save()
                        .then(post=>res.json(post))
                        .catch(err=>res.status(400).json({somethingwentwrong:"Oops! Something went wrong"}));

                })
        })
})

router.delete('/comment/:post_id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors={};

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile="There is no profile for this user.Create a profile first!";
                return res.status(404).json(errors);
            }

            Post.findById(req.params.post_id)
                .then(post=>{
                    if(!post){
                        errors.nopost="This post is no more available";
                        return res.status(404).json(errors);
                    }

                    const removeIndex=post.comments
                        .map(comment=>comment.id)
                        .indexOf(req.params.comment_id);

                    post.comments.splice(removeIndex,1);    

                    post.save()
                        .then(post=>res.json(post))
                        .catch(err=>res.status(400).json({somethingwentwrong:"Oops! Something went wrong"}));

                })
        })
})

module.exports=router;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../models/Profile");
const Users = require("../models/User");
const validateProfile = require("../../validation/profile");
const validateExperience=require("../../validation/experience");
const validateEducation=require("../../validation/education");

router.get("/test", (req, res) => {
  return res.json({ msg: "Profile is Working" });
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user",["name","avatar"])
      .then(profile => {
        if (!profile) {
          return res
            .status(404)
            .json({ noprofile: "No Profile exists for this user" });
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          return res.json(profile);
        });
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle is already taken";
            return res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => {
            return res.json(profile);
          });
        });
      }
    });
  }
);

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user",["name","avatar"])
    .then(profile => {
      if (!profile) {
        errors.nohandle = "No user found";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile) {
        error.user = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

router.get("/all", (req, res) => {
  Profile.find()
    .populate("user",["name","avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch(err => res.status(404).json(errors));
});

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperience(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.nosuchprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExp);

      profile
        .save()
        .then(profile => {
          return res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.nosuchprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu);

      profile
        .save()
        .then(profile => {
          return res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    });
  }
);

router.delete(
    "/education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
  
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
  
        profile.education.splice(removeIndex, 1);
  
        profile.save().then(profile => res.json(profile));
      });
    }
  );

  router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
      Profile.findOneAndRemove({user:req.user.id})
        .then(()=>{
            User.findOneAndRemove({_id:req.user.id})
                .then(()=>{
                    return res.json({success:true});
                })
                .catch(err=>res.status(404).json(err));
        })
  });

module.exports = router;

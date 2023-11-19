const mailer = require("nodemailer");
const keys = require("../../config/keys");
const pass = keys.password;
const welcome=require('../welcome_html');

const getMail=(to,name,token,type)=>{

    let data;

    switch(type){
        case "welcome":
        data={
            from:"Farrukh Ehsan <farrukhehsan9@gmail.com>",
            to,
            subject:"Welcome to Developer Hub",
            html:welcome()
        }
        break;
        default:
        data=null;
        break;
    }

    return data;

}

const sendMail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "farrukhehsan9@gmail.com",
      pass
    }
  });

  const mail = getMail(to, name, token, type);

  smtpTransport.sendMail(mail)
    .then(response => console.log(response))
    .catch(err=>console.log(err));

};

module.exports=sendMail;

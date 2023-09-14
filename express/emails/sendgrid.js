import sgMail from '@sendgrid/mail';
import { config } from "dotenv";

config({ path: "../../config/.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: 'jose1useche@gmail.com', // Change to your recipient
//   from: 'jose1useche@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js!</strong>',
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => { 
//     console.error(error)
//   });

  export const sendWelcomeEmail = (email, name) => { 
  sgMail.send({
    to: email,
    from: 'jose1useche@gmail.com',
    subject: 'Welcome to the App!!!',
    text: `Welcome ${name}. Let me know how you get along with the app`
  }).then(() => {
      console.log('Email sent')
    })
    .catch((error) => { 
      console.error('mensaje de error de Sendgrid: ', error.message)
    }); 
};

export const deleteAccount = (email, name) => { 
  sgMail.send({
    to: email,
    from: 'jose1useche@gmail.com',
    subject: "We're sorry :'(",
    text: `Bye ${name}.`
  }).then(() => {
      console.log('Email sent')
    })
    .catch((error) => { 
      console.error('mensaje de error de Sendgrid: ', error.message)
    }); 
};
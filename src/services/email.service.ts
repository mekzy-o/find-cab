import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

// Configuration of handlebars
const hbsConfig = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.join(__dirname, '../emailTemplates/'),
    layoutsDir: path.join(__dirname, '../emailTemplates/'),
    defaultLayout: 'verification.hbs'
  },
  viewPath: path.join(__dirname, '../emailTemplates/'),
  extName: '.hbs'
};

const createTransport = ():  nodemailer.Transporter<SMTPTransport.SentMessageInfo>  => {
    const smtpConfig: SMTPTransport.Options = {
        host: 'smtp.gmail.com',
        auth: { user: process.env.USEREMAIL, pass: process.env.PASS },
        secure: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    return transporter;
}

const transporter = createTransport();
transporter.use('compile', hbs(hbsConfig));

export const sendVerificationMail = async (confirmationCode:string, email:string, token:string, url:string) : Promise<Boolean | void> => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Verify your account',
    template: 'verification',
    context: { verificationLink: `${url}/verification?token=${token}&email=${email}&confirmationCode=${confirmationCode}` }
  };
  transporter.sendMail(mailOptions, (err:any, info:any) => {
    if(err) {
     console.log(err, '=====errrrr========');
    }
    else console.log('sent successfully');
  })
}

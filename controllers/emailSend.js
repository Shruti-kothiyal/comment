const nodemailerCreateTransport={
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
}

module.exports={
    nodemailerCreateTransport, 
}
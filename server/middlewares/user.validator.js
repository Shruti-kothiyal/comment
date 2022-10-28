const joi = require("joi");

const validation = joi.object({
    name:joi.string().min(3).max(25).required(),
    dob:joi.date().max('1-1-2007').iso(),
    password: joi.string().min(8).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    username: joi.string().alphanum().min(3).max(25).trim(true).required(),
    image:joi.any(),
});

const userValidation = async (req, res, next) => {
    console.log(req)
    const name = req.body.name;
    const dob = req.body.dob;
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const img = req.file;
    let image;
    if (img) image = "http://localhost:"+process.env.APP_PORT+"/" + img["filename"];
	const payload = {
		name: name,
        dob: dob,
        password: password,
        email: email,
        username: username,
        image: image,
	};
	const { error } = validation.validate(payload);
	if (error) {
		return res.status(406).send({ Status: "Failure", Details: error });
	} else {
		next();
	}
};

module.exports = userValidation;

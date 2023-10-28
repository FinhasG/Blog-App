const express = require('express');
const router = express.Router();
const userSchema = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const Joi = require('joi');


router.post('/register', async (req, res) => {
    const { username, email, password, photo } = req.body
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string(),
        photo: Joi.string()
    })


    try {
        const validateResults = schema.validate(req.body)
        if (validateResults.error) {
            // res.send(validateResults.error).status(400)
            res.status(400).json({msg:"error"})
        } else {

            const user = new userSchema({
                username: req.body.username,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                photo: req.body.photo

            })
            await user.save()
            redirect('/login')
        }
    } catch (error) {
        res.send("error happened").status(500)
    }




})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).send('user does not found!!!')
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("password incorrect")
        }

        req.session.user={ username: user.username, userId: user._id, photo: user.photo, id: user._id, email: user.email }
        const User = req.session.user

        return res.send({ User }).status(200)
    } catch (error) {
        console.log("error")
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying sessison:", err);
            return res.status(500).send("Error logging out")
        }
        res.clearCookie('cookie');
        res.status(200).json("succcessfuly")
        //res.redirect('/login')
    })
})



module.exports = router
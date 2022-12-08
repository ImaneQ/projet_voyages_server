const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');

//! les routes sont précédées de "/auth"

// router.get('/', (req, res) => {
//     res.json({
//         message: 'LOCK'
//     });
// });


// router.post('/signup', (req, res) => {
//     res.json({
//         message: 'Ca marche !'
//     })
// });


exports.login = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()

    } catch {

        res.status(401).json({ message: "Token d'authentification invalide" });


    }
};

exports.test = (req,res) =>{
    res.status(200).json({message: "Vous êtes bien authentifié"})
}
// app.listen(5000, () => { console.log('Server listening on port 5000 !') })

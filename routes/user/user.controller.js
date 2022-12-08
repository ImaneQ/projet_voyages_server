// on fait appel au pool pour la connexion avec la db
const pool = require('../../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// fonction pour l'authentification
exports.authFct = (async (req, res, next) => {


    const authHeader = req.headers['authorization'] // Bearer TOKEN
    console.log('authHeader', authHeader);

    const token = authHeader && authHeader.split(' ')[1]
    console.log('token', token);

    if (token == null) return res.sendStatus(401) // message erreur : "unauthorized" (requête non authentifiée) = il n'a pas le token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, utilisateur) => {
        if (err) {
            return res.sendStatus(403) // message d'erreur : "Forbidden" (le serveur refuse d'executer la requete alors qu'il a le token : mauvaise authentification.
        } else {
            req.user = utilisateur
            // on assigne user à req.user. On se servira de req.user dans la méthode get
            console.log('req.user: ', req.user);
            // puis on next avec la requete
            next()
        }
    })

})



////////?????? READ ALL USERS ??????/////// ok

// on exporte toutes les const (getUsers..) dans user.Routes.js

exports.getUser = (async (req, res) => {

    try {

        //  ecrire les const sans les verbes 
        const getAllUsers = await pool.query(
            "SELECT * FROM utilisateur");

        const userFiltered = getAllUsers.rows.filter(post => post.utilisateur_mail === req.user.mail);

        console.log('test');
        res.json(userFiltered);



    } catch (error) {

        console.error(error.message);

    }
})



////////?????? CREATE USER ??????/////// OK

exports.postU = async (req, res) => {
    
    try {

        const { nom, prenom, utilisateur_mail, utilisateur_mdp } = req.body;

        const hashedPwd = await bcrypt.hash(utilisateur_mdp, 10);

        console.log('Hashed password', hashedPwd);

        const userMail = { mail: utilisateur_mail, utilisateur_mdp: hashedPwd }

        const postUser = await pool.query(
            "INSERT INTO utilisateur (nom, prenom, utilisateur_mail, utilisateur_mdp) VALUES($1, $2, $3, $4) RETURNING *",
            [nom, prenom, utilisateur_mail, hashedPwd]);


        res.json(postUser.rows[0]);

    } catch (error) {

        console.error(error.message);

    }
}

//////////// ?????/LOGIN USER ??????/////// OK

exports.postLogin = async (req, res) => {

    try {

        // 
        const { utilisateur_mail, utilisateur_mdp } = req.body;
        // 
        const userLogin = await pool.query('SELECT * FROM utilisateur WHERE utilisateur_mail = $1', [utilisateur_mail]);
        // 
        if (userLogin.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });

        // on compare les 2 mots de passe compare(mot de passe, mot de passe hashé)
        const validPassword = await bcrypt.compare(utilisateur_mdp, userLogin.rows[0].utilisateur_mdp);

        console.log('validPassword', validPassword);
        console.log('utilisateur_mdp:', utilisateur_mdp);
        console.log('users.rows[0].utilisateur_mdp:', userLogin.rows[0].utilisateur_mdp);

        // JWT

        const userMail = { mail: utilisateur_mail, utilisateur_mdp: userLogin.rows[0].utilisateur_mdp }

        const token = jwt.sign(userMail, process.env.ACCESS_TOKEN_SECRET);

        // check password


        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
        res.json({ users: userLogin.rows[0], token: token });
        return res.status(200).json("Success");


    } catch (error) {
        console.error(error.message);

    }




}







// ????????????? DELETE USER ?????????? OK

exports.deleteU = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await pool.query("DELETE FROM utilisateur WHERE utilisateur_id = $1", [id])

        res.json("User has been deleted !");

    } catch (error) {
        console.log(error.message);
    }
}

// ????? UPDATE USER ???///////  ok


exports.updateU = async (req, res) => {

    try {
        const { id } = req.params;
        console.log('ID update=', id);

        
        const { nom, prenom, utilisateur_mail, utilisateur_mdp } = req.body;
        
        const hashedPwd = await bcrypt.hash(utilisateur_mdp, 10);
        console.log('Hashed password', hashedPwd);

        console.log(nom, prenom, utilisateur_mail, utilisateur_mdp);

        const updateUser = await pool.query("UPDATE utilisateur SET prenom = $1, nom = $2, utilisateur_mail = $3,  utilisateur_mdp = $4  WHERE utilisateur_id = $5", [prenom, nom, utilisateur_mail, hashedPwd, id]
        )

        res.json({ users: updateUser.rows[0] });
        // res.json('User has been updated !')


    } catch (error) {

        console.error(error.message);

    }
}
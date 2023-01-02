
// on fait appel à la const pool 
const pool = require('../../database');

// envoyer une description
// todo:---------- POST TODO --------------  OK

exports.postD = async (req, res) => {

    // ! utilisation try/catch pour détecter et gérer les conditions d'erreurs dans les BDD
    try {

        // on crée 2 const avec id et description pour les envoyer au backend 
        // req.params => fait parti de l'objet de la requête express contient les propriétés de la requete
        const { id } = req.params;

        // req.body => fait parti de l'objet de la requête express, contient les valeurs envoyées via la requete
        const { description } = req.body;

        // on créée const avec requete SQL 
        const postDetail = await pool.query(
            "INSERT INTO detail (todo_list_id, description) VALUES($1, $2) RETURNING *",
            [id, description]
        );

        // on recoit la réponse qu'on enregistre sous format json
        res.json(postDetail.rows[0]);



    } catch (error) {

        console.error(error.message);

    }
}

// todo:---------- READ ALL DETAILs -------------- OK

// pour obtenir toutes les descriptions liées à chaque todo_list

exports.getAll = async (req, res) => {

    try {
        const { id } = req.params
        const getAllDetails = await pool.query(
            "SELECT * FROM detail WHERE todo_list_id = $1", [id]
        );

        res.json(getAllDetails.rows);

    } catch (error) {
        console.error(error.message)

    }
}


// todo:---------- GET ONE DETAIL -------------- OK
//  pour obtenir une description 

exports.getD = async (req, res) => {

    try {

        const { id } = req.params;

        const getDetail = await pool.query(
            "SELECT * FROM detail WHERE detail_id = $1", [id]
        );

        res.json(getDetail.rows[0]);

    } catch (error) {
        console.error(error.message)

    }
}


// todo:---------- UPDATE DETAIL -------------- OK

// pour modifier une description 
exports.putD = async (req, res) => {

    try {
        const { description } = req.body;
        const { id } = req.params;
        const updateDetail = await pool.query("UPDATE detail SET description = $1 WHERE detail_id = $2", [description, id]
        )
        res.json('Detail has been updated!');



    } catch (error) {

        console.error(error.message);

    }
}


// todo:---------- DELETE DETAIL -------------- ok

//  pour supprimer une description 
exports.deleteD = async (req, res) => {

    try {
        const { id } = req.params;

        const deleteDetail = await pool.query("DELETE FROM detail WHERE detail_id = $1", [id])

        res.json('Detail has been deleted !');

    } catch (error) {
        console.log(error.message);
    }
}

// todo:---------- DELETE ALL DETAILS FROM ONE LIST -------------- ok

// pour supprimer toutes les descriptions liées à une todo_list
exports.deleteAllD = async (req, res) => {

    try {
        const { id } = req.params;

        const deleteAllDetails = await pool.query("DELETE FROM detail WHERE todo_list_id = $1", [id])

        res.json('All Details had been deleted !');

    } catch (error) {
        console.log(error.message);
    }
}


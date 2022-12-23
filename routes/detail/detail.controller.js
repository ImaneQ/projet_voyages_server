const pool = require('../../database');


// todo:---------- POST TODO --------------  OK

exports.postD = async (req, res) => {

    try {

        const { id } = req.params;

        const { description } = req.body;

        const postDetail = await pool.query(
            "INSERT INTO detail (todo_list_id, description) VALUES($1, $2) RETURNING *",
            [id, description]
        );

        res.json(postDetail.rows[0]);



    } catch (error) {

        console.error(error.message);

    }
}

// todo:---------- READ ALL DETAILs -------------- OK


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


exports.deleteAllD = async (req, res) => {

    try {
        const { id } = req.params;

        const deleteAllDetails = await pool.query("DELETE FROM detail WHERE todo_list_id = $1", [id])

        res.json('All Details had been deleted !');

    } catch (error) {
        console.log(error.message);
    }
}


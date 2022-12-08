const pool = require('../../database');


// ******** CREATE LIST ********* OK

exports.postList = async (req, res) => {

    try {

        const { utilisateur_id, list_title } = req.body;
        console.log(req.body);
        //!!!!!!!! lors de la requete le user doit il rentrer manuellement son id ? car utilisateur_id
        const createList = await pool.query(
            "INSERT INTO todo_list (utilisateur_id, list_title) VALUES($1, $2) RETURNING *", [utilisateur_id, list_title]);

        res.json(createList.rows[0]);


    } catch (error) {

        console.error(error.message);

    }
}

//***************READ All Lists****************  OK

exports.readLists = async (req, res) => {

    try {

        const getAllLists = await pool.query(
            "SELECT * FROM todo_list");
        res.json(getAllLists.rows)

    } catch (error) {
        console.error(error.message)

    }
}

//***************READ One List**************** OK


exports.readOneList = async (req, res) => {

    try {
        const { id } = req.params;
        // console.log(req);
        console.log(req.params);
        const getOneList = await pool.query(
            "SELECT * FROM todo_list WHERE todo_list_id = $1", [id]);
        res.json(getOneList.rows[0])

    } catch (error) {
        console.error(error.message)

    }
}

// ************* UPDATE One list*************** OK

exports.updateL = async (req, res) => {

    try {
        const { id } = req.params;
        const { list_title } = req.body;
        console.log(req.body);
        const updateList = await pool.query("UPDATE todo_list SET list_title = $1 WHERE todo_list_id = $2", [list_title, id])
        res.json("List has been updated !");


    } catch (error) {

        console.error(error.message);

    }
}

// ************** DELETE list ************* OK


exports.deleteL = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteList = await pool.query("DELETE FROM todo_list WHERE todo_list_id = $1", [id])
        console.log(req.body);
        res.json('List has been deleted !');

    } catch (error) {
        console.log(error.message);
    }
}


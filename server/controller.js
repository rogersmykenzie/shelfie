module.exports = {
    getInventory: (req, res, next) => {
        let db = req.app.get('db');
        db.get_inventory()
        .then(response => {
            res.status(200).json(response);
        }).catch(err => console.log(err));
    },
    createProduct: (req,res, next) => {
        let db = req.app.get('db');
        db.create_product(req.body.name, req.body.price, req.body.img)
        .then(response => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    deleteProduct: (req, res, next) => {
        let db = req.app.get('db');
        console.log('heehaw');
        db.delete_product(req.params.id)
        .then(response => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    editProduct: (req, res, next) => {
        let db = req.app.get('db');
        db.edit_product(req.body.name, req.body.price, req.body.img, req.params.id)
        .then(response => {
            res.sendStatus(200)
        })
    }
}
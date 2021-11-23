module.exports = app => {
    const pacientes = require("../controllers/pacientes.controller.js");

    var router = require("express").Router();

    router.get("/:name", pacientes.findByName);

    app.use('/api/pacientes', router);
};
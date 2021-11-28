module.exports = app => {
    const pacientes = require("../controllers/pacientes.controller.js");

    var router = require("express").Router();

    //Endpoints
    router.get("/nombre/:name", pacientes.findByName);
    router.get("/dni/:dni", pacientes.findByDNI);

    app.use('/api/pacientes', router);
};
module.exports = app => {
    const pacientes = require("../controllers/pacientes.controller.js");

    var router = require("express").Router();

    //Buscar por NOMBRE
    router.get("/nombre/:name", pacientes.findByName);
    //Buscar por DNI
    router.get("/dni/:dni", pacientes.findByDNI);
    //Crear PACIENTE
    router.post("/guardar", pacientes.create);

    app.use('/api/pacientes', router);
};
module.exports = (app) => {
  const historia_clinica = require('../controllers/historia_clinica.controller');

  var router = require('express').Router();

  //Buscar por ID del PACIENTE
  router.get("/buscar/:id_paciente", historia_clinica.findByPaciente);
  //Obtener siguiente NRO HISTORIA CLINICA
  router.get("/next_id", historia_clinica.getNextNroHistoria);

  app.use('/api/historias_clinicas', router);
}

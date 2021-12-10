module.exports = (app) => {
  const historia_clinica = require('../controllers/historia_clinica.controller');

  var router = require('express').Router();

  //Buscar por ID del PACIENTE
  router.get("/buscar/:id_paciente", historia_clinica.findByPaciente);
  //Buscar por Nro Historia
  router.get("/buscar-nro/:nro_historia", historia_clinica.findByNroHistoria)
  //Obtener siguiente NRO HISTORIA CLINICA
  router.get("/next_id", historia_clinica.getNextNroHistoria);
  //Crear una nueva HISTORIA CLINICA
  router.post("/guardar", historia_clinica.create);
  //Actualizar HISTORIA CLINICA
  router.put("/editar", historia_clinica.update);

  app.use('/api/historias_clinicas', router);
}

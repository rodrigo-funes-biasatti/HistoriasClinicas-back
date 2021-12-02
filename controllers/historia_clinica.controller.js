const Historia_Clinica = require('../models/historia_clinica.model')

exports.findByPaciente = (req, res) => {
  var id_paciente = req.params.id_paciente
  Historia_Clinica.findByPaciente(id_paciente, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'Historia Clinica no encontrada.',
        })
      } else {
        res.status(500).send({
          message: 'Error al encontrar la Historia Clinica',
        })
      }
    } else {
      res.send(data)
    }
  })
}

exports.getNextNroHistoria = (req, res) => {
  Historia_Clinica.getNextNroHistoria((err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Error al encontrar la Historia Clinica',
      })
    }
    res.send(data)
  })
}

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

exports.findByNroHistoria = (req, res) => {
  var nro_historia = req.params.nro_historia
  Historia_Clinica.findByNroHistoria(nro_historia, (err, data) => {
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

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Error al crear la Historia Clinica: objecto vacío.',
    })
  }

  const historia = new Historia_Clinica({
    nro_historia: req.body.nro_historia,
    id_paciente: req.body.id_paciente,
    fecha: req.body.fecha,
    motivo_consulta: req.body.motivo_consulta,
    indicaciones: req.body.indicaciones,
  })

  Historia_Clinica.create(historia, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Ha ocurrido un error en el servidor.',
      })
    } else res.send(data)
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Contenido del body vacío.',
    })
  }
  Historia_Clinica.update(
    req.params.nro_historia,
    new Historia_Clinica(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Historia Clinica no encontrada con nro: ${req.params.nro_historia}.`,
          })
        } else {
          res.status(500).send({
            message: `Error al actualizar el el Paciente con id: ${req.params.nro_historia}.`,
          })
        }
      } else res.send(data);
    },
  )
}

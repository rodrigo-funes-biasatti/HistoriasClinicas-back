const Paciente = require('../models/paciente.model')
const pacientes = require('../models/paciente.model')

exports.findByName = (req, res) => {
  var nombre = req.params.name
  pacientes.findByName(nombre, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'No se han encontrado pacientes con el nombre: ' + nombre,
        })
      } else {
        res.status(500).send({
          message: 'Error al recuperar el Paciente con el nombre: ' + nombre,
        })
      }
    } else {
      res.send(data)
    }
  })
}

exports.findByDNI = (req, res) => {
  var dni = req.params.dni
  pacientes.findByDNI(dni, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'No se han encontrado pacientes con el dni: ' + dni,
        })
      } else {
        res.status(500).send({
          message: 'Error al recuperar el Paciente con el dni: ' + dni,
        })
      }
    } else {
      res.send(data)
    }
  })
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Error al crear el paciente: objecto vacío.',
    })
  }

  const paciente = new Paciente({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    obra_social: req.body.obra_social,
    fecha_nacimiento: req.body.fecha_nacimiento,
    sexo: req.body.sexo,
  })

  Paciente.create(paciente, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Ha ocurrido un error en el servidor.',
      })
    } else res.send(data)
  })
}

exports.updateById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Contenido del body vacío.',
    })
  }
  Paciente.updateById(req.params.id, new Paciente(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Paciente no encontrado con id: ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: `Error al actualizar el el Paciente con id: ${req.params.id}.`,
        })
      }
    } else res.send(data)
  })
}

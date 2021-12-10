const sql = require('../db.js')

//constructor
const Paciente = function (paciente) {
  this.id = paciente.id
  this.nombre = paciente.nombre
  this.apellido = paciente.apellido
  this.dni = paciente.dni
  this.direccion = paciente.direccion
  this.telefono = paciente.telefono
  this.obra_social = paciente.obra_social
  this.fecha_nacimiento = paciente.fecha_nacimiento
  this.sexo = paciente.sexo
}

//Buscar por Nombre
Paciente.findByName = (name, result) => {
  sql.query(
    `SELECT * FROM PACIENTES p WHERE p.nombre like '${name}%'`,
    (err, res) => {
      if (err) {
        console.error('Error: ' + err)
        result(err, null)
        return
      }

      if (res.length) {
        result(null, res)
        return
      }

      result({ kind: 'not_found' }, null)
    },
  )
}

//Buscar por DNI
Paciente.findByDNI = (dni, result) => {
  sql.query(`SELECT * FROM PACIENTES p WHERE p.dni = '${dni}'`, (err, res) => {
    if (err) {
      console.error('Error: ' + err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res)
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

//Crear nuevo Paciente
Paciente.create = (nuevoPaciente, result) => {
  sql.query('INSERT INTO PACIENTES SET ?', nuevoPaciente, (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...nuevoPaciente })
  })
}

Paciente.updateById = (id, paciente, result) => {
  sql.query(
    'UPDATE PACIENTES SET ' +
      'nombre = ?, apellido = ?, dni = ?, direccion = ?, telefono = ?, obra_social = ?, fecha_nacimiento = ?, sexo = ? ' +
      'WHERE id = ?',
    [
      paciente.nombre,
      paciente.apellido,
      paciente.dni,
      paciente.direccion,
      paciente.telefono,
      paciente.obra_social,
      paciente.fecha_nacimiento,
      paciente.sexo,
      paciente.id
    ],
    (err, res) => {
        if (err) {
          console.log('Error al update: ' + err)
          result(null, err)
          return
        }

        if (res.affectedRows == 0) {
          result({ kind: 'not_found' }, null)
          return
        }

      result(null, { id: id, ...paciente })
    },
  )
}

module.exports = Paciente

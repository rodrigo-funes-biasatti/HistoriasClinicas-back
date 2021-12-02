const sql = require('../db')

const Historia_Clinica = function (historia_clinica) {
  ;(this.nro_historia = historia_clinica.nro_historia),
    (this.id_paciente = historia_clinica.id_paciente),
    (this.fecha = historia_clinica.fecha),
    (this.motivo_consulta = historia_clinica.motivo_consulta),
    (this.indicaciones = historia_clinica.indicaciones)
}

Historia_Clinica.findByPaciente = (id, result) => {
  sql.query(
    `SELECT * FROM HISTORIAS_CLINICAS WHERE id_paciente = ${id}`,
    (err, res) => {
      if (err) {
        console.error(`Error: ${err}`)
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

Historia_Clinica.getNextNroHistoria = result => {
  sql.query(
    'SELECT MAX(nro_historia)+1 as new_id FROM HISTORIAS_CLINICAS',
    (err, res) => {
      if (err) {
        console.error(`Error: ${err}`)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

module.exports = Historia_Clinica

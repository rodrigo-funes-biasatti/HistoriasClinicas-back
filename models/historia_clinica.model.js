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
    `SELECT * FROM HISTORIAS_CLINICAS WHERE id_paciente = ${id} ORDER BY fecha DESC`,
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

Historia_Clinica.findByNroHistoria = (nro, result) => {
  sql.query(
    `SELECT * FROM HISTORIAS_CLINICAS WHERE nro_historia = ${nro}`,
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

Historia_Clinica.getNextNroHistoria = (result) => {
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

Historia_Clinica.create = (historia, result) => {
  sql.query('INSERT INTO HISTORIAS_CLINICAS SET ?', historia, (err, res) => {
    if (err) {
      console.error(err);
      if(err.errno === 1062){
        result({ message: 'NUMERO HISTORIA CLINICA DUPLICADO'}, null);
        return;
      }
      result(err, null)
      return
    }

    result(null, { nro_historia: res.nro_historia, ...historia })
  })
}

Historia_Clinica.update = (nro, historia, result) => {
  sql.query(
    'UPDATE HISTORIAS_CLINICAS SET ' +
      'fecha = ?, motivo_consulta = ?, indicaciones = ? ' + 
      'WHERE nro_historia = ?',
    [
      historia.fecha, 
      historia.motivo_consulta, 
      historia.indicaciones, 
      historia.nro_historia
    ],
    (err, res) => {
      if (err) {
        console.log('Error al update: ' + err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null)
        return;
      }

      result(null, nro);
    },
  )
}


module.exports = Historia_Clinica

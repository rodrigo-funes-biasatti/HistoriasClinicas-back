const sql = require("../db.js");

//constructor
const Paciente = (paciente) => {
    this.id = paciente.id;
    this.nombre = paciente.nombre;
    this.apellido = paciente.apellido;
    this.dni = paciente.dni;
    this.direccion = paciente.direccion;
    this.telefono = paciente.telefono;
    this.obra_social = paciente.obra_social;
}

Paciente.findByName = (name, result) => {
    sql.query(`SELECT * FROM PACIENTES p WHERE p.nombre like '%${name}%'`, (err, res) => {
        if(err){
            console.error("Error: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    })
};

module.exports = Paciente;
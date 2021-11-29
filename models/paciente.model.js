const sql = require("../db.js");

//constructor
const Paciente = function (paciente) {
    this.id = paciente.id;
    this.nombre = paciente.nombre;
    this.apellido = paciente.apellido;
    this.dni = paciente.dni;
    this.direccion = paciente.direccion;
    this.telefono = paciente.telefono;
    this.obra_social = paciente.obra_social;
    this.fecha_nacimiento = paciente.fecha_nacimiento;
    this.sexo = paciente.sexo;
}

//Buscar por Nombre
Paciente.findByName = (name, result) => {
    sql.query(`SELECT * FROM PACIENTES p WHERE p.nombre like '${name}%'`, (err, res) => {
        if(err){
            console.error("Error: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

//Buscar por DNI
Paciente.findByDNI = (dni, result) => {
    sql.query(`SELECT * FROM PACIENTES p WHERE p.dni = '${dni}'`, (err, res) => {
        if(err){
            console.error("Error: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

//Crear nuevo Paciente
Paciente.create = (nuevoPaciente, result) => {
    sql.query("INSERT INTO PACIENTES SET ?", nuevoPaciente, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("Paciente creado: ", { id: res.insertId, ...nuevoPaciente });
        result(null, { id: res.insertId, ...nuevoPaciente })
    });
};

module.exports = Paciente;
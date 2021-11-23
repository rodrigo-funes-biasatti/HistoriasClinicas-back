const pacientes = require("../models/paciente.model");

exports.findByName = (req, res) => {
    var nombre = req.params.name;
    pacientes.findByName(nombre, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: "No se han encontrado pacientes con el nombre: " + nombre
                });
            }
            else{
                res.status(500).send({
                    message: "Error al recuperar el Paciente con el nombre: " + nombre 
                })
            }
        }
        else{
            res.send(data);
        }
    })
}
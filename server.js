const express = require('express');
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

app.get('/', (req, res) => {
    res.json({message: "Has intentado ingresar al root de la aplicación"});
});

require("./routes/pacientes.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Arrancó el server en:", PORT);
});



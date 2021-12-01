const express = require('express');
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Method", "*");
   next();
  });
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "Has intentado ingresar al root de la aplicación"});
});

require("./routes/pacientes.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Arrancó el server en:", PORT);
});



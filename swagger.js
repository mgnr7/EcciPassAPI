const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "EcciPass - API",
        description: "Este es el API de la plataforma EcciPass UCR",
    },
    host: "localhost:7500",
    schemes: ["http","https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./server.js"); //Ruta del proyecto
});
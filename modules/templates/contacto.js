module.exports = {
  usuario: {
    text: (req) =>
      "Hemos recibido correctamente su consulta, nos contactaremos a la brevedad.\nAtte. Estudio IMAZ.",
    html: (req) =>
      "Hemos recibido correctamente su consulta, nos contactaremos a la brevedad.<br />Atte. Estudio IMAZ.",
  },
  cliente: {
    text: (req) =>
      `Se ha realizado la siguiente consulta desde el formulario de contacto:\nNombre: ${
        req.body.nombre ? req.body.nombre : "--"
      }\nApellido: ${req.body.apellido ? req.body.apellido : "--"}\nTeléfono: ${
        req.body.telefono ? req.body.telefono : "--"
      }\nEmail: ${req.body.email ? req.body.email : "--"}\nConsulta: ${
        req.body.mensaje ? req.body.mensaje : "--"
      }`,
    html: (req) =>
      `Se ha realizado la siguiente consulta desde el formulario de contacto:<br />Nombre: ${
        req.body.nombre ? req.body.nombre : "--"
      }<br />Apellido: ${
        req.body.apellido ? req.body.apellido : "--"
      }<br />Teléfono: ${
        req.body.telefono ? req.body.telefono : "--"
      }<br />Email: ${
        req.body.email ? req.body.email : "--"
      }<br />Consulta: <p style="white-space: pre-line;">${
        req.body.mensaje ? req.body.mensaje : "--"
      }`,
  },
};

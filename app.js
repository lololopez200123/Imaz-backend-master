const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const serveStatic = require("serve-static");
const crypto = require("crypto");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

require("./models/db");
const fileUpload = require("express-fileupload");

const guardian = require("./config/guardian");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const passport = require("passport");

const usuarios = require("./routes/usuarioRoutes");
require("./config/passport");

const app = express();
app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//create a cors middleware
app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// if (process.env.NODE_ENV === "production")
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
//   });

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${process.cwd()}/public/`,
  })
);

/*
 * IMAGES
 */

app.post("/api/upload", csrfProtection, guardian({}), function (req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  const output = {};
  const proms = [];

  if (!Array.isArray(req.files.imagenes))
    req.files.imagenes = [req.files.imagenes];

  const regex = new RegExp(/^(image\/png|image\/jpg|image\/jpeg|image\/gif)$/);

  if (
    req.files.imagenes.some(
      (i) => console.log(!regex.test(i.mimetype)) && !regex.test(i.mimetype)
    )
  ) {
    return res.status(500).send({ message: "Invalid mimetype" });
  } else {
    req.files.imagenes.map((imagen) => {
      let ubicacion = process.cwd();

      let imgName =
        "/public/images/uploads/" +
        crypto.randomBytes(5).toString("hex") +
        imagen.name
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/á/g, "a")
          .replace(/é/g, "e")
          .replace(/í/g, "i")
          .replace(/ó/g, "o")
          .replace(/ú/g, "u")
          .replace(/ñ/g, "n")
          .replace(/[^a-zA-Z0-9\.-_]/g, "");

      if (process.env.NODE_ENV !== "production") {
        proms.push(
          new Promise((resolve, reject) => {
            imagen.mv(ubicacion + imgName, function (err) {
              if (err) {
                console.log(err);
                reject();
              } else {
                output[imagen.name] = imgName;
                resolve();
              }
            });
          })
        );
      } else {
        proms.push(
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              imagen.tempFilePath,
              {
                cloud_name: process.env.CLOUDINARY_CLOUD,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET,
              },
              (error, result) => {
                if (error || !result) {
                  console.log("No result");
                  reject();
                } else {
                  output[imagen.name] = result.secure_url;
                  resolve();
                }
              }
            );
          })
        );
      }
    });

    Promise.all(proms).then(
      () => {
        res.json(output);
      },
      (error) => {
        res.status(500).send(error);
      }
    );
  }
});

app.use(passport.initialize());

app.use("/api/usuarios", usuarios);

// const categorias = require("./routes/categoriaRoutes");
// app.use("/api/categorias", categorias);
//
// const noticias = require("./routes/noticiaRoutes");
// app.use("/api/noticias", noticias);

const profesionales = require("./routes/profesionalesRoutes");
app.use("/api/profesionales", profesionales);

const publicaciones = require("./routes/publicacionRoutes");
app.use("/api/publicaciones", publicaciones);

const fallos = require("./routes/falloRoutes");
app.use("/api/fallos", fallos);

const links = require("./routes/linkRoutes");
app.use("/api/links", links);

////////MAILING

const mailing = require("./modules/mailing");
app.use("/api/mailing", mailing);

// const examples = require("./routes/exampleRoutes");
// app.use("/api/examples", examples);

if (process.env.NODE_ENV !== "production") {
  // Endpoint para generar random hashes que sirvan como identificadores de ROLES

  app.get("/app/get_hash", (req, res) => {
    res.send(crypto.randomBytes(5).toString("hex"));
  });

  // PUBLIC

  app.use("/public", serveStatic(path.join(__dirname, "/public/")));
}

process.env.NODE_ENV !== "production" &&
  app.get("/*", function (req, res) {
    if (req.xhr) {
      return res.status(404).send(req.url + " not found");
    }
    res.redirect("http://localhost:8080");
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
